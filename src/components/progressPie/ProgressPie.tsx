import React, { useEffect, useState } from 'react';

import { ProgressPieConfig, ProgressPieLabelType } from '../../types';
import calculatePercentage from '../../utils/percentageCalcucator';
import ProgressPieLabel from '../progressPieLabel/ProgressPieLabel';

import './progressPie.scss';

export const defaultProgressPieConfig: ProgressPieConfig = {
  barColorBackground: 'bg-gray-50',
  progressBarBorderColor: 'border-green-400',
  progressBarOverflowBorderColor: 'border-green-600',
  labelColor: 'text-gray-900',
  labelFontSize: 'text-4xl',
  labelFontWeight: 'font-semibold',
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
   * label that displays information:
   * - percentages (default) - will display progress in percentage equivalent: "23%"
   * - actualValues - will display the actual numbers: "23/100"
   * - custom - will render custom JSX component
   */
  label?: ProgressPieLabelType;
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
  const { hundredPercentEquiv = 100, currentProgressValue, label, config } = props;

  const [progress, setProgress] = useState(0);
  const [progressOverHundred, setProgressOverHundred] = useState(0);
  const [pieChartConfig, setPieChartConfig] = useState<ProgressPieConfig>(defaultProgressPieConfig);

  useEffect(() => {
    if (!currentProgressValue) {
      setProgress(0);
      return;
    }
    const progressPercentageVal = calculatePercentage(
      currentProgressValue,
      hundredPercentEquiv || 100,
    );
    setProgress(progressPercentageVal <= 100 ? progressPercentageVal : 100);
    let percentageOverflow = 0;
    if (progressPercentageVal > 100) {
      percentageOverflow = progressPercentageVal - 100 < 200 ? progressPercentageVal - 100 : 200;
    }
    setProgressOverHundred(percentageOverflow);
  }, [currentProgressValue, hundredPercentEquiv]);

  useEffect(() => {
    setPieChartConfig({
      ...defaultProgressPieConfig,
      ...(config || {}),
    });
  }, [config]);

  return (
    <div
      className="relative"
      style={{ width: pieChartConfig?.width || 300, height: pieChartConfig?.width || 300 }}
    >
      <div
        className={`c100 p${progress} o${progressOverHundred} ${
          pieChartConfig?.barColorBackground || 'bg-gray-50'
        } w-full h-full`}
      >
        <div className="slice">
          <div className={`bar ${pieChartConfig.progressBarBorderColor}`} />
          <div className={`fill ${pieChartConfig.progressBarBorderColor}`} />
        </div>
        <div className="slice-overflow">
          <div className={`bar-overflow ${pieChartConfig.progressBarOverflowBorderColor}`} />
          <div className={`fill-overflow ${pieChartConfig.progressBarOverflowBorderColor}`} />
        </div>
      </div>
      <ProgressPieLabel
        label={label}
        currentProgressValue={currentProgressValue}
        hundredPercentEquiv={hundredPercentEquiv}
        config={pieChartConfig}
      />
    </div>
  );
}

export default ProgressPie;
