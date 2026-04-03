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
} from 'react-native';
import { useColorScheme } from 'react-native';
import { getThemeColors, BorderRadius, Spacing, Colors } from '../../theme';

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

  const hasError = !!error;
  const borderColor = hasError
    ? Colors.error
    : isFocused
    ? Colors.gold
    : theme.border;

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, { color: theme.text }]}>
          {label}
        </Text>
      )}

      <View
        style={[
          styles.inputWrapper,
          {
            backgroundColor: theme.background,
            borderColor,
            borderWidth: 1.5,
            borderRadius: BorderRadius.md,
          },
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
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          autoCapitalize={props.autoCapitalize ?? 'none'}
          {...props}
        />

        {rightIcon && (
          <View style={styles.iconRight}>{rightIcon}</View>
        )}
      </View>

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
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginBottom: Spacing.xs,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    height: '100%',
  },
  iconLeft: {
    paddingLeft: Spacing.lg,
    marginRight: Spacing.sm,
  },
  iconRight: {
    paddingRight: Spacing.lg,
  },
  errorText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    marginTop: Spacing.xs,
  },
  hintText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    marginTop: Spacing.xs,
  },
});
