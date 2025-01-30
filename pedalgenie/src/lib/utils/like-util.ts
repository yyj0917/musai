import { likeProduct } from '../api/like';

// 상품 좋아요 util handle 함수
// 로그인 안 되었을 시에 로그인 모달 띄우기
export const handleLikeProduct = async (productId: number, isLoggedIn: boolean, openLoginModal: () => void) => {
  if (!isLoggedIn) {
    openLoginModal();
  } else {
    // 좋아요 기능 구현
    await likeProduct(productId);
  }
};
