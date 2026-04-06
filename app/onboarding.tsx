import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Platform, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  interpolate, 
  Extrapolate, 
  useAnimatedScrollHandler, 
  SharedValue,
  runOnJS,
} from 'react-native-reanimated';
import { Colors, FontFamily, getThemeColors } from '../src/theme';
import { Ionicons } from '@expo/vector-icons';
import { GlassView } from '../src/components/ui';

const ONBOARDING_DATA = [
  {
    id: '1',
    title: 'The Art of Bespoke',
    subtitle: 'HERITAGE CRAFTSMANSHIP',
    description: 'Beyond tailoring. We craft masterpieces that reflect your unique identity through legendary artistry.',
    image: 'https://images.unsplash.com/photo-1593032465175-481ac7f401a0?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'AI Precision',
    subtitle: 'MODERN TECHNOLOGY',
    description: 'Our proprietary AI engine captures 28+ biometric data points for a perfect fit, every time.',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: '3',
    title: 'Global Excellence',
    subtitle: 'WORLDWIDE REACH',
    description: 'From the heart of Tanzania to the global stage. Experience the Malipula standard of excellence.',
    image: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?q=80&w=1200&auto=format&fit=crop',
  },
];

const Pagination = ({ scrollX, width }: { scrollX: SharedValue<number>, width: number }) => {
  return (
    <View style={styles.paginationContainer}>
      {ONBOARDING_DATA.map((_, i) => {
        const animatedStyle = useAnimatedStyle(() => {
          const isActive = interpolate(
            scrollX.value,
            [(i - 0.5) * width, i * width, (i + 0.5) * width],
            [0, 1, 0],
            Extrapolate.CLAMP
          );
          
          return {
            width: interpolate(isActive, [0, 1], [8, 28]),
            opacity: interpolate(isActive, [0, 1], [0.2, 1]),
            backgroundColor: Colors.gold,
            transform: [{ scale: interpolate(isActive, [0, 1], [0.8, 1.2]) }],
          };
        });

        return <Animated.View key={i} style={[styles.dot, animatedStyle]} />;
      })}
    </View>
  );
};

const OnboardingItem = ({ 
  item, 
  index, 
  scrollX, 
  width, 
  height,
  theme,
  isDark,
}: { 
  item: typeof ONBOARDING_DATA[0], 
  index: number, 
  scrollX: SharedValue<number>, 
  width: number,
  height: number,
  theme: any,
  isDark: boolean,
}) => {
  const animatedContentStyle = useAnimatedStyle(() => {
    const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
    
    const opacity = interpolate(
      scrollX.value,
      inputRange,
      [0, 1, 0],
      Extrapolate.CLAMP
    );
    
    const translateY = interpolate(
      scrollX.value,
      inputRange,
      [50, 0, -50],
      Extrapolate.CLAMP
    );
    
    const scale = interpolate(
      scrollX.value,
      inputRange,
      [0.9, 1, 0.9],
      Extrapolate.CLAMP
    );

    return {
      opacity,
      transform: [{ translateY }, { scale }],
    };
  });

  const animatedImageStyle = useAnimatedStyle(() => {
    const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
    const translateX = interpolate(
      scrollX.value,
      inputRange,
      [-width * 0.2, 0, width * 0.2],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ translateX }],
    };
  });

  return (
    <View style={[styles.page, { width, height, backgroundColor: theme.background }]}>
      <Animated.View style={[styles.imageWrapper, { width }, animatedImageStyle]}>
        <Image 
          source={{ uri: item.image }} 
          style={styles.image} 
        />
        <View style={styles.imageOverlay} />
      </Animated.View>
      
      <View style={styles.contentContainer}>
        <Animated.View style={[
          styles.contentCardWrapper, 
          animatedContentStyle,
          { borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }
        ]}>
          <GlassView intensity={isDark ? 30 : 60} style={[styles.contentCard, { backgroundColor: isDark ? 'rgba(15, 15, 18, 0.6)' : 'rgba(255, 255, 255, 0.7)' }]}>
            <View style={styles.subtitleWrapper}>
              <Text style={styles.subtitle}>{item.subtitle}</Text>
              <View style={styles.subtitleLine} />
            </View>
            <Text style={[styles.title, { color: theme.text }]}>{item.title}</Text>
            <Text style={[styles.description, { color: theme.textSecondary }]}>{item.description}</Text>
          </GlassView>
        </Animated.View>
      </View>
    </View>
  );
};

export default function OnboardingScreen() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const scrollX = useSharedValue(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const theme = getThemeColors(isDark ? 'dark' : 'light');

  const setIndex = (index: number) => {
    if (index !== currentIndex) {
      setCurrentIndex(index);
    }
  };

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
      const index = Math.round(event.contentOffset.x / width);
      runOnJS(setIndex)(index);
    },
  });

  const handleNext = () => {
    if (currentIndex < ONBOARDING_DATA.length - 1) {
      flatListRef.current?.scrollToIndex({ 
        index: currentIndex + 1,
        animated: true 
      });
    } else {
      router.replace('/(auth)/sign-in');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar style={isDark ? "light" : "dark"} />
      
      <Animated.FlatList
        ref={flatListRef}
        data={ONBOARDING_DATA}
        renderItem={({ item, index }) => (
          <OnboardingItem 
            item={item} 
            index={index} 
            scrollX={scrollX} 
            width={width} 
            height={height}
            theme={theme}
            isDark={isDark}
          />
        )}
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        keyExtractor={(item) => item.id}
        snapToInterval={width}
        decelerationRate="fast"
      />

      <View style={styles.footer}>
        <Pagination scrollX={scrollX} width={width} />
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            onPress={() => router.replace('/(auth)/sign-in')} 
            style={styles.skipButton}
          >
            <Text style={[styles.skipText, { color: theme.textSecondary }]}>SKIP</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={handleNext} 
            style={styles.nextButton}
            activeOpacity={0.8}
          >
            <Ionicons 
              name={currentIndex === ONBOARDING_DATA.length - 1 ? "checkmark-sharp" : "arrow-forward-sharp"} 
              size={24} 
              color="#000" 
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  page: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  imageWrapper: {
    height: Platform.OS === 'web' ? '65%' : '75%',
    position: 'relative',
    width: '120%', 
    marginLeft: '-10%',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  contentContainer: {
    paddingHorizontal: 24,
    marginTop: -120, 
    flex: 1,
    zIndex: 10,
  },
  contentCardWrapper: {
    borderRadius: 36,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  contentCard: {
    backgroundColor: 'rgba(15, 15, 18, 0.6)', 
    padding: 32,
  },
  subtitleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  subtitle: {
    color: Colors.gold,
    fontSize: 11,
    fontFamily: FontFamily.display,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  subtitleLine: {
    height: 1,
    backgroundColor: Colors.gold,
    flex: 1,
    marginLeft: 12,
    opacity: 0.3,
  },
  title: {
    fontSize: 36,
    fontFamily: FontFamily.display,
    fontWeight: '700',
    lineHeight: 44,
    marginBottom: 18,
    letterSpacing: 0.5,
  },
  description: {
    fontSize: 16,
    lineHeight: 26,
    fontFamily: FontFamily.regular,
    letterSpacing: 0.2,
  },
  footer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 50 : 36,
    left: 24,
    right: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  paginationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    height: 6,
    borderRadius: 3,
    marginHorizontal: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  skipButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginRight: 8,
  },
  skipText: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  nextButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.gold,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
});
