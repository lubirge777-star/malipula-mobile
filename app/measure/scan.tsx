import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Platform, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors, Fonts, getThemeColors } from '../../src/theme';
import { Button } from '../../src/components/ui/Button';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';

// Note: expo-camera would be used here in a real device environment
import * as Haptics from 'expo-haptics';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function MeasurementScanScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const theme = getThemeColors(isDark ? 'dark' : 'light');
  
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(1); // 1: Front, 2: Profile, 3: Success
  const [scanProgress, setScanProgress] = useState(0);

  useEffect(() => {
    let interval: any;
    if (isScanning && scanProgress < 100) {
      interval = setInterval(() => {
        setScanProgress(prev => {
          const next = prev + 2;
          if (next % 20 === 0) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }
          return next;
        });
      }, 50);
    } else if (scanProgress >= 100) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      if (scanStep < 2) {
        setScanStep(2);
        setIsScanning(false);
        setScanProgress(0);
      } else {
        setScanStep(3);
        setIsScanning(false);
      }
    }
    return () => clearInterval(interval);
  }, [isScanning, scanProgress, scanStep]);

  const startScan = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsScanning(true);
    setScanProgress(0);
  };

  const renderGuideOverlay = () => {
    if (scanStep === 3) return null;

    return (
      <View style={styles.overlay} pointerEvents="none">
        <View style={styles.guideFrame}>
             <View style={[styles.bodyFrame, { borderColor: isScanning ? Colors.gold : 'rgba(255,255,255,0.3)' }]}>
                <View style={styles.headFrame} />
                <View style={styles.torsoFrame} />
                <View style={styles.armsRow}>
                    <View style={styles.armFrame} />
                    <View style={styles.armFrame} />
                </View>
             </View>
        </View>
        
        {isScanning && (
          <View style={[styles.scanLine, { top: `${scanProgress}%` }]} />
        )}
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* simulated Camera Viewport */}
      <View style={styles.cameraPlaceholder}>
        <View style={styles.cameraCenter}>
            <Ionicons name="camera-outline" size={64} color="rgba(255,255,255,0.1)" />
            <Text style={styles.cameraText}>AI Vision Engine Active</Text>
        </View>
        
        {renderGuideOverlay()}

        {/* Top Controls */}
        <Animated.View entering={FadeInDown.delay(100)} style={styles.topControls}>
          <TouchableOpacity onPress={() => router.back()} style={[styles.navButton, { backgroundColor: isDark ? 'rgba(20, 20, 22, 0.8)' : 'rgba(255, 255, 255, 0.8)', borderColor: theme.border }]} activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={24} color={theme.text} />
          </TouchableOpacity>
          <View style={[styles.badgeContainer, { backgroundColor: isDark ? 'rgba(20, 20, 22, 0.8)' : 'rgba(255, 255, 255, 0.8)' }]}>
            <Text style={styles.badgeText}>
              SCAN: {scanStep === 1 ? 'FRONT POSE' : scanStep === 2 ? 'PROFILE POSE' : 'COMPLETED'}
            </Text>
          </View>
          <TouchableOpacity style={[styles.navButton, { backgroundColor: isDark ? 'rgba(20, 20, 22, 0.8)' : 'rgba(255, 255, 255, 0.8)', borderColor: theme.border }]} activeOpacity={0.7}>
            <Ionicons name="flash-off" size={24} color={theme.text} />
          </TouchableOpacity>
        </Animated.View>

        {/* Scan Status Display */}
        {isScanning && (
            <View style={styles.scanningStatus}>
                <Text style={styles.scanningPercent}>{scanProgress}%</Text>
                <Text style={styles.scanningSubtitle}>SURFACE MAPPING...</Text>
            </View>
        )}
      </View>

      {/* Bottom Controls / Glass Card */}
      <Animated.View entering={FadeInUp.duration(800).delay(200)} style={[styles.bottomPanel, { backgroundColor: isDark ? 'rgba(20, 20, 22, 0.85)' : 'rgba(255,255,255,0.85)', borderColor: theme.border }]}>
        {scanStep < 3 ? (
            <View style={styles.panelContent}>
                <Text style={[styles.panelTitle, { color: theme.text }]}>
                    {scanStep === 1 ? 'Step 1: Frontal View' : 'Step 2: Side Profile'}
                </Text>
                <Text style={[styles.panelDescription, { color: theme.textSecondary }]}>
                    {scanStep === 1 
                        ? 'Position your feet together and arms at a 45° angle from your body.' 
                        : 'Turn 90° to your right, keeping your posture straight and natural.'}
                </Text>
                
                <View style={styles.captureContainer}>
                    <TouchableOpacity 
                        onPress={startScan}
                        disabled={isScanning}
                        style={[styles.captureBtn, { opacity: isScanning ? 0.5 : 1 }]}
                    >
                        <View style={styles.captureBtnInner}>
                            <Ionicons name="scan" size={32} color="#000" />
                        </View>
                        <View style={styles.captureBtnRing} />
                    </TouchableOpacity>
                </View>
            </View>
        ) : (
            <View style={styles.panelContentCompleted}>
                <View style={[styles.successIconContainer, { backgroundColor: isDark ? 'rgba(16, 185, 129, 0.1)' : 'rgba(16, 185, 129, 0.15)' }]}>
                    <Ionicons name="checkmark" size={36} color="#10B981" />
                </View>
                <Text style={[styles.panelTitle, { color: theme.text }]}>Metrics Captured</Text>
                <Text style={[styles.panelDescription, { color: theme.textSecondary }]}>
                    Our AI has successfully calculated 28 detailed body metrics. You can now save your profile.
                </Text>
                
                <View style={styles.actionButtons}>
                    <Button 
                        title="REVIEW MEASUREMENTS" 
                        variant="primary" 
                        onPress={() => router.push('/measure/profiles')} 
                        fullWidth
                    />
                    <View style={{ height: 12 }} />
                    <Button 
                        title="BACK TO HUB" 
                        variant="outline" 
                        onPress={() => router.replace('/measure')} 
                        fullWidth
                    />
                </View>
            </View>
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraPlaceholder: {
    flex: 1,
    backgroundColor: '#050505',
    position: 'relative',
  },
  cameraCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraText: {
    color: 'rgba(255,255,255,0.4)',
    fontFamily: Fonts.interMedium,
    fontSize: 16,
    marginTop: 16,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  guideFrame: {
    width: SCREEN_WIDTH * 0.6,
    height: SCREEN_HEIGHT * 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -80,
  },
  bodyFrame: {
    width: '100%',
    height: '100%',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 40,
    alignItems: 'center',
    paddingTop: 40,
  },
  headFrame: {
    width: 60,
    height: 70,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
    marginBottom: 10,
  },
  torsoFrame: {
    width: 100,
    height: 150,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  armsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '140%',
    position: 'absolute',
    top: 150,
  },
  armFrame: {
    width: 24,
    height: 120,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  scanLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: Colors.gold,
    shadowColor: Colors.gold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    zIndex: 10,
  },
  topControls: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  badgeContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(201, 169, 98, 0.3)',
  },
  badgeText: {
    fontFamily: Fonts.interBold,
    fontSize: 10,
    color: Colors.gold,
    letterSpacing: 2,
  },
  scanningStatus: {
    position: 'absolute',
    top: '30%',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  scanningPercent: {
    fontFamily: Fonts.playfairBold,
    fontSize: 56,
    color: Colors.gold,
    textShadowColor: 'rgba(201, 169, 98, 0.5)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 15,
  },
  scanningSubtitle: {
    fontFamily: Fonts.interBold,
    fontSize: 10,
    letterSpacing: 4,
    color: '#FFF',
    marginTop: 8,
  },
  bottomPanel: {
    position: 'absolute',
    bottom: 32,
    left: 24,
    right: 24,
    borderRadius: 36,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.5,
    shadowRadius: 24,
    elevation: 8,
    ...Platform.select({
      web: { backdropFilter: 'blur(16px)' }
    })
  },
  panelContent: {
    padding: 32,
    alignItems: 'center',
  },
  panelTitle: {
    fontFamily: Fonts.playfairBold,
    fontSize: 24,
    textAlign: 'center',
  },
  panelDescription: {
    fontFamily: Fonts.interRegular,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 32,
    lineHeight: 22,
  },
  captureContainer: {
    alignItems: 'center',
  },
  captureBtn: {
    position: 'relative',
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureBtnInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  captureBtnRing: {
    position: 'absolute',
    top: -12,
    left: -12,
    right: -12,
    bottom: -12,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.gold,
    opacity: 0.4,
  },
  panelContentCompleted: {
    padding: 32,
    alignItems: 'center',
  },
  successIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  actionButtons: {
    width: '100%',
    marginTop: 8,
  }
});

