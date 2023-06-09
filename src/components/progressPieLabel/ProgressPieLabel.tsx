import React, { useEffect, useState } from 'react';

import { ProgressPieConfig, ProgressPieLabelType } from '../../types';
import calculatePercentage from '../../utils/percentageCalcucator';

interface ProgressPieLabelProps {
  label?: ProgressPieLabelType;
  hundredPercentEquiv: number | null | undefined;
  currentProgressValue: number | null | undefined;
  config: ProgressPieConfig;
}

function ProgressPieLabel(props: ProgressPieLabelProps) {
  const { label = 'percentages', hundredPercentEquiv, currentProgressValue, config } = props;

  const [progressPercentage, setProgressPercentage] = useState(0);

  useEffect(() => {
    if (!currentProgressValue) {
      setProgressPercentage(0);
      return;
    }
    const progressPercentageVal = calculatePercentage(
      currentProgressValue,
      hundredPercentEquiv || 100,
    );
    setProgressPercentage(progressPercentageVal);
  }, [currentProgressValue, hundredPercentEquiv]);

  return (
    <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center">
      {label === 'percentages' && (
        <span
          className={`${config.labelFontSize || 'text-3xl'} ${
            config.labelColor || 'text-gray-500'
          } ${config.labelFontWeight || 'font-semibold'}`}
        >
          {progressPercentage}%
        </span>
      )}
      {label === 'actualValues' && (
        <div
          className={`${config.labelFontSize || 'text-3xl'} ${
            config.labelColor || 'text-gray-500'
          } ${config.labelFontWeight || 'font-semibold'} flex items-center justify-center flex-col`}
        >
          <span>
            {currentProgressValue}
            {(!config.displayMeasurementInMaxValue && config.progressMeasurement) || ''}
          </span>
          {config.displayMaxValueLabel ? (
            <span
              className={`${config.maxValueLabelColor || config.labelColor || 'text-gray-500'} ${
                config.maxValueLabelFontSize || 'text-xl'
              } ${config.maxValueLabelFontWeight || 'font-normal'}`}
            >
              /{hundredPercentEquiv}
              {(config?.displayMeasurementInMaxValue && config.progressMeasurement) || ''}
            </span>
          ) : (
            ''
          )}
        </div>
      )}
    </div>
  );
}

export default ProgressPieLabel;
