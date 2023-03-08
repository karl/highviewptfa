import React from "react";
import classnames from "classnames";

import styles from "./Carousel.module.css";
import { Theme } from "./Pickeroo";

type CarouselProps = {
  selectedIndex: number;
  revolutions: number;
  theme: Theme;
  children: React.ReactNode;
};

const Carousel = ({ selectedIndex, revolutions, theme, children }: CarouselProps) => {
  const total = React.Children.count(children);
  const deg = 720 * revolutions + (360 / total) * selectedIndex;
  const tz =
    total === 1 ? 0 : -Math.round((240 + 10) / 2 / Math.tan(Math.PI / total));
  const perspective = Math.max(0, Math.min(1000, 1000 / (total / 10)));
  return (
    <div className={classnames(styles.Carousel, styles['theme-' + theme])} style={{ perspective }}>
      <div
        className={styles.CarouselInner}
        style={{ transform: `translateZ(${tz}px)` }}
      >
        <div
          className={styles.CarouselInner2}
          style={{ transform: `rotateY(${-deg}deg)` }}
        >
          {React.Children.map(children, (child, i) => (
            <CarouselItem key={i} index={i} total={total}>
              {child}
            </CarouselItem>
          ))}
        </div>
      </div>
    </div>
  );
};

type CarouselItemProps = {
  index: number;
  total: number;
  children: React.ReactNode;
};

const CarouselItem = ({ index, total, children }: CarouselItemProps) => {
  const deg = (360 / total) * index;
  const tz =
    total === 1 ? 0 : Math.round((240 + 10) / 2 / Math.tan(Math.PI / total));
  return (
    <div
      className={styles.CarouselItem}
      style={{ transform: `rotateY(${deg}deg) translateZ(${tz}px)` }}
    >
      {children}
    </div>
  );
};

export default Carousel;
