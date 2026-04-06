import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  useColorScheme,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors, FontFamily, getThemeColors } from '../../../src/theme';
import { GlassView } from '../../../src/components/ui';

type MenuItem = {
  id: string;
  icon: any;
  label: string;
  route: string;
  badge?: string;
};

type MenuGroup = {
  title: string;
  items: MenuItem[];
};

const menuGroups: MenuGroup[] = [
  {
    title: 'My Suite',
    items: [
      { id: 'orders', icon: 'cube-outline', label: 'My Commissions', route: '/account/orders', badge: '2' },
      { id: 'measurements', icon: 'body-outline', label: 'Measurements Profile', route: '/account/measurements' },
      { id: 'wishlist', icon: 'heart-outline', label: 'Wishlist', route: '/account/wishlist', badge: '5' },
      { id: 'addresses', icon: 'location-outline', label: 'Delivery Destinations', route: '/account/addresses' },
    ],
  },
  {
    title: 'Preferences',
    items: [
      { id: 'notifications', icon: 'notifications-outline', label: 'Notifications', route: '' },
      { id: 'settings', icon: 'options-outline', label: 'Application Settings', route: '/account/settings' },
    ],
  },
  {
    title: 'Concierge',
    items: [
      { id: 'help', icon: 'chatbubbles-outline', label: 'Concierge Service', route: '' },
      { id: 'about', icon: 'information-circle-outline', label: 'House of Malipula', route: '' },
    ],
  },
];

const quickStats = [
  { id: '1', label: 'Archives', value: '12', icon: 'albums' as const },
  { id: '2', label: 'Sessions', value: '8', icon: 'calendar' as const },
  { id: '3', label: 'Privilege', value: '2,450', icon: 'diamond' as const },
];

export default function AccountScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const theme = getThemeColors(isDark ? 'dark' : 'light');
  const styles = getStyles(theme, isDark);

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Profile Header */}
        <View style={styles.header}>
          <View style={styles.profileRow}>
            <View style={styles.avatarContainer}>
              <Ionicons name="person" size={36} color={Colors.gold} />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Michael Kimaro</Text>
              <Text style={styles.profileEmail}>michael.kimaro@email.com</Text>
              <View style={styles.badgeRow}>
                <View style={styles.tierBadge}>
                  <Ionicons name="diamond" size={10} color={Colors.gold} />
                  <Text style={styles.tierText}>Gold Member</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.editBtn}>
              <Ionicons name="create-outline" size={20} color={isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)"} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsWrapper}>
          <GlassView intensity={isDark ? 30 : 60} style={styles.statsContainer}>
            {quickStats.map((stat, idx) => (
              <React.Fragment key={stat.id}>
                {idx > 0 && <View style={styles.statDivider} />}
                <TouchableOpacity style={styles.statItem} activeOpacity={0.7}>
                  <View style={styles.statIconWrapper}>
                    <Ionicons name={stat.icon} size={20} color={Colors.gold} />
                  </View>
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </TouchableOpacity>
              </React.Fragment>
            ))}
          </GlassView>
        </View>

        {/* Menu Groups */}
        <View style={styles.menusWrapper}>
          {menuGroups.map((group) => (
            <View key={group.title} style={styles.menuGroup}>
              <Text style={styles.groupTitle}>{group.title}</Text>
              <GlassView intensity={isDark ? 15 : 40} style={styles.groupCard}>
                {group.items.map((item, index) => (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.menuItem,
                      index < group.items.length - 1 && styles.menuItemBorder
                    ]}
                    onPress={() => item.route ? router.push(item.route as any) : null}
                    activeOpacity={0.7}
                  >
                    <View style={styles.menuIconWrapper}>
                      <Ionicons name={item.icon} size={18} color={Colors.gold} />
                    </View>
                    <Text style={styles.menuLabel}>{item.label}</Text>
                    {item.badge && (
                      <View style={styles.menuBadge}>
                        <Text style={styles.menuBadgeText}>{item.badge}</Text>
                      </View>
                    )}
                    <Ionicons name="chevron-forward" size={18} color={isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)"} />
                  </TouchableOpacity>
                ))}
              </GlassView>
            </View>
          ))}

          {/* Sign Out */}
          <TouchableOpacity style={styles.signOutBtn}>
            <Ionicons name="log-out-outline" size={20} color="#EF4444" />
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>

          {/* App Version */}
          <Text style={styles.versionText}>House of Malipula v1.0.0</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const getStyles = (theme: any, isDark: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    paddingTop: 80,
    paddingHorizontal: 24,
    paddingBottom: 48,
    backgroundColor: isDark ? 'rgba(15, 15, 18, 0.6)' : 'rgba(255, 255, 255, 0.8)',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    borderWidth: 1,
    borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatarContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(201, 169, 98, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(201, 169, 98, 0.4)',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontFamily: FontFamily.display,
    fontSize: 24,
    color: theme.text,
    fontWeight: '700',
  },
  profileEmail: {
    color: theme.textSecondary,
    fontSize: 14,
    marginTop: 4,
  },
  badgeRow: {
    flexDirection: 'row',
    marginTop: 8,
  },
  tierBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(201, 169, 98, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(201, 169, 98, 0.3)',
  },
  tierText: {
    color: Colors.gold,
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  editBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
  },
  statsWrapper: {
    marginHorizontal: 16,
    marginTop: -32,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 16,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(201, 169, 98, 0.2)',
    backgroundColor: isDark ? 'rgba(15, 15, 18, 0.9)' : 'rgba(255, 255, 255, 0.9)',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statDivider: {
    width: 1,
    backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
    marginVertical: 8,
  },
  statIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
  },
  statValue: {
    color: theme.text,
    fontSize: 18,
    fontWeight: '700',
    fontFamily: FontFamily.display,
  },
  statLabel: {
    color: theme.textSecondary,
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 4,
  },
  menusWrapper: {
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  menuGroup: {
    marginBottom: 24,
  },
  groupTitle: {
    color: Colors.gold,
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 12,
    paddingLeft: 4,
  },
  groupCard: {
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
    backgroundColor: isDark ? 'rgba(15, 15, 18, 0.6)' : 'rgba(255, 255, 255, 0.6)',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
  },
  menuIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    borderWidth: 1,
    borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
  },
  menuLabel: {
    flex: 1,
    color: theme.text,
    fontSize: 15,
    fontWeight: '500',
  },
  menuBadge: {
    backgroundColor: 'rgba(201, 169, 98, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginRight: 12,
  },
  menuBadgeText: {
    color: Colors.gold,
    fontSize: 11,
    fontWeight: '800',
  },
  signOutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 24,
    backgroundColor: 'rgba(239, 68, 68, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.2)',
    marginBottom: 24,
    marginTop: 8,
  },
  signOutText: {
    color: '#EF4444',
    fontSize: 15,
    fontWeight: '700',
    marginLeft: 8,
  },
  versionText: {
    textAlign: 'center',
    color: theme.textSecondary,
    fontSize: 12,
    letterSpacing: 1,
    fontFamily: FontFamily.display,
  },
});
