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
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, getThemeColors, BorderRadius, Spacing, Typography } from '../../theme';

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
}

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

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
}: ButtonProps) {
  const colorScheme = useColorScheme();
  const theme = getThemeColors(colorScheme === 'dark' ? 'dark' : 'light');

  const isDisabled = disabled || loading;
  const shimmerProgress = useSharedValue(0);

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

  const getButtonStyle = (): ViewStyle => {
    const base: ViewStyle = {
      borderRadius: BorderRadius.lg,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: isDisabled ? 0.5 : 1,
      overflow: 'hidden',
    };

    const sizeStyles: Record<ButtonSize, ViewStyle> = {
      sm: { paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm, minHeight: 36 },
      md: { paddingHorizontal: Spacing.xl, paddingVertical: Spacing.md, minHeight: 48 },
      lg: { paddingHorizontal: Spacing['2xl'], paddingVertical: Spacing.lg, minHeight: 56 },
    };

    const variantStyles: Record<ButtonVariant, ViewStyle> = {
      primary: {
        backgroundColor: Colors.gold,
        shadowColor: Colors.gold,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
      },
      secondary: {
        backgroundColor: Colors.navy,
      },
      ghost: {
        backgroundColor: 'transparent',
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 1.5,
        borderColor: colorScheme === 'dark' ? Colors.goldLight : Colors.goldDark,
      },
      luxury: {
        backgroundColor: Colors.charcoal,
        borderWidth: 1,
        borderColor: Colors.gold,
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
      fontFamily: 'Inter-SemiBold',
      letterSpacing: 0.5,
    };

    const sizeStyles: Record<ButtonSize, TextStyle> = {
      sm: { fontSize: 13 },
      md: { fontSize: Typography.sizes.button },
      lg: { fontSize: Typography.sizes.body },
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
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.7}
    >
      {variant === 'luxury' && !isDisabled && (
        <AnimatedLinearGradient
          colors={['transparent', 'rgba(201, 169, 98, 0.2)', 'transparent']}
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
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {},
});
