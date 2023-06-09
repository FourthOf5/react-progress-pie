import React, { useEffect, useState } from 'react';

import { ProgressPieConfig, ProgressPieLabelType } from '../../types';
import calculatePercentage from '../../utils/percentageCalcucator';

export interface ProgressPieLabelProps {
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
  labelType?: ProgressPieLabelType;
  /**
   * A custom component to be displayed as a label.
   *
   * Important: will be displayed only if label prop set to 'custom'
   */
  customLabelComponent?: React.ReactNode;
  /**
   * a style configuration for progress-pie-chart.
   * Notice: intended to be used with tailwind classes.
   * Tailwind generates a CSS file containing only the classes used in your project.
   * It can't recognise the dynamically generated class name you're using so doesn't include it in the output file.
   */
  config: Partial<ProgressPieConfig> | null;
}

function ProgressPieLabel(props: ProgressPieLabelProps) {
  const {
    labelType = 'percentages',
    customLabelComponent,
    hundredPercentEquiv,
    currentProgressValue,
    config,
  } = props;

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
      {labelType === 'percentages' && (
        <span
          className={`${config?.labelFontSize || 'text-3xl'} ${
            config?.labelColor || 'text-gray-500'
          } ${config?.labelFontWeight || 'font-semibold'}`}
        >
          {progressPercentage}%
        </span>
      )}
      {labelType === 'actualValues' && (
        <div
          className={`${config?.labelFontSize || 'text-3xl'} ${
            config?.labelColor || 'text-gray-500'
          } ${
            config?.labelFontWeight || 'font-semibold'
          } flex items-center justify-center flex-col`}
        >
          <span>
            {currentProgressValue}
            {(!config?.displayMeasurementInMaxValue && config?.progressMeasurement) || ''}
          </span>
          {config?.displayMaxValueLabel && (
            <span
              className={`${config?.maxValueLabelColor || config?.labelColor || 'text-gray-500'} ${
                config?.maxValueLabelFontSize || 'text-xl'
              } ${config?.maxValueLabelFontWeight || 'font-normal'}`}
            >
              /{hundredPercentEquiv}
              {(config?.displayMeasurementInMaxValue && config?.progressMeasurement) || ''}
            </span>
          )}
        </div>
      )}
      {labelType === 'customElement' && !!customLabelComponent && customLabelComponent}
    </div>
  );
}

export default ProgressPieLabel;
