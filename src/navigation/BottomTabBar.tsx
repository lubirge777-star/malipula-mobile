import React from 'react';
import { View, TouchableOpacity, Platform, StyleSheet, useColorScheme, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors, getThemeColors } from '../theme';
import type { TabRoute } from './types';

const TAB_ROUTES: TabRoute[] = [
  {
    name: 'home',
    label: 'Home',
    icon: 'home-outline' as any,
    activeIcon: 'home' as any,
    route: '/',
  },
  {
    name: 'shop',
    label: 'Fabrics',
    icon: 'journal-outline' as any,
    activeIcon: 'journal' as any,
    route: '/shop',
  },
  {
    name: 'builder',
    label: 'Build',
    icon: 'cube-outline' as any,
    activeIcon: 'cube' as any,
    route: '/builder',
    isFAB: true,
  },
  {
    name: 'chat',
    label: 'Chat',
    icon: 'chatbubbles-outline' as any,
    activeIcon: 'chatbubbles' as any,
    route: '/chat',
  },
  {
    name: 'account',
    label: 'Account',
    icon: 'person-outline' as any,
    activeIcon: 'person' as any,
    route: '/account',
  },
];

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
  const isDark = colorScheme === 'dark';
  const theme = getThemeColors(isDark ? 'dark' : 'light');
  const cartItemCount = 3; // Mock cart count

  return (
    <View style={[styles.container, { backgroundColor: theme.background, borderTopColor: isDark ? 'rgba(201, 169, 98, 0.1)' : 'rgba(201, 169, 98, 0.2)' }]}>
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const tabConfig = TAB_ROUTES[index];
          if (!tabConfig) return null;

          const showBadge = false; // Add custom badge logic if needed for other tabs

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

          if ((tabConfig as any).isFAB) {
            return (
              <TouchableOpacity
                key={route.key}
                onPress={onPress}
                activeOpacity={0.85}
                style={styles.fabContainer}
              >
                <View style={[styles.fab, { backgroundColor: isDark ? Colors.gold : Colors.navy }]}>
                  <Ionicons name={tabConfig.icon as any} size={28} color={isDark ? Colors.navy : Colors.gold} />
                  <View style={styles.fabGlow} />
                </View>
                <Text style={[styles.fabLabel, { color: isFocused ? Colors.gold : theme.textSecondary }]}>{tabConfig.label}</Text>
              </TouchableOpacity>
            );
          }

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              activeOpacity={0.7}
              style={styles.tabItem}
            >
              <View style={styles.iconWrapper}>
                <Ionicons
                  name={(isFocused ? tabConfig.activeIcon : tabConfig.icon) as any}
                  size={20}
                  color={isFocused ? Colors.gold : isDark ? '#A0A0A0' : '#6B6361'}
                />
                {showBadge && (
                  <View style={[styles.badge, { borderColor: theme.background }]}>
                    <Text style={styles.badgeText}>{cartItemCount}</Text>
                  </View>
                )}
              </View>
              <Text style={[styles.tabLabel, { color: isFocused ? Colors.gold : isDark ? '#A0A0A0' : '#6B6361' }]}>
                {tabConfig.label}
              </Text>
              {isFocused && <View style={styles.activeIndicator} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
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
    height: Platform.OS === 'ios' ? 72 : 56,
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
    fontFamily: 'Poppins_500Medium',
    marginTop: 4,
    letterSpacing: 0.5,
  },
  fabContainer: {
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -30,
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
    position: 'relative',
    overflow: 'hidden',
  },
  fabGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  fabLabel: {
    fontSize: 9,
    fontFamily: 'Poppins_600SemiBold',
    marginTop: 4,
    fontWeight: '700',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -10,
    backgroundColor: Colors.gold,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
  },
  badgeText: {
    color: '#FFF',
    fontSize: 8,
    fontFamily: 'Poppins_600SemiBold',
  },
  activeIndicator: {
    width: 3,
    height: 3,
    backgroundColor: Colors.gold,
    borderRadius: 1.5,
    marginTop: 2,
  },
});
