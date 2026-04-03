// ============================================
// Malipula Suits - Card Component
// ============================================

import React, { useState } from 'react';
import {
  View,
  Pressable,
  StyleSheet,
  Animated,
  ViewStyle,
} from 'react-native';
import { useColorScheme } from 'react-native';
import { getThemeColors, BorderRadius, Shadows, Spacing } from '../../theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  padding?: keyof typeof Spacing;
  variant?: 'default' | 'elevated' | 'outlined';
}

export function Card({
  children,
  style,
  onPress,
  padding = 'lg',
  variant = 'default',
}: CardProps) {
  const colorScheme = useColorScheme();
  const theme = getThemeColors(colorScheme === 'dark' ? 'dark' : 'light');
  const [scale] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    if (onPress) {
      Animated.spring(scale, {
        toValue: 0.97,
        useNativeDriver: true,
        ...{ damping: 20, stiffness: 300 },
      }).start();
    }
  };

  const handlePressOut = () => {
    if (onPress) {
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
        ...{ damping: 20, stiffness: 300 },
      }).start();
    }
  };

  const getCardStyle = (): ViewStyle => {
    const base: ViewStyle = {
      borderRadius: BorderRadius.lg,
      padding: Spacing[padding],
      backgroundColor: theme.surface,
    };

    const variantStyles: Record<string, ViewStyle> = {
      default: Shadows.sm,
      elevated: Shadows.md,
      outlined: {
        borderWidth: 1,
        borderColor: theme.border,
        shadowColor: 'transparent',
        shadowOpacity: 0,
        elevation: 0,
      },
    };

    return { ...base, ...variantStyles[variant], ...style };
  };

  const content = <View style={getCardStyle()}>{children}</View>;

  if (onPress) {
    return (
      <Pressable onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
        <Animated.View style={{ transform: [{ scale }] }}>{content}</Animated.View>
      </Pressable>
    );
  }

  return content;
}
