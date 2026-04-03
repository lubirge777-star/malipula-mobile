// ============================================
// Malipula Suits - StatusBadge Component
// ============================================

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Spacing, BorderRadius, semanticColors, Colors } from '../../theme';
import type { OrderStatus, PaymentStatus, ProductionStatus } from '../../types';

type StatusType = OrderStatus | PaymentStatus | ProductionStatus | string;

interface StatusBadgeProps {
  status: StatusType;
  size?: 'sm' | 'md';
  showIcon?: boolean;
}

const orderStatusConfig: Record<string, { color: string; bg: string; icon: string; label: string }> = {
  PENDING: { color: '#C4882D', bg: semanticColors.warning.bg, icon: 'time', label: 'Pending' },
  CONFIRMED: { color: '#2E86AB', bg: semanticColors.info.bg, icon: 'checkmark-circle', label: 'Confirmed' },
  IN_PROGRESS: { color: '#2E86AB', bg: semanticColors.info.bg, icon: 'sync', label: 'In Progress' },
  READY: { color: '#2D7A4F', bg: semanticColors.success.bg, icon: 'checkmark-done', label: 'Ready' },
  DELIVERED: { color: '#2D7A4F', bg: semanticColors.success.bg, icon: 'checkmark-done-circle', label: 'Delivered' },
  CANCELLED: { color: '#C0392B', bg: semanticColors.error.bg, icon: 'close-circle', label: 'Cancelled' },
};

const paymentStatusConfig: Record<string, { color: string; bg: string; icon: string; label: string }> = {
  PAID: { color: '#2D7A4F', bg: semanticColors.success.bg, icon: 'checkmark-circle', label: 'Paid' },
  PENDING: { color: '#C4882D', bg: semanticColors.warning.bg, icon: 'time', label: 'Pending' },
  FAILED: { color: '#C0392B', bg: semanticColors.error.bg, icon: 'alert-circle', label: 'Failed' },
  REFUNDED: { color: '#2E86AB', bg: semanticColors.info.bg, icon: 'return-down-back', label: 'Refunded' },
};

function getConfig(status: StatusType) {
  if (paymentStatusConfig[status]) {
    return paymentStatusConfig[status];
  }
  if (orderStatusConfig[status]) {
    return orderStatusConfig[status];
  }
  // Default for unknown statuses (like production stages)
  return {
    color: '#2E86AB',
    bg: semanticColors.info.bg,
    icon: 'information-circle',
    label: status.replace(/_/g, ' '),
  };
}

export function StatusBadge({ status, size = 'sm', showIcon = true }: StatusBadgeProps) {
  const config = getConfig(status);
  const isSmall = size === 'sm';

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: config.bg,
          paddingHorizontal: isSmall ? Spacing.md : Spacing.lg,
          paddingVertical: isSmall ? 3 : Spacing.xs,
        },
      ]}
    >
      {showIcon && (
        <Ionicons
          name={config.icon as any}
          size={isSmall ? 12 : 14}
          color={config.color}
          style={{ marginRight: 4 }}
        />
      )}
      <Text
        style={[
          styles.text,
          {
            color: config.color,
            fontSize: isSmall ? 11 : 12,
          },
        ]}
      >
        {config.label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BorderRadius.full,
    alignSelf: 'flex-start',
  },
  text: {
    fontFamily: 'Inter-Medium',
    letterSpacing: 0.3,
  },
});
