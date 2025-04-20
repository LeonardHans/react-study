import React, { useEffect, useRef, useState } from 'react';

const ScrollableComponent = () => {
    const [isScrollable, setIsScrollable] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrollable(true);
            if (scrollRef.current) {
                clearTimeout(scrollRef.current.hideScrollbarTimeout);
                scrollRef.current.hideScrollbarTimeout = setTimeout(() => {
                    setIsScrollable(false);
                }, 1000); // 1초간 스크롤바 보이기
            }
        };

        const scrollContainer = scrollRef.current;
        if (scrollContainer) {
            scrollContainer.addEventListener('scroll', handleScroll);
        }
        return () => {
            // 이벤트 리스너 제거
            if (scrollContainer) {
                scrollContainer.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    return (
        <div
            ref={scrollRef}
            className="scrollable-element"
            style={{
                overflowY: isScrollable ? 'scroll' : 'hidden', // 스크롤 여부 설정
            }}
        >
            <div style={{ height: '1000px' }}> {/* 컨텐츠 높이를 늘려 스크롤이 발생하도록 */}
                Scrollable content here.
            </div>
        </div>
    );
};

export default ScrollableComponent;