/**
 * The WiDS brand palette, for consumers that cannot read CSS custom properties
 * — currently the react-email `<Tailwind>` config, which takes a JS object.
 *
 * These values mirror the `--w-*` and `--ws-*` custom properties defined in
 * `src/shared/styles/globals.css`. Change both together.
 *
 * Source of truth: WiDS Brand Guidelines (Ambassador Edition), p.10.
 */
export const WIDS_PALETTE = {
  // Neutral
  "w-black": "#000000",
  "w-gray": "#676767",
  "w-white": "#fafafa",

  // Primary — backgrounds and graphic elements only; none reaches 3:1 as text
  "w-green-light": "#4ab969",
  "w-blue": "#00a7d5",
  "w-yellow": "#ffcb05",
  "w-orange": "#ff8003",
  "w-purple": "#a2a2ff",
  "w-green-dark": "#004029",

  // Primary for accessibility — text at 24px+ on white, or headings
  "w-green-light-accessible": "#42a85f",
  "w-blue-accessible": "#009ec9",
  "w-orange-accessible": "#f76902",
  "w-purple-accessible": "#8d73de",
  "w-green-dark-accessible": "#173a21",

  // Secondary
  "ws-green": "#95e6ac",
  "ws-blue": "#a1dbe4",
  "ws-yellow": "#ffea95",
  "ws-orange": "#fcc5a1",
  "ws-purple": "#ececff",

  // Foreground used across the site for body copy and headings
  "w-foreground": "#173a21",
} as const;
