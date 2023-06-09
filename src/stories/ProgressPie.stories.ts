import type { Meta, StoryObj } from '@storybook/react';

import ProgressPie from '../components/progressPie/ProgressPie';

// 👇 This default export determines where your story goes in the story list
const meta: Meta<typeof ProgressPie> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'ProgressPie',
  component: ProgressPie,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ProgressPie>;

export const BasicChart: Story = {
  args: {
    currentProgressValue: 15,
    hundredPercentEquiv: 100,
    config: {
      barColorBackground: 'bg-gray-200',
      progressBarBorderColor: 'border-pink-500',
      progressBarOverflowBorderColor: 'border-pink-700',
      labelColor: 'text-pink-600',
      labelFontSize: 'text-4xl',
      width: 250,
    },
  },
};

export const ProgressOver100Percent: Story = {
  args: {
    currentProgressValue: 156,
    hundredPercentEquiv: 100,
    config: {
      barColorBackground: 'bg-gray-200',
      progressBarBorderColor: 'border-green-400',
      progressBarOverflowBorderColor: 'border-green-600',
      labelColor: 'text-green-500',
      labelFontSize: 'text-4xl',
      width: 250,
    },
  },
};

export const ProgressPieWithActualValuesAsLabel: Story = {
  args: {
    currentProgressValue: 75,
    hundredPercentEquiv: 256,
    label: 'actualValues',
    config: {
      barColorBackground: 'bg-gray-200',
      progressBarBorderColor: 'border-orange-400',
      progressBarOverflowBorderColor: 'border-orange-600',
      labelColor: 'text-orange-500',
      labelFontSize: 'text-4xl',
      width: 250,
      displayMaxValueLabel: true,
      maxValueLabelColor: 'text-gray-400',
      maxValueLabelFontSize: 'text-2xl',
      progressMeasurement: 'kg',
      displayMeasurementInMaxValue: true,
    },
  },
};
