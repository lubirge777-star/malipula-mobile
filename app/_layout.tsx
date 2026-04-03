// ============================================
// Malipula Suits - Root Layout
// ============================================

import React, { useEffect } from 'react';
import { Slot } from 'expo-router';
import { useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, FontFamily, getThemeColors, Colors } from '../src/theme';
import { onAuthStateChange } from '../src/lib/supabase/auth';
import { useAuthStore } from '../src/stores/authStore';
import '../global.css';

// Create React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 2,
    },
  },
});

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync().catch(() => {
  /* hydration error */
});

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  useEffect(() => {
    // Apply dark mode class to body/root for CSS variables
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', isDark);
    }
  }, [isDark]);

  return <>{children}</>;
}

export default function RootLayout() {
  const fontsLoaded = useFonts();
  const setSession = useAuthStore((state) => state.setSession);
  const setLoading = useAuthStore((state) => state.setLoading);
  const colorScheme = useColorScheme();

  useEffect(() => {
    // Subscribe to auth state changes
    const subscription = onAuthStateChange((user) => {
      if (user) {
        // Build a minimal session-like object
        setSession({
          user,
          access_token: '',
          token_type: 'bearer',
          expires_in: 3600,
          expires_at: Date.now() / 1000 + 3600,
          refresh_token: '',
          provider_token: null,
          provider_refresh_token: null,
        } as any);
      } else {
        setSession(null);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [setSession, setLoading]);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const isDark = colorScheme === 'dark';
  const theme = getThemeColors(isDark ? 'dark' : 'light');

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <StatusBar
              style={isDark ? 'light' : 'dark'}
              backgroundColor={isDark ? Colors.navy : Colors.ivory}
            />
            <Slot />
          </ThemeProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
