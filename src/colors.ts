export interface WorkspaceColor {
  label: string;
  value: string;
  description?: string;
}

export const WORKSPACE_COLORS: WorkspaceColor[] = [
  {
    label: "$(circle-filled) Pizazz",
    value: "#FA9203"
  },
  {
    label: "$(circle-filled) Trinidad",
    value: "#E14F08"
  },
  {
    label: "$(circle-filled) Thunderbird",
    value: "#B31A15"
  },
  {
    label: "$(circle-filled) Rose Bud Cherry",
    value: "#6D0E4E"
  },
  {
    label: "$(circle-filled) Jacarta",
    value: "#462969"
  },
  {
    label: "$(circle-filled) Victoria",
    value: "#4A4F9E"
  },
  {
    label: "$(circle-filled) Steel Blue",
    value: "#4F7ABB"
  }
];

export function darkenColor(hex: string, percent: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) - amt;
  const G = ((num >> 8) & 0x00ff) - amt;
  const B = (num & 0x0000ff) - amt;
  
  return "#" + (
    0x1000000 + 
    (R < 255 ? (R < 0 ? 0 : R) : 255) * 0x10000 +
    (G < 255 ? (G < 0 ? 0 : G) : 255) * 0x100 +
    (B < 255 ? (B < 0 ? 0 : B) : 255)
  ).toString(16).slice(1);
}