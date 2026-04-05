// ============================================
// Malipula Suits - Theme System
// ============================================

import { Platform } from 'react-native';

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

const getNativeShadow = (width: number, height: number, opacity: number, radius: number, elevation: number) => ({
  shadowColor: '#000',
  shadowOffset: { width, height },
  shadowOpacity: opacity,
  shadowRadius: radius,
  elevation,
});

export const Shadows = {
  sm: {
    ...getNativeShadow(0, 1, 0.05, 2, 2),
  },
  md: {
    ...getNativeShadow(0, 2, 0.08, 8, 4),
  },
  lg: {
    ...getNativeShadow(0, 4, 0.12, 16, 8),
  },
  xl: {
    ...getNativeShadow(0, 8, 0.16, 24, 12),
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
