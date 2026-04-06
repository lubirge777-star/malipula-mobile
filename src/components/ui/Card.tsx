// ============================================
// Malipula Suits - Card Component
// ============================================

import React from 'react';
import {
  View,
  Pressable,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { useColorScheme } from 'react-native';
import * as Haptics from 'expo-haptics';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { getThemeColors, BorderRadius, Shadows, Spacing } from '../../theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  padding?: keyof typeof Spacing;
  variant?: 'default' | 'elevated' | 'outlined' | 'glass';
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function Card({
  children,
  style,
  onPress,
  padding = 'lg',
  variant = 'default',
}: CardProps) {
  const colorScheme = useColorScheme();
  const theme = getThemeColors(colorScheme === 'dark' ? 'dark' : 'light');
  const scale = useSharedValue(1);

  const handlePressIn = () => {
    if (onPress) {
      scale.value = withSpring(0.97, { damping: 20, stiffness: 300 });
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const handlePressOut = () => {
    if (onPress) {
      scale.value = withSpring(1, { damping: 20, stiffness: 300 });
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const getCardStyle = (): ViewStyle => {
    const base: ViewStyle = {
      borderRadius: 32, // Upgraded from BorderRadius.lg for a fluid, premium container shape
      padding: Spacing[padding],
      backgroundColor: theme.surface,
    };

    const variantStyles: Record<string, ViewStyle> = {
      default: {
        ...Shadows.sm,
      },
      elevated: {
        ...Shadows.lg, // Stronger, softer shadows
      },
      outlined: {
        borderWidth: 1,
        borderColor: theme.border,
        shadowColor: 'transparent',
        shadowOpacity: 0,
        elevation: 0,
        backgroundColor: 'transparent',
      },
      glass: {
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.5)',
        ...Shadows.sm,
      }
    };

    return { ...base, ...variantStyles[variant], ...style };
  };

  const content = <View style={getCardStyle()}>{children}</View>;

  if (onPress) {
    return (
      <AnimatedPressable 
        onPress={onPress} 
        onPressIn={handlePressIn} 
        onPressOut={handlePressOut}
        style={animatedStyle}
      >
        {content}
      </AnimatedPressable>
    );
  }

  return content;
}
