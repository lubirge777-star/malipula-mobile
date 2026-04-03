// ============================================
// Malipula Suits - CategoryChip Component
// ============================================

import React from 'react';
import {
  ScrollView,
  Pressable,
  Text,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { useColorScheme } from 'react-native';
import { getThemeColors, BorderRadius, Spacing, Colors } from '../../theme';

interface CategoryChip {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface CategoryChipGroupProps {
  categories: CategoryChip[];
  selectedId?: string;
  onSelect: (id: string) => void;
  style?: ViewStyle;
}

export function CategoryChipGroup({
  categories,
  selectedId,
  onSelect,
  style,
}: CategoryChipGroupProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[styles.container, style]}
    >
      {categories.map((category) => (
        <SingleChip
          key={category.id}
          label={category.label}
          icon={category.icon}
          isSelected={selectedId === category.id}
          onPress={() => onSelect(category.id)}
        />
      ))}
    </ScrollView>
  );
}

interface SingleChipProps {
  label: string;
  icon?: React.ReactNode;
  isSelected: boolean;
  onPress: () => void;
}

function SingleChip({ label, icon, isSelected, onPress }: SingleChipProps) {
  const colorScheme = useColorScheme();
  const theme = getThemeColors(colorScheme === 'dark' ? 'dark' : 'light');

  return (
    <Pressable
      style={[
        styles.chip,
        {
          backgroundColor: isSelected ? Colors.gold : theme.surface,
          borderColor: isSelected ? Colors.gold : theme.border,
          borderWidth: 1.5,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {icon && <View style={{ marginRight: Spacing.xs }}>{icon}</View>}
      <Text
        style={[
          styles.chipText,
          {
            color: isSelected ? Colors.charcoal : theme.text,
          },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.lg,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    ...{ shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 1 },
  },
  chipText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
});
