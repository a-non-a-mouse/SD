import { ReactElement, useRef } from 'react';
import './slider.css';
import { isTouchEvent } from '../../utils/predicates';

type SliderProps = {
  children: ReactElement[];
};

export default function Slider({ children }: SliderProps) {
  const numChildren = children.length;
  const pageNodes = Array.from({ length: numChildren }).map((_, index) => {
    const className = 'slider-page-num' + (index === 0 ? ' active' : '');
    return <div className={className} key={'page-num' + index}></div>;
  });

  const easeDuration = 0.5 * 1000;
  let touchStartPageX = 0;
  let pageDirection = 'X';
  let pageMult = 1;
  let sliderLeft = 0;
  let easeStart: number | null = null;
  let startLeft = 0;
  let targetLeft = 0;
  let targetIndex = 0;
  let lastPageX = 0;
  let lastMoveEvent = 0;
  let inertia = 0;
  let currentPage = 0;

  const sliderRef = useRef<HTMLDivElement>(null);
  const pagenumsRef = useRef<HTMLDivElement>(null);
  let sliderWidth = 0;
  let maxSlide = 0;

  function easeInOut(k: number) {
    return 0.5 * (Math.sin((k - 0.5) * Math.PI) + 1);
  }

  function storeScrollSettings(offset: number = 0) {
    if (easeStart) return;

    easeStart = Date.now();
    startLeft = parseInt(sliderRef.current!.style.left) || 0;
    if (offset === 0) {
      targetIndex = Math.round(Math.abs(startLeft / sliderWidth));
    } else {
      targetIndex = currentPage + offset;
    }

    if (targetIndex < 0) targetIndex = 0;
    if (targetIndex > numChildren - 1) targetIndex = numChildren - 1;

    targetLeft = -targetIndex * sliderWidth;
    setActivePageNum(targetIndex);
  }

  function setActivePageNum(index: number) {
    currentPage = index;
    const pageNodes = Array.from(pagenumsRef.current!.children);

    pageNodes.forEach((page) => page.classList.remove('active'));
    pageNodes[index].classList.add('active');
  }

  function scrollToNearestPage(offset: number = 0) {
    storeScrollSettings(offset);

    const now = Date.now();
    let elapsed = now - easeStart!;
    if (elapsed > easeDuration) {
      elapsed = easeDuration;
    }
    const easePosition = easeInOut(elapsed / easeDuration);

    setSlider(startLeft + (targetLeft - startLeft) * easePosition);

    if (elapsed < easeDuration) {
      requestAnimationFrame(() => scrollToNearestPage());
    } else {
      sliderLeft = targetLeft;
      easeStart = 0;
    }
  }

  function getPageX(ev: React.TouchEvent | React.MouseEvent): number {
    if (isTouchEvent(ev)) {
      const touches = ev.changedTouches;
      if (touches.length > 1) return 0;

      return pageMult * touches[0][pageDirection === 'X' ? 'pageX' : 'pageY'];
    } else {
      return pageMult * ev[pageDirection === 'X' ? 'screenX' : 'screenY'];
    }
  }

  function setSlider(left: number) {
    if (left > 0) left = 0;
    if (left < maxSlide) left = maxSlide;

    sliderRef.current!.style.left = `${left}px`;
  }

  function storeSliderWidth() {
    sliderWidth = sliderRef.current
      ? (sliderRef.current.parentNode! as HTMLDivElement)[
          pageDirection === 'X' ? 'offsetWidth' : 'offsetHeight'
        ]
      : 0;

    maxSlide = -children.length * sliderWidth;
  }

  const calculateInertia = (pageX: number) => {
    const now = Date.now();

    if (lastPageX) {
      const xOffset = pageX - lastPageX;
      const tOffset = now - lastMoveEvent;
      inertia = xOffset / tOffset;
    }

    lastPageX = pageX;
    lastMoveEvent = now;
  };

  const touchStart = (ev: React.TouchEvent | React.MouseEvent) => {
    ev.preventDefault();

    touchStartPageX = getPageX(ev);
    storeSliderWidth();
  };

  const touchMove = (ev: React.TouchEvent | React.MouseEvent) => {
    if (!touchStartPageX) return;

    ev.nativeEvent.preventDefault();
    ev.nativeEvent.stopPropagation();

    const curPageX = getPageX(ev);
    setSlider(pageMult * curPageX - touchStartPageX + sliderLeft);

    calculateInertia(curPageX);
  };

  const touchEnd = (ev: React.TouchEvent | React.MouseEvent) => {
    if (Math.abs(inertia) > 1) {
      scrollToNearestPage(inertia < 0 ? 1 : -1);
    } else {
      scrollToNearestPage();
    }

    touchStartPageX = 0;
  };

  return (
    <>
      <div
        key="sliderContent"
        id="slider"
        ref={sliderRef}
        onTouchStart={touchStart}
        onTouchMove={touchMove}
        onTouchEnd={touchEnd}
        onMouseDown={touchStart}
        onMouseMove={touchMove}
        onMouseUp={touchEnd}
      >
        {children}
      </div>
      <div key="sliderControls" id="slider-page" ref={pagenumsRef}>
        {pageNodes}
      </div>
    </>
  );
}
