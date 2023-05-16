import React from 'react';
import './progressPie.scss';

interface ProgressPieProps {
  hundredPercentEquiv: number;
  currentProgressValue: number;
}

export const ProgressPie = (props: ProgressPieProps) => {
  const { hundredPercentEquiv } = props;
  return (
    <div className="container w-[300px] h-[300px]">
      <div className="c100 p10 blue">
        <span>10%</span>
        <div className="slice">
          <div className="bar"></div>
          <div className="fill"></div>
        </div>
      </div>
      {/*<div className={styles.circleWrap}>*/}
      {/*  <div className="circle">*/}
      {/*    <div className={`${styles.mask} ${styles.full}`}>*/}
      {/*      <div className={styles.fill}></div>*/}
      {/*    </div>*/}
      {/*    <div className={`${styles.mask} ${styles.half}`}>*/}
      {/*      <div className={styles.fill}></div>*/}
      {/*    </div>*/}
      {/*    <div className={styles.insideCircle}>70%</div>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  );
};
