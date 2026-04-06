// ============================================
// Malipula Suits - Button Component
// ============================================

import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  View,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useColorScheme } from 'react-native';
import * as Haptics from 'expo-haptics';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  interpolate,
  withSpring,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, getThemeColors, Spacing, Typography } from '../../theme';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'luxury';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  hapticFeedback?: boolean;
}

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  style,
  textStyle,
  hapticFeedback = true,
}: ButtonProps) {
  const colorScheme = useColorScheme();
  const theme = getThemeColors(colorScheme === 'dark' ? 'dark' : 'light');

  const isDisabled = disabled || loading;
  const shimmerProgress = useSharedValue(0);
  const scale = useSharedValue(1);

  React.useEffect(() => {
    if (variant === 'luxury' && !isDisabled) {
      shimmerProgress.value = withRepeat(
        withTiming(1, { duration: 2500 }),
        -1,
        false
      );
    } else {
      shimmerProgress.value = 0;
    }
  }, [variant, isDisabled]);

  const shimmerStyle = useAnimatedStyle(() => {
    const translateX = interpolate(shimmerProgress.value, [0, 1], [-150, 150]);
    return {
      transform: [{ translateX }],
    };
  });

  const animatedInteractionStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    if (!isDisabled) {
      scale.value = withSpring(0.96, { damping: 15, stiffness: 300 });
      if (hapticFeedback) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const handlePressOut = () => {
    if (!isDisabled) {
      scale.value = withSpring(1, { damping: 15, stiffness: 300 });
    }
  };

  const getButtonStyle = (): ViewStyle => {
    const base: ViewStyle = {
      borderRadius: 24, // Premium, unified rounded aesthetics
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: isDisabled ? 0.5 : 1,
      overflow: 'hidden',
    };

    const sizeStyles: Record<ButtonSize, ViewStyle> = {
      sm: { paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm, minHeight: 40 },
      md: { paddingHorizontal: Spacing.xl, paddingVertical: Spacing.md, minHeight: 54 },
      lg: { paddingHorizontal: Spacing['2xl'], paddingVertical: Spacing.lg, minHeight: 64 },
    };

    const variantStyles: Record<ButtonVariant, ViewStyle> = {
      primary: {
        backgroundColor: Colors.gold,
        shadowColor: Colors.goldDark,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.35,
        shadowRadius: 12,
        elevation: 6,
      },
      secondary: {
        backgroundColor: Colors.navy,
      },
      ghost: {
        backgroundColor: 'transparent',
      },
      outline: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderWidth: 1.5,
        borderColor: colorScheme === 'dark' ? Colors.goldLight : Colors.gold,
      },
      luxury: {
        backgroundColor: Colors.charcoal,
        borderWidth: 1,
        borderColor: Colors.gold,
        shadowColor: Colors.charcoal,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 16,
      },
    };

    return {
      ...base,
      ...sizeStyles[size],
      ...variantStyles[variant],
      ...(fullWidth ? { width: '100%' } : {}),
      ...style,
    };
  };

  const getTextStyle = (): TextStyle => {
    const base: TextStyle = {
      fontFamily: 'Inter-Bold', // Bolder for luxury feel
      letterSpacing: 1.5,
      textTransform: 'uppercase', // More editorial Look
    };

    const sizeStyles: Record<ButtonSize, TextStyle> = {
      sm: { fontSize: 11 },
      md: { fontSize: 13 },
      lg: { fontSize: 15 },
    };

    const variantStyles: Record<ButtonVariant, TextStyle> = {
      primary: { color: Colors.charcoal },
      secondary: { color: Colors.ivory },
      ghost: { color: Colors.gold },
      outline: { color: colorScheme === 'dark' ? Colors.goldLight : Colors.goldDark },
      luxury: { color: Colors.gold },
    };

    return {
      ...base,
      ...sizeStyles[size],
      ...variantStyles[variant],
      ...textStyle,
    };
  };

  return (
    <AnimatedTouchableOpacity
      style={[getButtonStyle(), animatedInteractionStyle]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={isDisabled}
      activeOpacity={0.9}
    >
      {variant === 'luxury' && !isDisabled && (
        <AnimatedLinearGradient
          colors={['transparent', 'rgba(201, 169, 98, 0.25)', 'transparent']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[StyleSheet.absoluteFill, shimmerStyle]}
        />
      )}
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'secondary' || variant === 'luxury' ? Colors.ivory : Colors.charcoal}
        />
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <View style={{ marginRight: Spacing.sm }}>{icon}</View>
          )}
          <Text style={getTextStyle()}>{title}</Text>
          {icon && iconPosition === 'right' && (
            <View style={{ marginLeft: Spacing.sm }}>{icon}</View>
          )}
        </>
      )}
    </AnimatedTouchableOpacity>
  );
}

const styles = StyleSheet.create({});
