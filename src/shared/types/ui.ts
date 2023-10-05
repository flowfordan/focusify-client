export const themes = [
  'light_default',
  'dark_default',
  'twilight',
  'mystic_stillness',
] as const;
export type Theme = (typeof themes)[number];
