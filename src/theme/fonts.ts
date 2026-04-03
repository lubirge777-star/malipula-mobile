// ============================================
// Malipula Suits - Font System
// ============================================

import { useCallback, useEffect, useState } from 'react';
import * as Font from 'expo-font';

export const Fonts = {
  interRegular: 'Inter-Regular',
  interMedium: 'Inter-Medium',
  interSemiBold: 'Inter-SemiBold',
  interBold: 'Inter-Bold',
  playfairRegular: 'PlayfairDisplay-Regular',
  playfairMedium: 'PlayfairDisplay-Medium',
  playfairSemiBold: 'PlayfairDisplay-SemiBold',
  playfairBold: 'PlayfairDisplay-Bold',
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
        [Fonts.interRegular]: require('@expo-google-fonts/inter/Inter_400Regular.ttf'),
        [Fonts.interMedium]: require('@expo-google-fonts/inter/Inter_500Medium.ttf'),
        [Fonts.interSemiBold]: require('@expo-google-fonts/inter/Inter_600SemiBold.ttf'),
        [Fonts.interBold]: require('@expo-google-fonts/inter/Inter_700Bold.ttf'),
        [Fonts.playfairRegular]: require('@expo-google-fonts/playfair-display/PlayfairDisplay_400Regular.ttf'),
        [Fonts.playfairMedium]: require('@expo-google-fonts/playfair-display/PlayfairDisplay_500Medium.ttf'),
        [Fonts.playfairSemiBold]: require('@expo-google-fonts/playfair-display/PlayfairDisplay_600SemiBold.ttf'),
        [Fonts.playfairBold]: require('@expo-google-fonts/playfair-display/PlayfairDisplay_700Bold.ttf'),
      });
      setFontsLoaded(true);
    } catch (error) {
      console.error('Failed to load fonts:', error);
      // Fallback: still set to true to avoid infinite loading
      setFontsLoaded(true);
    }
  }, []);

  useEffect(() => {
    loadFonts();
  }, [loadFonts]);

  return fontsLoaded;
}
