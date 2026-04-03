// ============================================
// Malipula Suits - SearchBar Component
// ============================================

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  View,
  TextInput,
  Pressable,
  StyleSheet,
} from 'react-native';
import { useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getThemeColors, Spacing, BorderRadius, Colors } from '../../theme';

interface SearchBarProps {
  value?: string;
  onSearch: (query: string) => void;
  placeholder?: string;
  debounceMs?: number;
  autoFocus?: boolean;
  onClear?: () => void;
}

export function SearchBar({
  value: controlledValue,
  onSearch,
  placeholder = 'Search suits, fabrics, styles...',
  debounceMs = 400,
  autoFocus = false,
  onClear,
}: SearchBarProps) {
  const colorScheme = useColorScheme();
  const theme = getThemeColors(colorScheme === 'dark' ? 'dark' : 'light');
  const [internalValue, setInternalValue] = useState(controlledValue ?? '');
  const [isFocused, setIsFocused] = useState(false);
  const debounceTimer = useRef<ReturnType<typeof setTimeout>>();

  const isControlled = controlledValue !== undefined;
  const displayValue = isControlled ? controlledValue : internalValue;

  const debouncedSearch = useCallback(
    (query: string) => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
      debounceTimer.current = setTimeout(() => {
        onSearch(query);
      }, debounceMs);
    },
    [onSearch, debounceMs]
  );

  const handleChange = (text: string) => {
    if (!isControlled) {
      setInternalValue(text);
    }
    debouncedSearch(text);
  };

  const handleClear = () => {
    if (!isControlled) {
      setInternalValue('');
    }
    debouncedSearch('');
    onClear?.();
  };

  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
          borderColor: isFocused ? Colors.gold : theme.border,
          borderWidth: 1.5,
        },
      ]}
    >
      <Ionicons
        name="search"
        size={18}
        color={isFocused ? Colors.gold : theme.textSecondary}
      />

      <TextInput
        style={[styles.input, { color: theme.text }]}
        value={displayValue}
        onChangeText={handleChange}
        placeholder={placeholder}
        placeholderTextColor={theme.textSecondary}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        autoFocus={autoFocus}
        returnKeyType="search"
        autoCorrect={false}
        autoCapitalize="none"
      />

      {displayValue.length > 0 && (
        <Pressable
          onPress={handleClear}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons
            name="close-circle"
            size={18}
            color={theme.textSecondary}
          />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: 15,
    fontFamily: 'Inter-Regular',
    height: '100%',
  },
});
