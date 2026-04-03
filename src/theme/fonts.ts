// ============================================
// Malipula Suits - Font System
// ============================================

import { useCallback, useEffect, useState } from 'react';
import * as Font from 'expo-font';

export const Fonts = {
  interRegular: 'Inter_400Regular',
  interMedium: 'Inter_500Medium',
  interSemiBold: 'Inter_600SemiBold',
  interBold: 'Inter_700Bold',
  playfairRegular: 'PlayfairDisplay_400Regular',
  playfairMedium: 'PlayfairDisplay_500Medium',
  playfairSemiBold: 'PlayfairDisplay_600SemiBold',
  playfairBold: 'PlayfairDisplay_700Bold',
} as const;

export const FontFamily = {
  regular: Fonts.interRegular,
  medium: Fonts.interMedium,
  semiBold: Fonts.interSemiBold,
  bold: Fonts.interBold,
  display: Fonts.playfairRegular,
  displayMedium: Fonts.playfairMedium,
  displaySemiBold: Fonts.playfairSemiBold,
  displayBold: Fonts.playfairBold,
} as const;

export function useFonts() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = useCallback(async () => {
    try {
      await Font.loadAsync({
        Inter_400Regular: require('@expo-google-fonts/inter/Inter_400Regular.ttf'),
        Inter_500Medium: require('@expo-google-fonts/inter/Inter_500Medium.ttf'),
        Inter_600SemiBold: require('@expo-google-fonts/inter/Inter_600SemiBold.ttf'),
        Inter_700Bold: require('@expo-google-fonts/inter/Inter_700Bold.ttf'),
        PlayfairDisplay_400Regular: require('@expo-google-fonts/playfair-display/PlayfairDisplay_400Regular.ttf'),
        PlayfairDisplay_500Medium: require('@expo-google-fonts/playfair-display/PlayfairDisplay_500Medium.ttf'),
        PlayfairDisplay_600SemiBold: require('@expo-google-fonts/playfair-display/PlayfairDisplay_600SemiBold.ttf'),
        PlayfairDisplay_700Bold: require('@expo-google-fonts/playfair-display/PlayfairDisplay_700Bold.ttf'),
      });
      setFontsLoaded(true);
    } catch (error) {
      console.warn('Failed to load fonts:', error);
      // Fallback: still set to true to avoid infinite loading, but warn
      setFontsLoaded(true);
    }
  }, []);

  useEffect(() => {
    loadFonts();
  }, [loadFonts]);

  return fontsLoaded;
}
