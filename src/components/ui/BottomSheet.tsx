// ============================================
// Malipula Suits - BottomSheet Component
// ============================================

import React, { useCallback, useRef } from 'react';
import {
  View,
  Pressable,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import { GestureHandlerRootView, GestureDetector, Gesture } from 'react-native-gesture-handler';
import { useColorScheme } from 'react-native';
import { getThemeColors, Spacing, BorderRadius, Colors } from '../../theme';

interface BottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  snapPoint?: number; // percentage of screen height (0-1)
}

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const MAX_TRANSLATE_Y = SCREEN_HEIGHT * 0.85;

export function BottomSheet({
  isVisible,
  onClose,
  title,
  children,
  snapPoint = 0.7,
}: BottomSheetProps) {
  const colorScheme = useColorScheme();
  const theme = getThemeColors(colorScheme === 'dark' ? 'dark' : 'light');
  const translateY = useRef(new Animated.Value(MAX_TRANSLATE_Y)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  const openSheet = useCallback(() => {
    Animated.parallel([
      Animated.spring(translateY, {
        toValue: MAX_TRANSLATE_Y * (1 - snapPoint),
        useNativeDriver: true,
        ...{ damping: 20, stiffness: 200 },
      }),
      Animated.timing(backdropOpacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  }, [snapPoint, translateY, backdropOpacity]);

  const closeSheet = useCallback(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: MAX_TRANSLATE_Y,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
    });
  }, [translateY, backdropOpacity, onClose]);

  React.useEffect(() => {
    if (isVisible) {
      // Reset and open
      translateY.setValue(MAX_TRANSLATE_Y);
      backdropOpacity.setValue(0);
      openSheet();
    }
  }, [isVisible, openSheet, translateY, backdropOpacity]);

  const pan = Gesture.Pan()
    .onChange((event) => {
      translateY.setValue(Math.max(0, (translateY as any)._value + event.changeY));
    })
    .onEnd(() => {
      if ((translateY as any)._value > MAX_TRANSLATE_Y * 0.4) {
        closeSheet();
      } else {
        openSheet();
      }
    });

  if (!isVisible) return null;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
      {/* Backdrop */}
      <Animated.View
        style={[
          styles.backdrop,
          {
            opacity: backdropOpacity,
          },
        ]}
      >
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={closeSheet}
        />
      </Animated.View>

      {/* Sheet */}
      <GestureDetector gesture={pan}>
        <Animated.View
          style={[
            styles.sheet,
            {
              backgroundColor: theme.surface,
              transform: [{ translateY }],
            },
          ]}
        >
          {/* Drag Handle */}
          <View style={styles.handleContainer}>
            <View
              style={[
                styles.handle,
                {
                  backgroundColor: colorScheme === 'dark' ? '#4A4A55' : '#D1D1D6',
                },
              ]}
            />
          </View>

          {/* Title */}
          {title && (
            <View style={styles.titleRow}>
              <Text style={[styles.title, { color: theme.text }]}>
                {title}
              </Text>
              <Pressable
                onPress={closeSheet}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Text style={[styles.closeButton, { color: Colors.gold }]}>
                  Done
                </Text>
              </Pressable>
            </View>
          )}

          {/* Content */}
          <View style={styles.content}>{children}</View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sheet: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: SCREEN_HEIGHT,
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    ...{ shadowColor: '#000', shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.15, shadowRadius: 16, elevation: 12 },
  },
  handleContainer: {
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E8E4DF',
  },
  title: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
  },
  closeButton: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  content: {
    padding: Spacing.lg,
  },
});
