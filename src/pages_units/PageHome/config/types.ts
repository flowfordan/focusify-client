export const widgets = ['sounds', 'tasks', 'timer'] as const;
type WidgetName = (typeof widgets)[number];

export interface IWidget {
  name: WidgetName;
  isEnabled: boolean;
}
