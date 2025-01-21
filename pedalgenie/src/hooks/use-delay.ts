import { useState, useEffect } from "react";

function useDelay(delayTime: number) {
  const [isDelayComplete, setIsDelayComplete] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsDelayComplete(true);
    }, delayTime);

    // Cleanup: 컴포넌트가 언마운트될 경우 타이머를 정리합니다.
    return () => clearTimeout(timeout);
  }, [delayTime]);

  return isDelayComplete;
}

export default useDelay;
