import { TierConfig } from './types';

export const CANVAS_WIDTH = 1080;
export const CANVAS_HEIGHT = 1920;
export const FPS = 30;

// Ranking Tier configurations - Tier S is vibrant Red
export const TIER_CONFIGS: TierConfig[] = [
  { id: 'S', label: 'S', color: '#EF4444', bg: '#FEE2E2' },
  { id: 'A', label: 'A', color: '#FF9F43', bg: '#FFF7ED' },
  { id: 'B', label: 'B', color: '#FECA57', bg: '#FEFCE8' },
  { id: 'C', label: 'C', color: '#F1C40F', bg: '#FEF9C3' },
  { id: 'F', label: 'F', color: '#54A0FF', bg: '#EFF6FF' },
];

// Layout Geometry - Generous 100px padding from screen edges, scaled down content
export const BOARD_LAYOUT = {
  left: 100,
  width: 880,
  top: 320,
  rowHeight: 114,
  rowGap: 12,
  badgeWidth: 96,
  badgeHeight: 96,
  slotStartX: 100 + 10 + 96 + 18,
  slotSize: 90,
};

// Target coordinates for each tier slot (center x, center y)
export const TIER_SLOT_COORDS: Record<string, { x: number; y: number }> = {
  S: { x: BOARD_LAYOUT.slotStartX + BOARD_LAYOUT.slotSize / 2, y: BOARD_LAYOUT.top + BOARD_LAYOUT.rowHeight / 2 },
  A: { x: BOARD_LAYOUT.slotStartX + BOARD_LAYOUT.slotSize / 2, y: BOARD_LAYOUT.top + (BOARD_LAYOUT.rowHeight + BOARD_LAYOUT.rowGap) * 1 + BOARD_LAYOUT.rowHeight / 2 },
  B: { x: BOARD_LAYOUT.slotStartX + BOARD_LAYOUT.slotSize / 2, y: BOARD_LAYOUT.top + (BOARD_LAYOUT.rowHeight + BOARD_LAYOUT.rowGap) * 2 + BOARD_LAYOUT.rowHeight / 2 },
  C: { x: BOARD_LAYOUT.slotStartX + BOARD_LAYOUT.slotSize / 2, y: BOARD_LAYOUT.top + (BOARD_LAYOUT.rowHeight + BOARD_LAYOUT.rowGap) * 3 + BOARD_LAYOUT.rowHeight / 2 },
  F: { x: BOARD_LAYOUT.slotStartX + BOARD_LAYOUT.slotSize / 2, y: BOARD_LAYOUT.top + (BOARD_LAYOUT.rowHeight + BOARD_LAYOUT.rowGap) * 4 + BOARD_LAYOUT.rowHeight / 2 },
};

// Center floating spawn position for rank card (Center of upper board area)
export const FLOATING_CENTER = {
  x: 540,
  y: 629,
};

// Speaker Face Card Geometry (100px margin from screen edges, perfectly aligned)
export const SPEAKER_LAYOUT = {
  left: 100,
  top: 1080,
  width: 880,
  height: 660,
  borderRadius: 36,
};
