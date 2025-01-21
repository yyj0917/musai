// hooks/useLikeMutation.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Product } from '@/types/product-type';
import { likeProduct, unlikeProduct } from '@/lib/api/(product)/like-product';

type LikeMutationContext = {
    prevData: { pages: FetchProductListResponse[] } | null;
  };
  
// 무한 쿼리 구조: pages: { items: Product[] }[]
interface FetchProductListResponse {
    items: Product[];
    currentPage: number;
    totalPages: number;
  }
  
export function useLikeProductMutation(
    productId: number,
    queryKey?: (string | string[])[]
)  {
  const queryClient = useQueryClient();

  // queryKey가 없으면 아무것도 반환하지 않음
  if (!queryKey) return;

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
        // 2) 이전 상태(스냅샷) 가져오기
        const prevData = queryClient.getQueryData<{
            pages: FetchProductListResponse[];
        }>(queryKey);

        if (!prevData) return { prevData: null };

        // 3) 낙관적으로 특정 productId의 isLiked만 변경 - 페이지 전부 찾아서 해당 id만 변경 - 수정 생각해봐야 함.
        const newPages = prevData.pages.map((page) => {
            const newItems = page.items.map((p) => {
              if (p.id === productId) {
                return { ...p, isLiked: newIsLiked };
              }
              return p;
            });
            return { ...page, items: newItems };
          });
          // 4) 캐시에 세팅
        queryClient.setQueryData(queryKey, {
            ...prevData,
            pages: newPages,
          });

        return { prevData };
      },
      onError: (err: Error, newIsLiked: boolean, context?: LikeMutationContext) => {
        // 복구
        if (context?.prevData) {
          queryClient.setQueryData(queryKey, context.prevData);
        }
      },
      onSettled: () => {
        // 성공/실패와 관계없이 최종적으로 서버 데이터를 동기화
        // queryClient.invalidateQueries(['product', productId]);
      },
    }
  );
}
export function useLikeShopMutation(
    productId: number,
    queryKey: (string | string[])[]
)  {
  const queryClient = useQueryClient();

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
        // 2) 이전 상태(스냅샷) 가져오기
        const prevData = queryClient.getQueryData<{
            pages: FetchProductListResponse[];
        }>(queryKey);

        if (!prevData) return { prevData: null };

        // 3) 낙관적으로 특정 productId의 isLiked만 변경 - 페이지 전부 찾아서 해당 id만 변경 - 수정 생각해봐야 함.
        const newPages = prevData.pages.map((page) => {
            const newItems = page.items.map((p) => {
              if (p.id === productId) {
                return { ...p, isLiked: newIsLiked };
              }
              return p;
            });
            return { ...page, items: newItems };
          });
          // 4) 캐시에 세팅
        queryClient.setQueryData(queryKey, {
            ...prevData,
            pages: newPages,
          });

        return { prevData };
      },
      onError: (err: Error, newIsLiked: boolean, context?: LikeMutationContext) => {
        // 복구
        if (context?.prevData) {
          queryClient.setQueryData(queryKey, context.prevData);
        }
      },
      onSettled: () => {
        // 성공/실패와 관계없이 최종적으로 서버 데이터를 동기화
        // queryClient.invalidateQueries(['product', productId]);
      },
    }
  );
}