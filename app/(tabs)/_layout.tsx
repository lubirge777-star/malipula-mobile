import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import BottomTabBar from '@/navigation/BottomTabBar';

const GOLD = '#C9A962';
const INACTIVE = '#6B6361';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: GOLD,
        tabBarInactiveTintColor: INACTIVE,
        tabBarStyle: {
          backgroundColor: 'transparent',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          borderTopWidth: 0,
        },
        tabBarLabelStyle: {
          fontFamily: 'Inter',
          fontSize: 10,
          fontWeight: '600',
          letterSpacing: 0.5,
        },
        tabBarHideOnKeyboard: true,
      }}
      tabBar={(props) => <BottomTabBar {...props} />}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="shop/index"
        options={{
          title: 'Shop',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'bag' : 'bag-outline'} size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="bookings/index"
        options={{
          title: 'Bookings',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'calendar' : 'calendar-outline'} size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart/index"
        options={{
          title: 'Cart',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'cart' : 'cart-outline'} size={22} color={color} />
          ),
          tabBarBadge: 3,
          tabBarBadgeStyle: {
            backgroundColor: GOLD,
            color: '#FFFFFF',
            fontSize: 10,
            minWidth: 18,
            height: 18,
            borderRadius: 9,
            fontFamily: 'Inter',
          },
        }}
      />
      <Tabs.Screen
        name="account/index"
        options={{
          title: 'Account',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'person' : 'person-outline'} size={22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
