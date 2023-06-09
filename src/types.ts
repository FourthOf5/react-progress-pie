export interface ProgressPieConfig {
  barColorBackground?: string;
  progressBarBorderColor?: string;
  progressBarOverflowBorderColor?: string;
  width?: number;
  labelColor?: string;
  labelFontSize?: string;
  labelFontWeight?: string;
  progressMeasurement?: string;
  displayMaxValueLabel?: boolean;
  maxValueLabelColor?: string;
  maxValueLabelFontSize?: string;
  maxValueLabelFontWeight?: string;
  displayMeasurementInMaxValue?: boolean;
}

export type ProgressPieLabelType = 'percentages' | 'actualValues' | 'customElement';
