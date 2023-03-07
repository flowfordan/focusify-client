import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Card } from "./Card";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Card",
  component: Card,
} as ComponentMeta<typeof Card>;

export const Primary: ComponentStory<typeof Card> = () => (
  <Card color="blue">Card</Card>
);
