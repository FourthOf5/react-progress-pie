import React, { useEffect, useState } from 'react';
import './progressPie.scss';

const calcPercentage = (partialValue: number, totalValue: number) =>
  Math.round((100 * partialValue) / totalValue);

interface ProgressPieProps {
  /**
   * a number that represents a 100% value (100 by default)?
   */
  hundredPercentEquiv: number | null | undefined;
  /**
   * a number that represents current progress (0 by default)
   */
  currentProgressValue: number | null | undefined;
}

/**
 * Progress-pie component for creating progress bars in circular fashion.
 */
export const ProgressPie = (props: ProgressPieProps) => {
  const { hundredPercentEquiv = 100, currentProgressValue } = props;

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!currentProgressValue) {
      setProgress(0);
      return;
    }
    setProgress(calcPercentage(currentProgressValue, hundredPercentEquiv || 100));
  }, [currentProgressValue, hundredPercentEquiv]);

  return (
    <div className="w-[300px] h-[300px]">
      <div className={`c100 p${progress} blue`}>
        <span>{progress}%</span>
        <div className="slice">
          <div className="bar"></div>
          <div className="fill"></div>
        </div>
      </div>
    </div>
  );
};
