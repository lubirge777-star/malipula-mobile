import React from 'react';
import { View, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
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
    label: 'Shop',
    icon: 'bag-outline' as any,
    activeIcon: 'bag' as any,
    route: '/shop',
  },
  {
    name: 'bookings',
    label: 'Bookings',
    icon: 'calendar-outline' as any,
    activeIcon: 'calendar' as any,
    route: '/bookings',
  },
  {
    name: 'cart',
    label: 'Cart',
    icon: 'cart-outline' as any,
    activeIcon: 'cart' as any,
    route: '/cart',
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
  const cartItemCount = 3; // Mock cart count

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const tabConfig = TAB_ROUTES[index];
          if (!tabConfig) return null;

          const showBadge = tabConfig.name === 'cart' && cartItemCount > 0;

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
                  size={22}
                  color={isFocused ? '#C9A962' : '#6B6361'}
                />
                {showBadge && (
                  <View style={styles.badge}>
                    <Ionicons name="notifications" size={8} color="#FFFFFF" />
                  </View>
                )}
              </View>
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
    backgroundColor: Platform.OS === 'ios' ? 'rgba(250, 250, 245, 0.92)' : '#FAFAF5',
    borderTopColor: 'rgba(201, 169, 98, 0.15)',
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingBottom: Platform.OS === 'ios' ? 20 : 4,
  },
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 4,
    paddingTop: 6,
    height: Platform.OS === 'ios' ? 68 : 52,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -10,
    backgroundColor: '#C9A962',
    borderRadius: 10,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
    borderWidth: 2,
    borderColor: '#FAFAF5',
  },
  activeIndicator: {
    width: 20,
    height: 3,
    backgroundColor: '#C9A962',
    borderRadius: 2,
    marginTop: 4,
  },
});
