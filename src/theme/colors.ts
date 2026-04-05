// ============================================
// Malipula Suits - Color System
// ============================================

export const Colors = {
  // Brand
  gold: '#C9A962',
  goldLight: '#E8D5A3',
  goldDark: '#A0874E',
  navy: '#1A2B44',
  navyLight: '#2A3F6B',
  ivory: '#FCFAF2',
  charcoal: '#2D2D2D',

  // Semantic
  success: '#2D7A4F',
  warning: '#C4882D',
  error: '#C0392B',
  info: '#2E86AB',

  // Adaptive (light)
  backgroundLight: '#FAFAF5',
  surfaceLight: '#FFFFFF',
  textLight: '#1A1714',
  textSecondaryLight: '#6B6361',
  borderLight: '#E8E4DF',

  // Adaptive (dark)
  backgroundDark: '#0F0F12',
  surfaceDark: '#1A1A1F',
  textDark: '#F5F5F0',
  textSecondaryDark: '#9B9B9B',
  borderDark: '#2A2A30',
} as const;

export type ColorScheme = 'light' | 'dark';

export interface ThemeColors {
  background: string;
  surface: string;
  surfaceElevated: string;
  text: string;
  textSecondary: string;
  border: string;
  borderLight: string;
  overlay: string;
}

export function getThemeColors(scheme: ColorScheme): ThemeColors {
  if (scheme === 'dark') {
    return {
      background: Colors.backgroundDark,
      surface: Colors.surfaceDark,
      surfaceElevated: '#242430',
      text: Colors.textDark,
      textSecondary: Colors.textSecondaryDark,
      border: Colors.borderDark,
      borderLight: '#1F1F28',
      overlay: 'rgba(0, 0, 0, 0.6)',
    };
  }
  return {
    background: Colors.backgroundLight,
    surface: Colors.surfaceLight,
    surfaceElevated: '#F5F3EE',
    text: Colors.textLight,
    textSecondary: Colors.textSecondaryLight,
    border: Colors.borderLight,
    borderLight: '#F0EDE8',
    overlay: 'rgba(0, 0, 0, 0.4)',
  };
}

// Quick semantic color accessors
export const semanticColors = {
  success: {
    bg: 'rgba(45, 122, 79, 0.1)',
    text: '#2D7A4F',
    border: 'rgba(45, 122, 79, 0.3)',
  },
  warning: {
    bg: 'rgba(196, 136, 45, 0.1)',
    text: '#C4882D',
    border: 'rgba(196, 136, 45, 0.3)',
  },
  error: {
    bg: 'rgba(192, 57, 43, 0.1)',
    text: '#C0392B',
    border: 'rgba(192, 57, 43, 0.3)',
  },
  info: {
    bg: 'rgba(46, 134, 171, 0.1)',
    text: '#2E86AB',
    border: 'rgba(46, 134, 171, 0.3)',
  },
} as const;
