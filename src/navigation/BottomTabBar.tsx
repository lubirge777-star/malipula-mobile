import React, { useEffect } from 'react';
import { View, TouchableOpacity, Platform, StyleSheet, Text, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { BlurView } from 'expo-blur';
import Animated, { 
  useAnimatedStyle, 
  withSpring, 
  useSharedValue,
  withTiming,
  FadeIn
} from 'react-native-reanimated';
import { Colors, getThemeColors } from '../theme';
import { TAB_ROUTES } from './types';

interface CustomTabBarProps {
  state: {
    index: number;
    routes: { name: string; key: string }[];
  };
  navigation: any;
  descriptors: any;
}

export default function BottomTabBar({ state, navigation }: CustomTabBarProps) {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = getThemeColors(colorScheme === 'dark' ? 'dark' : 'light');

  return (
    <BlurView intensity={Platform.OS === 'ios' ? 40 : 80} tint={colorScheme === 'dark' ? 'dark' : 'light'} style={[styles.container, { borderTopColor: theme.border }]}>
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const tabConfig = TAB_ROUTES[index];
          if (!tabConfig) return null;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              router.push(tabConfig.route as any);
            }
          };

          if (tabConfig.isFAB) {
            return (
              <TouchableOpacity
                key={route.key}
                onPress={onPress}
                activeOpacity={0.9}
                style={styles.fabContainer}
              >
                <View style={styles.fabLayer}>
                   <View style={[styles.fab, { backgroundColor: Colors.gold }]}>
                    <Ionicons name={tabConfig.icon as any} size={28} color="#000" />
                  </View>
                  <View style={styles.fabGlow} />
                </View>
                <Text style={[styles.fabLabel, { color: isFocused ? Colors.gold : 'rgba(255,255,255,0.6)' }]}>
                  {tabConfig.label}
                </Text>
              </TouchableOpacity>
            );
          }

          return (
            <TabItem
              key={route.key}
              isFocused={isFocused}
              tabConfig={tabConfig}
              onPress={onPress}
              theme={theme}
            />
          );
        })}
      </View>
    </BlurView>
  );
}

function TabItem({ isFocused, tabConfig, onPress, theme }: any) {
  const scale = useSharedValue(isFocused ? 1.1 : 1);

  useEffect(() => {
    scale.value = withSpring(isFocused ? 1.1 : 1, { damping: 15 });
  }, [isFocused]);

  const animatedIconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={styles.tabItem}
    >
      <Animated.View style={[styles.iconWrapper, animatedIconStyle]}>
        <Ionicons
          name={(isFocused ? tabConfig.activeIcon : tabConfig.icon) as any}
          size={22}
          color={isFocused ? Colors.gold : theme.textSecondary}
        />
      </Animated.View>
      <Text style={[styles.tabLabel, { color: isFocused ? Colors.gold : theme.textSecondary, fontWeight: isFocused ? '700' : '500' }]}>
        {tabConfig.label}
      </Text>
      {isFocused && (
        <Animated.View 
          entering={FadeIn.duration(300)}
          style={styles.activeIndicator} 
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingBottom: Platform.OS === 'ios' ? 24 : 8,
  },
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
    paddingTop: 8,
    height: Platform.OS === 'ios' ? 72 : 64,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    height: 24,
    width: 24,
  },
  tabLabel: {
    fontSize: 9,
    fontFamily: 'Inter',
    marginTop: 4,
    letterSpacing: 0.5,
  },
  fabContainer: {
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -30,
  },
  fabLayer: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
    zIndex: 2,
  },
  fabGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.gold,
    borderRadius: 30,
    opacity: 0.15,
    zIndex: 1,
  },
  fabLabel: {
    fontSize: 9,
    fontFamily: 'Inter',
    marginTop: 4,
    fontWeight: '700',
  },
  activeIndicator: {
    width: 3,
    height: 3,
    backgroundColor: Colors.gold,
    borderRadius: 1.5,
    marginTop: 4,
  },
});
