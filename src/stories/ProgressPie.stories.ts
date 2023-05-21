import type { Meta, StoryObj } from '@storybook/react';

import { ProgressPie } from '../components/progressPie/ProgressPie';

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

export const FirstStory: Story = {
  args: {
    currentProgressValue: 15,
    hundredPercentEquiv: 100,
    config: {
      barColorBackground: 'bg-gray-200',
      progressBarBorderColor: 'border-lime-500',
    },
    // 👇 The args you need here will depend on your component
  },
};
