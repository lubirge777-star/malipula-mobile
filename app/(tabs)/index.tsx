import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
  StyleSheet,
  Platform,
  useColorScheme,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  FadeInDown,
  FadeInUp,
  interpolate,
  useAnimatedScrollHandler,
  Extrapolate
} from 'react-native-reanimated';
import { Colors, getThemeColors, FontFamily, Shadows, Spacing } from '../../src/theme';
import { Button, GlassView, FloatingActions } from '../../src/components/ui';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const featuredCollections = [
  {
    id: 'bespoke-25',
    title: 'The Royal Heritage',
    subtitle: 'Limited Edition 2025',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&h=1200&fit=crop',
    color: Colors.gold,
  },
];

const quickActions = [
  { id: 'build', name: 'Design', icon: 'cut-outline' as any, color: Colors.gold, route: '/builder' },
  { id: 'measure', name: 'Measure', icon: 'scan-outline' as any, color: Colors.white, route: '/measure/scan' },
  { id: 'stylist', name: 'Concierge', icon: 'chatbubbles-outline' as any, color: Colors.gold, route: '/chat' },
  { id: 'orders', name: 'Tracking', icon: 'time-outline' as any, color: Colors.white, route: '/account/orders' },
];

const categories = [
  { id: 'suits', name: 'Premium Suits', type: 'BESPOKE', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop' },
  { id: 'traditional', name: 'Legacy Wear', type: 'TRADITIONAL', image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&h=800&fit=crop' },
];

export default function HomeScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const theme = getThemeColors(isDark ? 'dark' : 'light');
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const headerStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, 80], [0, 1]);
    const translateY = interpolate(scrollY.value, [-100, 0], [20, 0], Extrapolate.CLAMP);
    
    const darkBg = `rgba(5, 5, 5, ${opacity * 0.9})`;
    const lightBg = `rgba(255, 255, 255, ${opacity * 0.9})`;

    return {
      backgroundColor: isDark ? darkBg : lightBg,
      borderBottomWidth: opacity > 0.5 ? StyleSheet.hairlineWidth : 0,
      borderBottomColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
      transform: [{ translateY }],
      paddingTop: Platform.OS === 'ios' ? 50 : 30,
    };
  });

  const heroImageStyle = useAnimatedStyle(() => {
    const scale = interpolate(scrollY.value, [-100, 0, 300], [1.2, 1, 1.1], Extrapolate.CLAMP);
    const translateY = interpolate(scrollY.value, [0, 300], [0, 50]);

    return {
      transform: [{ scale }, { translateY }],
    };
  });

  const heroContentStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, 200], [1, 0], Extrapolate.CLAMP);
    const translateY = interpolate(scrollY.value, [0, 200], [0, -30], Extrapolate.CLAMP);

    return {
      opacity,
      transform: [{ translateY }],
    };
  });

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      
      {/* Sticky Premium Header */}
      <Animated.View style={[styles.header, headerStyle]}>
        <View style={styles.headerContent}>
          <Text style={[styles.logoText, { color: Colors.gold }]}>MALIPULA</Text>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={[styles.iconBtn, { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)', borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)' }]}>
              <Ionicons name="search-outline" size={20} color={Colors.gold} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.iconBtn, { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)', borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)' }]} onPress={() => router.push('/account/notifications' as any)}>
              <Ionicons name="notifications-outline" size={20} color={isDark ? Colors.ivory : Colors.charcoal} />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>

      <Animated.ScrollView 
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Dynamic Hero Section */}
        <View style={styles.heroContainer}>
          <Animated.View 
            entering={FadeInUp.delay(200).duration(1000)}
            style={styles.heroCard}
          >
            <Animated.Image 
              source={{ uri: featuredCollections[0].image }}
              style={[styles.heroImage, heroImageStyle]}
              resizeMode="cover"
            />
            <View style={styles.heroOverlay} />
            <Animated.View style={[styles.heroContentWrapper, heroContentStyle]}>
              <View style={[styles.heroContent, { backgroundColor: isDark ? 'rgba(15, 15, 18, 0.85)' : 'rgba(255, 255, 255, 0.85)', borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 1)' }]}>
                <Text style={styles.heroSubtitle}>{featuredCollections[0].subtitle}</Text>
                <Text style={[styles.heroTitle, { color: theme.text }]}>{featuredCollections[0].title}</Text>
                <View style={styles.heroDivider} />
                <Button 
                  title="Discover Collection" 
                  variant="primary"
                  size="md"
                  onPress={() => router.push('/shop')}
                  style={styles.heroBtn}
                />
              </View>
            </Animated.View>
          </Animated.View>
        </View>

        {/* Executive Quick Access (Service Grid) */}
        <Animated.View 
          entering={FadeInDown.delay(400).duration(800)}
          style={styles.quickActionsContainer}
        >
          {quickActions.map((action, index) => (
            <TouchableOpacity 
              key={action.id}
              style={styles.actionItem}
              onPress={() => router.push(action.route as any)}
              activeOpacity={0.7}
            >
              <View style={[
                styles.actionIconContainer, 
                { 
                  backgroundColor: isDark ? 'rgba(20, 20, 22, 0.8)' : '#FFFFFF',
                  borderColor: action.color === Colors.gold 
                    ? 'rgba(201, 169, 98, 0.4)' 
                    : (isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)')
                }
              ]}>
                <Ionicons 
                  name={action.icon as any} 
                  size={24} 
                  color={action.color === Colors.gold ? Colors.gold : (isDark ? Colors.ivory : Colors.charcoal)} 
                />
                {action.id === 'build' && <View style={styles.activeDot} />}
              </View>
              <Text style={[
                styles.actionText, 
                { color: action.color === Colors.gold ? Colors.gold : theme.textSecondary }
              ]}>{action.name}</Text>
            </TouchableOpacity>
          ))}
        </Animated.View>

        {/* Featured Collections Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>The Archive</Text>
              <Text style={styles.sectionSubtitle}>2025 MASTERPIECES</Text>
            </View>
            <TouchableOpacity onPress={() => router.push('/shop')}>
              <Text style={[styles.viewAllText, { color: Colors.gold }]}>View All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}
            decelerationRate="fast"
            snapToInterval={SCREEN_WIDTH * 0.7 + 16}
          >
            {categories.map((cat, index) => (
              <TouchableOpacity key={cat.id} style={[styles.categoryCard, { borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }]} activeOpacity={0.9}>
                <Image source={{ uri: cat.image }} style={styles.categoryImage} />
                <View style={styles.categoryOverlayGradient} />
                <View style={styles.categoryContent}>
                  <View>
                    <Text style={styles.categoryType}>{cat.type}</Text>
                    <Text style={styles.categoryName}>{cat.name}</Text>
                  </View>
                  <View style={styles.categoryActionBtn}>
                    <Ionicons name="chevron-forward" size={16} color={Colors.white} />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Brand Narrative Section */}
        <Animated.View 
          entering={FadeInUp.delay(600).duration(800)}
          style={styles.narrativeContainer}
        >
          <View style={[styles.narrativeCard, { backgroundColor: isDark ? 'rgba(20, 20, 22, 0.85)' : '#FFFFFF', borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)' }]}>
            <Text style={styles.narrativeScript}>Our Philosophy</Text>
            <Text style={[styles.narrativeTitle, { color: theme.text }]}>THE KAUNDA STANDARD</Text>
            <Text style={[styles.narrativeDesc, { color: theme.textSecondary }]}>
              A fusion of African heritage and Savile Row precision. Every suit tells a story of identity, power, and personalized perfection.
            </Text>
            <View style={styles.narrativeFooter}>
              <Button 
                title="Our Story" 
                variant="outline"
                size="sm"
                onPress={() => {}}
                style={styles.narrativeBtn}
              />
              <TouchableOpacity style={styles.narrativeLink}>
                <Text style={styles.narrativeLinkText}>Meet the Master Tailor</Text>
                <Ionicons name="arrow-forward" size={14} color={Colors.gold} />
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>

        <View style={styles.footerSpacer} />
      </Animated.ScrollView>
      <FloatingActions />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: Platform.OS === 'ios' ? 100 : 80,
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    zIndex: 100,
    ...Platform.select({
      web: { backdropFilter: 'blur(16px)' }
    })
  },
  headerContent: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoText: {
    fontFamily: FontFamily.display,
    fontSize: 22,
    letterSpacing: 6,
    fontWeight: '700',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  scrollContent: {
    paddingBottom: 140,
  },
  heroContainer: {
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 120 : 100,
  },
  heroCard: {
    height: SCREEN_HEIGHT * 0.6,
    borderRadius: 32,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    ...Shadows.md,
  },
  heroImage: {
    ...StyleSheet.absoluteFillObject,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  heroContentWrapper: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
  },
  heroContent: {
    padding: 32,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    borderTopWidth: 1,
    ...Platform.select({
      web: { backdropFilter: 'blur(16px)' }
    })
  },
  heroSubtitle: {
    color: Colors.gold,
    fontFamily: FontFamily.medium,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 3,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  heroTitle: {
    fontFamily: FontFamily.display,
    fontSize: 38,
    lineHeight: 44,
    fontWeight: '700',
    marginBottom: 20,
  },
  heroDivider: {
    width: 60,
    height: 3,
    backgroundColor: Colors.gold,
    marginBottom: 24,
  },
  heroBtn: {
    alignSelf: 'flex-start',
    paddingHorizontal: 28,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginTop: 40,
  },
  actionItem: {
    alignItems: 'center',
    gap: 10,
  },
  actionIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 20,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    ...Shadows.sm,
  },
  activeDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.gold,
    shadowColor: Colors.gold,
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  actionText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  sectionContainer: {
    marginTop: 56,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: FontFamily.display,
    fontSize: 26,
    fontWeight: '700',
    letterSpacing: 1,
  },
  sectionSubtitle: {
    color: Colors.gold,
    fontFamily: FontFamily.medium,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 3,
    marginTop: 4,
  },
  viewAllText: {
    fontSize: 13,
    fontWeight: '700',
  },
  horizontalScroll: {
    paddingLeft: 24,
    paddingRight: 8,
  },
  categoryCard: {
    width: SCREEN_WIDTH * 0.7,
    height: 280,
    borderRadius: 28,
    marginRight: 16,
    overflow: 'hidden',
    borderWidth: 1,
    ...Shadows.md,
  },
  categoryImage: {
    ...StyleSheet.absoluteFillObject,
  },
  categoryOverlayGradient: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  categoryContent: {
    position: 'absolute',
    bottom: 24,
    left: 24,
    right: 24,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  categoryType: {
    color: Colors.gold,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 4,
  },
  categoryName: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '700',
    fontFamily: FontFamily.display,
  },
  categoryActionBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  narrativeContainer: {
    paddingHorizontal: 16,
    marginTop: 64,
  },
  narrativeCard: {
    padding: 32,
    borderRadius: 36,
    borderWidth: 1,
    alignItems: 'center',
    ...Shadows.lg,
  },
  narrativeScript: {
    color: Colors.gold,
    fontFamily: FontFamily.script,
    fontSize: 28,
    marginBottom: 12,
  },
  narrativeTitle: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 4,
    marginBottom: 20,
    textAlign: 'center',
  },
  narrativeDesc: {
    fontSize: 15,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 32,
    fontFamily: FontFamily.medium,
  },
  narrativeFooter: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  narrativeBtn: {
    borderColor: Colors.gold,
    paddingHorizontal: 20,
  },
  narrativeLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  narrativeLinkText: {
    color: Colors.gold,
    fontSize: 13,
    fontWeight: '700',
  },
  footerSpacer: {
    height: 120, // Increased spacer to prevent overlap with the newly floating tab bar
  },
});

