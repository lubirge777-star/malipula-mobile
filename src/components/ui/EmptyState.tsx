// ============================================
// Malipula Suits - EmptyState Component
// ============================================

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getThemeColors, Spacing, Colors, Typography } from '../../theme';

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  buttonText?: string;
  onPress?: () => void;
}

export function EmptyState({
  icon = 'cloud-offline-outline',
  title,
  description,
  buttonText,
  onPress,
}: EmptyStateProps) {
  const colorScheme = useColorScheme();
  const theme = getThemeColors(colorScheme === 'dark' ? 'dark' : 'light');

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: colorScheme === 'dark' ? 'rgba(201,169,98,0.08)' : 'rgba(27,42,74,0.04)',
          },
        ]}
      >
        <Ionicons
          name={icon as any}
          size={56}
          color={colorScheme === 'dark' ? Colors.goldLight : Colors.navyLight}
        />
      </View>

      <Text style={[styles.title, { color: theme.text }]}>
        {title}
      </Text>

      {description && (
        <Text style={[styles.description, { color: theme.textSecondary }]}>
          {description}
        </Text>
      )}

      {buttonText && onPress && (
        <TouchableOpacity
          style={[styles.button, { backgroundColor: Colors.gold }]}
          onPress={onPress}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing['2xl'],
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xl,
  },
  title: {
    fontSize: Typography.sizes.h2,
    fontFamily: 'Inter-SemiBold',
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  description: {
    fontSize: Typography.sizes.body,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 280,
    marginBottom: Spacing.xl,
  },
  button: {
    paddingHorizontal: Spacing['2xl'],
    paddingVertical: Spacing.md,
    borderRadius: 12,
    ...{ shadowColor: Colors.gold, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 4 },
  },
  buttonText: {
    fontSize: Typography.sizes.button,
    fontFamily: 'Inter-SemiBold',
    color: Colors.charcoal,
  },
});
