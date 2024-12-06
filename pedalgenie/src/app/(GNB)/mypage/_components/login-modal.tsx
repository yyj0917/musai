import CloseX from '@public/svg/close-x.svg';

interface LoginModalProps {
    isOpen: boolean; // 모달 표시 여부
    onClose: () => void; // 모달 닫기 함수
}
export default function LoginModal({isOpen, onClose}: LoginModalProps) {
    if (!isOpen) return null; // 모달이 열리지 않으면 렌더링하지 않음

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="flex justify-center items-center bg-grey850 text-center p-[10px] w-[90%] max-w-[320px] min-h-[330px] rounded-lg shadow-lg">
            <div className="relative flex flex-col justify-center items-center px-9">
                <span 
                    className='w-full flex justify-end text-grey450 cursor-pointer'
                    onClick={onClose}>
                    <CloseX/>
                </span>
                <h2 className="text-title1 text-grey150 mt-5 mb-5 flex flex-col">
                    <span>더 깊이있는 경험을 위해서는</span>
                    <span>계정이 필요해요</span>
                </h2>
                <p className="text-body2 text-grey450 flex flex-col mb-10">
                    <span>간편로그인하고 실제 시연과 대여 서비스를</span>
                    <span>예약해보세요.</span>
                </p>
                <button className="bg-grey350 w-[280px] h-[60px] text-center text-body1 text-grey850 rounded-lg mb-5">
                    카카오톡으로 3초만에 가입하기
                </button>
                <button
                    onClick={() => alert("로그인")}
                    className="text-white text-body1"
                >
                    로그인
                </button>

            </div>
          </div>
        </div>
    )

}