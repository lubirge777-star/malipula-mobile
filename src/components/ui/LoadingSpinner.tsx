// ============================================
// Malipula Suits - LoadingSpinner Component
// ============================================

import React from 'react';
import { ActivityIndicator, View, Text, StyleSheet } from 'react-native';
import { useColorScheme } from 'react-native';
import { getThemeColors, Spacing, Typography, Colors } from '../../theme';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  fullScreen?: boolean;
}

export function LoadingSpinner({
  size = 'md',
  label,
  fullScreen = false,
}: LoadingSpinnerProps) {
  const colorScheme = useColorScheme();
  const theme = getThemeColors(colorScheme === 'dark' ? 'dark' : 'light');

  const sizeMap = { sm: 'small', md: 'large', lg: 'large' } as const;
  const activitySize = sizeMap[size];

  const content = (
    <View style={styles.inner}>
      <ActivityIndicator size={activitySize} color={Colors.gold} />
      {label && (
        <Text
          style={[
            styles.label,
            {
              color: theme.textSecondary,
              fontSize: size === 'sm' ? Typography.sizes.caption : Typography.sizes.body,
            },
          ]}
        >
          {label}
        </Text>
      )}
    </View>
  );

  if (fullScreen) {
    return (
      <View style={[styles.container, styles.fullScreen, { backgroundColor: theme.background }]}>
        {content}
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingVertical: Spacing['2xl'] }]}>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullScreen: {
    flex: 1,
  },
  inner: {
    alignItems: 'center',
    gap: Spacing.md,
  },
  label: {
    fontFamily: 'Inter-Medium',
  },
});
