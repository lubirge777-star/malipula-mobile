import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'react-native';
import { Colors, getThemeColors } from '../../src/theme';
import { Button, GlassView } from '../../src/components/ui';
// Note: expo-camera would be used here in a real device environment
// import { CameraView, useCameraPermissions } from 'expo-camera';

import * as Haptics from 'expo-haptics';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function MeasurementScanScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = getThemeColors(colorScheme === 'dark' ? 'dark' : 'light');
  
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(1); // 1: Front, 2: Profile, 3: Success
  const [scanProgress, setScanProgress] = useState(0);

  useEffect(() => {
    let interval: any;
    if (isScanning && scanProgress < 100) {
      interval = setInterval(() => {
        setScanProgress(prev => {
          const next = prev + 2;
          // Trigger a very light tick every 20%
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
        {/* Human Silhouette Guide Frame */}
        <View style={styles.guideFrame}>
             {/* Simple SVG/View representation of a body frame */}
             <View style={[styles.bodyFrame, { borderColor: isScanning ? Colors.gold : 'rgba(255,255,255,0.3)' }]}>
                <View style={styles.headFrame} />
                <View style={styles.torsoFrame} />
                <View className="flex-row justify-between w-full h-1/2">
                    <View style={styles.armFrame} />
                    <View style={styles.armFrame} />
                </View>
             </View>
        </View>
        
        {/* Scanning Beam */}
        {isScanning && (
          <View 
            style={[styles.scanLine, { top: `${scanProgress}%` }]} 
          />
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* simulated Camera Viewport */}
      <View style={[styles.cameraPlaceholder, { backgroundColor: '#1A1A1A' }]}>
        <View className="items-center justify-center h-full">
            <Ionicons name="camera-outline" size={64} color="rgba(255,255,255,0.1)" />
            <Text className="text-gray-600 mt-4 font-heading text-lg">AI Vision Engine Active</Text>
        </View>
        
        {renderGuideOverlay()}

        {/* Top Controls */}
        <View className="absolute top-12 left-6 right-6 flex-row justify-between items-center">
          <TouchableOpacity 
            onPress={() => router.back()}
            className="p-3 bg-black/40 rounded-full"
          >
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <GlassView intensity={15} className="px-5 py-2 rounded-full border border-gold/30">
            <Text className="text-gold font-bold text-[10px] uppercase tracking-widest">
              Scan: {scanStep === 1 ? 'Front Pose' : scanStep === 2 ? 'Profile Pose' : 'Completed'}
            </Text>
          </GlassView>
          <TouchableOpacity className="p-3 bg-black/40 rounded-full">
            <Ionicons name="flash-off" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* Scan Status */}
        {isScanning && (
            <View className="absolute top-1/4 left-0 right-0 items-center">
                <Text className="text-gold font-display text-4xl shadow-lg">{scanProgress}%</Text>
                <Text className="text-white text-[10px] uppercase tracking-[4px] mt-2">Surface Mapping...</Text>
            </View>
        )}
      </View>

      {/* Bottom Controls */}
      <View style={[styles.bottomPanel, { backgroundColor: theme.background }]}>
        {scanStep < 3 ? (
            <View className="p-8">
                <Text className="text-navy dark:text-ivory font-heading text-xl text-center mb-2">
                    {scanStep === 1 ? 'Step 1: Frontal View' : 'Step 2: Side Profile'}
                </Text>
                <Text className="text-app-text-secondary text-center text-xs px-6 mb-8">
                    {scanStep === 1 
                        ? 'Position your feet together and arms at a 45° angle from your body.' 
                        : 'Turn 90° to your right, keeping your posture straight and natural.'}
                </Text>
                
                <View className="items-center mb-8">
                    <TouchableOpacity 
                        onPress={startScan}
                        disabled={isScanning}
                        style={[styles.captureBtn, { opacity: isScanning ? 0.5 : 1 }]}
                    >
                        <View className="w-16 h-16 rounded-full bg-gold items-center justify-center">
                            <Ionicons name="scan" size={32} color="#FFF" />
                        </View>
                        <View style={styles.captureBtnRing} />
                    </TouchableOpacity>
                </View>
            </View>
        ) : (
            <View className="p-8 items-center">
                <View className="w-16 h-16 bg-green-500/10 rounded-full items-center justify-center mb-4">
                    <Ionicons name="checkmark-circle" size={40} color="#22C55E" />
                </View>
                <Text className="text-navy dark:text-ivory font-heading text-2xl text-center mb-2">Metrics Captured</Text>
                <Text className="text-app-text-secondary text-center text-sm px-6 mb-8">
                    Our AI has calculated 28 body metrics. You can now proceed to review your fit or save the profile.
                </Text>
                
                <View className="w-full gap-3">
                    <Button 
                        title="Review My Measurements" 
                        variant="luxury" 
                        onPress={() => router.push('/measure/profiles')} 
                    />
                    <Button 
                        title="Back to Dashboard" 
                        variant="outline" 
                        onPress={() => router.push('/')} 
                    />
                </View>
            </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraPlaceholder: {
    flex: 1,
    position: 'relative',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  guideFrame: {
    width: SCREEN_WIDTH * 0.6,
    height: SCREEN_HEIGHT * 0.5,
    alignItems: 'center',
    justifyContent: 'center',
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
    borderColor: 'rgba(255,255,255,0.5)',
    marginBottom: 10,
  },
  torsoFrame: {
    width: 100,
    height: 150,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  armFrame: {
    width: 20,
    height: 120,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    marginTop: -20,
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
  bottomPanel: {
    height: 340,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: -40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 20,
  },
  captureBtn: {
    position: 'relative',
  },
  captureBtnRing: {
    position: 'absolute',
    top: -10,
    left: -10,
    right: -10,
    bottom: -10,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: Colors.gold,
    opacity: 0.3,
  },
});
