import React, { useEffect, useState } from 'react';
import './progressPie.scss';

const calcPercentage = (partialValue: number, totalValue: number) =>
  Math.round((100 * partialValue) / totalValue);

export interface ProgressPieConfig {
  barColorBackground: string;
  progressBarBorderColor: string;
}

export const defaultProgressPieConfig: ProgressPieConfig = {
  barColorBackground: 'bg-gray-50',
  progressBarBorderColor: 'border-green-400',
};

interface ProgressPieProps {
  /**
   * a number that represents a 100% value (100 by default)?
   */
  hundredPercentEquiv: number | null | undefined;
  /**
   * a number that represents current progress (0 by default)
   */
  currentProgressValue: number | null | undefined;
  /**
   * a style configuration for progress-pie-chart.
   * Notice: intended to be used with tailwind classes.
   * Tailwind generates a CSS file containing only the classes used in your project.
   * It can't recognise the dynamically generated class name you're using so doesn't include it in the output file.
   */
  config: Partial<ProgressPieConfig> | null;
}

/**
 * Progress-pie component for creating progress bars in circular fashion.
 */
function ProgressPie(props: ProgressPieProps) {
  const { hundredPercentEquiv = 100, currentProgressValue, config } = props;

  const [progress, setProgress] = useState(0);
  const [pieChartConfig, setPieChartConfig] = useState<ProgressPieConfig>(defaultProgressPieConfig);

  useEffect(() => {
    if (!currentProgressValue) {
      setProgress(0);
      return;
    }
    setProgress(calcPercentage(currentProgressValue, hundredPercentEquiv || 100));
  }, [currentProgressValue, hundredPercentEquiv]);

  useEffect(() => {
    setPieChartConfig({
      ...defaultProgressPieConfig,
      ...(config || {}),
    });
  }, [config]);

  return (
    <div className="w-[300px] h-[300px]">
      <div className={`c100 p${progress} ${config?.barColorBackground}`}>
        <span>{progress}%</span>
        <div className="slice">
          <div className={`bar ${pieChartConfig.progressBarBorderColor} border-amber-400`} />
          <div className={`fill ${pieChartConfig.progressBarBorderColor} border-amber-400`} />
        </div>
      </div>
    </div>
  );
}

export default ProgressPie;
