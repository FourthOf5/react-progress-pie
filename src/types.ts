export interface ProgressPieConfig {
  barColorBackground: string;
  progressBarBorderColor: string;
  progressBarOverflowBorderColor: string;
  width?: number;
  labelColor: string;
  labelFontSize: string;
}

export type ProgressPieLabelType = 'percentages' | 'actualValues' | 'customElement';
