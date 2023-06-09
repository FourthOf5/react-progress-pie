import React, { useEffect, useState } from 'react';

import { ProgressPieConfig } from '../../types';
import calculatePercentage from '../../utils/percentageCalcucator';
import ProgressPieLabel, { ProgressPieLabelProps } from '../progressPieLabel/ProgressPieLabel';

import './progressPie.scss';

export const defaultProgressPieConfig: ProgressPieConfig = {
  barColorBackground: 'bg-gray-50',
  progressBarBorderColor: 'border-green-400',
  progressBarOverflowBorderColor: 'border-green-600',
  labelColor: 'text-gray-900',
  labelFontSize: 'text-4xl',
  labelFontWeight: 'font-semibold',
};

/**
 * Progress-pie component for creating progress bars in circular fashion.
 */
function ProgressPie(props: ProgressPieLabelProps) {
  const {
    hundredPercentEquiv = 100,
    currentProgressValue,
    labelType,
    config,
    customLabelComponent,
  } = props;

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
        labelType={labelType}
        customLabelComponent={customLabelComponent}
        currentProgressValue={currentProgressValue}
        hundredPercentEquiv={hundredPercentEquiv}
        config={pieChartConfig}
      />
    </div>
  );
}

export default ProgressPie;
