import { useMutation, useQueryClient } from '@tanstack/react-query';
import { likeShop, unlikeShop } from '@/lib/api/like';  // 실제 API 함수
import { LikeShopList, ShopDetail, ShopList } from '@/types/shop-type';              // 매장 타입 (예: { shopId: number; isLiked: boolean; ... })

interface LikeShopMutationContext {
  prevShops: ShopList | ShopDetail | LikeShopList | undefined;  // 낙관적 업데이트 전 상태
}

export function useLikeShopMutation(shopId: number, queryKey: string[]) {
  const queryClient = useQueryClient();

  return useMutation<void, Error, boolean, LikeShopMutationContext>({
    // mutationFn: 좋아요 등록 or 취소
    mutationFn: async (newIsLiked: boolean) => {
      if (newIsLiked) {
        await likeShop(shopId);
      } else {
        await unlikeShop(shopId);
      }
    },

    // onMutate: 낙관적 업데이트
    onMutate: async (newIsLiked: boolean) => {

        // queryKey === 'shopList' 일 때
        if (queryKey[0] === 'shopList') {

            // 1) 이미 진행 중인 쿼리를 중단
            await queryClient.cancelQueries({ queryKey: ['shopList'] });
      
            // 2) 이전 상태(Shop[])를 스냅샷
            const prevShops = queryClient.getQueryData<ShopList>(['shopList']);
            if (!prevShops) {
              return { prevShops: undefined };
            }
      
            // 3) shopId가 일치하는 매장의 isLiked를 newIsLiked로 바꿈
            const newShops = prevShops.map((shop) =>
              shop.shopId === shopId ? { ...shop, isLiked: newIsLiked } : shop
            );
      
            // 4) 캐시에 즉시 반영
            queryClient.setQueryData(['shopList'], newShops);
      
            // 5) onError에서 복구할 때 쓸 context
            return { prevShops };
        }
        // queryKey === 'shopDetail' 일 때 - shopDescription
        else if (queryKey[0] === 'shopDetail') {
            // 1) 이미 진행 중인 쿼리를 중단
            await queryClient.cancelQueries({ queryKey: ['shopDetail', shopId] });
      
            // 2) 이전 상태(Shop)를 스냅샷
            const prevShop = queryClient.getQueryData<ShopDetail>(['shopDetail', shopId]);
            if (!prevShop) {
              return { prevShops: undefined };
            }
      
            // 3) shopId가 일치하는 매장의 isLiked를 newIsLiked로 바꿈
            const newShop = { ...prevShop, isLiked: newIsLiked };
      
            // 4) 캐시에 즉시 반영
            queryClient.setQueryData(['shopDetail', shopId], newShop);
      
            // 5) onError에서 복구할 때 쓸 context
            return { prevShops: prevShop };
        }
        else if (queryKey[0] === 'likeShops') {
            // 1) 이미 진행 중인 쿼리를 중단
            await queryClient.cancelQueries({ queryKey: ['likeShops'] });
      
            // 2) 이전 상태(Shop[])를 스냅샷
            const prevShops = queryClient.getQueryData<LikeShopList>(['likeShops']);
            if (!prevShops) {
              return { prevShops: undefined };
            }
      
            // 3) shopId가 일치하는 매장의 isLiked를 newIsLiked로 바꿈
            const newShops = prevShops.map((shop) =>
              shop.shopId === shopId ? { ...shop, isLiked: newIsLiked } : shop
            );
      
            // 4) 캐시에 즉시 반영
            queryClient.setQueryData(['likeShops'], newShops);
      
            // 5) onError에서 복구할 때 쓸 context
            return { prevShops };
        }
    },

    // onError: 에러 시 롤백
    onError: (err, newIsLiked, context) => {
      if (context?.prevShops) {
        queryClient.setQueryData(['shopList'], context.prevShops);
      }

    },

    // onSettled: 성공/실패 관계없이 최종 동기화 (선택)
    onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ['likeShops'] });
      // 필요에 따라 서버 재확인
    },
  });
}
