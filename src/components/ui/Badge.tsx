// ============================================
// Malipula Suits - Badge Component
// ============================================

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useColorScheme } from 'react-native';
import { semanticColors, Spacing, BorderRadius } from '../../theme';

type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'default' | 'gold';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  style?: any;
}

export function Badge({ label, variant = 'default', size = 'sm', style }: BadgeProps) {
  const colorScheme = useColorScheme();

  const getStyles = () => {
    const base = {
      borderRadius: BorderRadius.full,
      paddingHorizontal: Spacing.md,
      paddingVertical: size === 'sm' ? 2 : Spacing.xs,
      alignSelf: 'flex-start' as const,
    };

    switch (variant) {
      case 'success':
        return {
          ...base,
          backgroundColor: semanticColors.success.bg,
        };
      case 'warning':
        return {
          ...base,
          backgroundColor: semanticColors.warning.bg,
        };
      case 'error':
        return {
          ...base,
          backgroundColor: semanticColors.error.bg,
        };
      case 'info':
        return {
          ...base,
          backgroundColor: semanticColors.info.bg,
        };
      case 'gold':
        return {
          ...base,
          backgroundColor: colorScheme === 'dark' ? 'rgba(201, 169, 98, 0.15)' : 'rgba(201, 169, 98, 0.12)',
        };
      default:
        return {
          ...base,
          backgroundColor: colorScheme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)',
        };
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'success':
        return semanticColors.success.text;
      case 'warning':
        return semanticColors.warning.text;
      case 'error':
        return semanticColors.error.text;
      case 'info':
        return semanticColors.info.text;
      case 'gold':
        return '#C9A962';
      default:
        return colorScheme === 'dark' ? '#9B9B9B' : '#6B6361';
    }
  };

  return (
    <View style={[getStyles(), style]}>
      <Text
        style={[
          styles.text,
          {
            color: getTextColor(),
            fontSize: size === 'sm' ? 11 : 13,
          },
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Inter-Medium',
    letterSpacing: 0.3,
  },
});
