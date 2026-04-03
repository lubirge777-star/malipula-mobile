// ============================================
// Malipula Suits - Theme System
// ============================================

export { Colors, getThemeColors, semanticColors } from './colors';
export type { ColorScheme, ThemeColors } from './colors';
export { useFonts, FontFamily, Fonts } from './fonts';

// ---------- Spacing ----------

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  '2xl': 32,
  '3xl': 48,
  '4xl': 64,
} as const;

// ---------- Border Radius ----------

export const BorderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
} as const;

// ---------- Typography ----------

export const Typography = {
  sizes: {
    display: 32,
    h1: 26,
    h2: 20,
    body: 16,
    caption: 13,
    button: 15,
    price: 18,
  },
  lineHeights: {
    display: 40,
    h1: 34,
    h2: 28,
    body: 24,
    caption: 18,
    button: 20,
    price: 24,
  },
} as const;

// ---------- Shadows ----------

export const Shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 24,
    elevation: 12,
  },
} as const;

// ---------- Animation ----------

export const Animation = {
  fast: 150,
  normal: 250,
  slow: 350,
  spring: { damping: 15, stiffness: 150, mass: 1 },
} as const;

// ---------- Layout ----------

export const Layout = {
  screenWidth: 375,
  screenHeight: 812,
  maxWidth: 500,
  tabBarHeight: 85,
  headerHeight: 56,
  horizontalPadding: 20,
} as const;
