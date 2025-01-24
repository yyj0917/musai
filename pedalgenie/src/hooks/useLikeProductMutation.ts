// hooks/useLikeMutation.ts

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Product, ProductList } from '@/types/product-type';
import { likeProduct, unlikeProduct } from '@/lib/api/like';

type LikeMutationContext = {
  prevData: { pages: FetchProductListResponse[] } | ProductList | null;
};

// 무한 쿼리 구조: pages: { items: Product[] }[]
interface FetchProductListResponse {
  items: Product[];
  currentPage: number;
  totalPages: number;
}

export function useLikeProductMutation(productId: number, queryKey: (string | string[])[]) {
  const queryClient = useQueryClient();

  // queryKey가 없으면 아무것도 반환하지 않음

  // 좋아요 토글이 아닌, "isLiked === true면 delete, false면 post"를 구분
  return useMutation<void, Error, boolean, LikeMutationContext>({
    // mutationFn
    mutationFn: async (newIsLiked: boolean) => {
      if (newIsLiked) {
        // 좋아요 등록
        await likeProduct(productId);
      } else {
        // 좋아요 취소
        await unlikeProduct(productId);
      }
    },
    // Optimistic Update
    onMutate: async (newIsLiked: boolean) => {
      // 1) 요청 보낼 때 현재 캐시를 스냅샷

      await queryClient.cancelQueries({ queryKey });
      // ─────────────────────────────────────────────
      // A. 무한 스크롤 구조(예: { pages: Array<{ items: Product[] }>} )
      // B. 좋아요 목록 구조(예: Product[] )
      // 를 분기 처리
      // ─────────────────────────────────────────────
      // 1) 무한 스크롤 타입 캐시 가져오기
      const infiniteData = queryClient.getQueryData<{
        pages: FetchProductListResponse[];
      }>(queryKey);

      // 2) 만약 무한 스크롤 데이터가 없다면 → 좋아요 목록 형식인지 확인
      if (!infiniteData) {
        // 좋아요 목록 (단일 배열) 형태라 가정
        const likeProducts = queryClient.getQueryData<ProductList>(queryKey);
        if (!likeProducts) {
          return { prevData: null };
        }

        // 좋아요 목록 배열 낙관적 업데이트
        const newLikeProducts = likeProducts.map((p) => {
          if (p.id === productId) {
            return { ...p, isLiked: newIsLiked };
          }
          return p;
        });

        // 캐시에 세팅
        queryClient.setQueryData(queryKey, newLikeProducts);
        return { prevData: likeProducts };
      }

      // ─────────────────────────────────────────────
      // 여기로 왔다면: 무한 스크롤 구조
      // ─────────────────────────────────────────────
      if (!infiniteData.pages) {
        // pages가 없는 경우 → 안전장치
        return { prevData: null };
      }

      // 무한 스크롤 낙관적 업데이트
      const newPages = infiniteData.pages.map((page) => {
        const newItems = page.items.map((product) => {
          if (product.id === productId) {
            return { ...product, isLiked: newIsLiked };
          }
          return product;
        });
        return { ...page, items: newItems };
      });

      queryClient.setQueryData(queryKey, {
        ...infiniteData,
        pages: newPages,
      });

      return { prevData: infiniteData }; // onError 복구용
    },
    onError: (err: Error, newIsLiked: boolean, context?: LikeMutationContext) => {
      // 복구
      if (context?.prevData) {
        queryClient.setQueryData(queryKey, context.prevData);
      }
    },
    onSuccess: () => {
      // 성공 시 좋아요 목록 재요청
    },
    onSettled: () => {
      // 성공/실패와 관계없이 최종적으로 서버 데이터를 동기화
      queryClient.invalidateQueries({ queryKey: ['likeProducts'] });
      // shopDetail 캐시도 동기화
      if (queryKey && queryKey[0] === 'shopDetail') {
        queryClient.invalidateQueries({ queryKey: ['shopDetail', queryKey[1]] });
      }
    },
  });
}
