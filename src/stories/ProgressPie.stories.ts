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

      width: 300,
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
      width: 300,
    },
  },
};
