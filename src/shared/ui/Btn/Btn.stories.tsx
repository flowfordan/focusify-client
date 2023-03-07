import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Btn } from './Btn';

export default {
  /* 👇 The title prop is optional.
  * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: 'Btn',
  component: Btn,
} as ComponentMeta<typeof Btn>;

export const Primary: ComponentStory<typeof Btn> = () => <Btn color='blue'>Btn</Btn>;