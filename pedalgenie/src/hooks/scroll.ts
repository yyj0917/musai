import { useCallback, useEffect, useRef } from "react";
import throttle from "lodash/throttle";


// 스크롤 방향에 따라 함수 실행
export const useScrollDirection = (
    parentId: string, // scrollElement의 부모 요소 id
    observeId: string, // scrollElement의 id
    downFunc: () => void, // 아래로 스크롤 시 실행될 함수
    upFunc: () => void // 위로 스크롤 시 실행될 함수
) => {
    const beforeScrollY = useRef(0);
    const observerRef = useRef<IntersectionObserver | null>(null);


    const handleScroll = useCallback(
        throttle(() => {
            const observeScrollElement = document.getElementById(observeId);
            if (!observeScrollElement) return;
            
            console.log(observeScrollElement.scrollTop);
            const currentScrollTop = observeScrollElement.scrollTop || 0;
            console.log(beforeScrollY.current, currentScrollTop);
        
            if (beforeScrollY.current < currentScrollTop) {
                downFunc();
            } else {
                upFunc();
            }
        
            beforeScrollY.current = currentScrollTop;
        }, 250),
        [observeId, downFunc, upFunc]
      );
    useEffect(() => {
        const parentScrollElement = document.getElementById(parentId);
        const scrollElement = document.getElementById(observeId);

        if (!parentScrollElement) {
            return;
        }
        if (!scrollElement) {
            return;
        }
        const startScrollTracking = () => {
            console.log("event check");

            parentScrollElement.addEventListener("scroll", handleScroll);
          };
      
        const stopScrollTracking = () => {
            parentScrollElement.removeEventListener("scroll", handleScroll);
        };
      
          // IntersectionObserver 설정
          observerRef.current = new IntersectionObserver(
            ([entry]) => {
              if (entry.isIntersecting) {
                // 관찰 대상(root)에 들어왔을 때 스크롤 트래킹 시작
                console.log("start");
                startScrollTracking();
              } else {
                // 관찰 대상(root)에서 벗어났을 때 스크롤 트래킹 중단
                console.log("stop");
                stopScrollTracking();
              }
            },
            { root: null, threshold: 0.1 } // root는 뷰포트, threshold는 10% 노출 시 트리거
          );
      
          // 관찰 시작
          observerRef.current.observe(scrollElement);
      
          return () => {
            // 클린업
            stopScrollTracking();
            observerRef.current?.disconnect();
          };
    }, [parentId, downFunc, upFunc]); // 의존성 배열에 scrollElement 추가
};
