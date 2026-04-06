// ============================================
// Malipula Suits - Input Component
// ============================================

import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ViewStyle,
  TextInputProps,
  Pressable,
} from 'react-native';
import { useColorScheme } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withSpring, 
  interpolateColor 
} from 'react-native-reanimated';
import { getThemeColors, Spacing, Colors } from '../../theme';

interface InputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: ViewStyle;
}

export function Input({
  label,
  error,
  hint,
  icon,
  rightIcon,
  containerStyle,
  onChangeText,
  value,
  placeholder,
  ...props
}: InputProps) {
  const colorScheme = useColorScheme();
  const theme = getThemeColors(colorScheme === 'dark' ? 'dark' : 'light');
  const [isFocused, setIsFocused] = useState(false);
  const focusAnim = useSharedValue(0);

  const handleFocus = () => {
    setIsFocused(true);
    focusAnim.value = withSpring(1, { damping: 20, stiffness: 200 });
  };

  const handleBlur = () => {
    setIsFocused(false);
    focusAnim.value = withTiming(0, { duration: 300 });
  };

  const hasError = !!error;

  const animatedWrapperStyle = useAnimatedStyle(() => {
    const borderColor = interpolateColor(
      focusAnim.value,
      [0, 1],
      [theme.border, Colors.gold]
    );

    return {
      borderColor: hasError ? Colors.error : borderColor,
      transform: [
        { scale: withSpring(isFocused ? 1.01 : 1, { damping: 20, stiffness: 300 }) }
      ],
      shadowOpacity: withTiming(isFocused && !hasError ? 0.1 : 0, { duration: 200 }),
      shadowRadius: withTiming(isFocused ? 8 : 0),
    };
  });

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, { color: theme.text }]}>
          {label}
        </Text>
      )}

      <Animated.View
        style={[
          styles.inputWrapper,
          { backgroundColor: theme.background },
          animatedWrapperStyle,
        ]}
      >
        {icon && (
          <View style={[styles.iconLeft, (hasError ? { color: Colors.error } : { color: theme.textSecondary }) as any]}>
            {icon}
          </View>
        )}

        <TextInput
          style={[
            styles.input,
            {
              color: theme.text,
              paddingLeft: icon ? Spacing.sm : Spacing.lg,
              paddingRight: rightIcon ? Spacing.sm : Spacing.lg,
            },
          ]}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={theme.textSecondary}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          autoCapitalize={props.autoCapitalize ?? 'none'}
          {...props}
        />

        {rightIcon && (
          <View style={styles.iconRight}>{rightIcon}</View>
        )}
      </Animated.View>

      {error && (
        <Text style={[styles.errorText, { color: Colors.error }]}>
          {error}
        </Text>
      )}

      {hint && !error && (
        <Text style={[styles.hintText, { color: theme.textSecondary }]}>
          {hint}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },
  label: {
    fontSize: 13,
    fontFamily: 'Inter-Bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: Spacing.sm,
    marginLeft: 4,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 58, // Taller inputs for premium feel
    borderWidth: 1.5,
    borderRadius: 20, // Rounded to match premium spec
    shadowColor: Colors.gold,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    height: '100%',
  },
  iconLeft: {
    paddingLeft: Spacing.lg,
    marginRight: Spacing.xs,
  },
  iconRight: {
    paddingRight: Spacing.lg,
  },
  errorText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    marginTop: Spacing.sm,
    marginLeft: 4,
  },
  hintText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    marginTop: Spacing.sm,
    marginLeft: 4,
  },
});
