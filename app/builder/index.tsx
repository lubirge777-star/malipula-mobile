import React, { Suspense, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Dimensions, useColorScheme } from 'react-native';
import { Canvas } from '@react-three/fiber/native';
import { useGLTF, OrbitControls, PerspectiveCamera, Environment, Float, ContactShadows } from '@react-three/drei/native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { Colors, FontFamily, getThemeColors } from '../../src/theme';
import { Button, GlassView } from '../../src/components/ui';
import { StatusBar } from 'expo-status-bar';

const SUIT_MODEL_URL = 'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/mannequin/model.gltf';

function SuitModel({ material, silhouette, lapel, vent }: { material: string, silhouette: string, lapel: string, vent: string }) {
  const activeColor = material === 'wool' ? '#1A2B44' : material === 'silk' ? '#C9A962' : '#FCFAF2';
  const roughness = material === 'silk' ? 0.2 : 0.8;

  // Since the original GLTF URL was broken (ERR_NAME_NOT_RESOLVED),
  // providing a stylized geometric fallback so the 3D builder still functions and looks premium.
  return (
    <group scale={1.5} position={[0, -2, 0]}>
        {/* Torso */}
        <mesh position={[0, 1.8, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.5, 0.4, 1.5, 32]} />
            <meshStandardMaterial 
                color={activeColor}
                roughness={roughness}
                metalness={material === 'silk' ? 0.2 : 0}
            />
        </mesh>
        {/* Shoulders */}
        <mesh position={[0, 2.5, 0]} castShadow receiveShadow>
            <boxGeometry args={[1.4, 0.4, 0.5]} />
            <meshStandardMaterial 
                color={activeColor}
                roughness={roughness}
                metalness={material === 'silk' ? 0.2 : 0}
            />
        </mesh>
        {/* Neck */}
        <mesh position={[0, 2.8, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.15, 0.18, 0.3, 32]} />
            <meshStandardMaterial 
                color={activeColor}
                roughness={roughness}
                metalness={material === 'silk' ? 0.2 : 0}
            />
        </mesh>
        <Float speed={2} rotationIntensity={0.5}>
            <pointLight position={[2, 2, 2]} intensity={2} color={activeColor} />
        </Float>
    </group>
  );
}

const silhouettes = [
  { id: 'slim', name: 'Slim Fit', description: 'Modern, tapered silhouette' },
  { id: 'tailored', name: 'Tailored', description: 'Balanced, timeless cut' },
  { id: 'classic', name: 'Classic', description: 'Relaxed, traditional fit' },
];

const materials = [
  { id: 'wool', name: 'Midnight Wool', color: '#1A2B44' },
  { id: 'silk', name: 'Gold Silk', color: '#C9A962' },
  { id: 'cotton', name: 'Ivory Cotton', color: '#FCFAF2' },
];

const lapels = [
  { id: 'notch', name: 'Notch Lapel', description: 'Versatile and classic' },
  { id: 'peak', name: 'Peak Lapel', description: 'Formal and powerful' },
  { id: 'shawl', name: 'Shawl Lapel', description: 'Elegant evening wear' },
];

const vents = [
  { id: 'single', name: 'Single Vent', description: 'Clean, American style' },
  { id: 'double', name: 'Double Vent', description: 'Sophisticated, European style' },
  { id: 'none', name: 'No Vent', description: 'Sleek, minimalist look' },
];

export default function BuilderScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const theme = getThemeColors(isDark ? 'dark' : 'light');
  
  const [activeSilhouette, setActiveSilhouette] = useState('slim');
  const [activeMaterial, setActiveMaterial] = useState('wool');
  const [activeLapel, setActiveLapel] = useState('notch');
  const [activeVent, setActiveVent] = useState('double');
  const [step, setStep] = useState(1);

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      router.push('/measure/scan');
    }
  };

  const steps = ['Silhouette', 'Fabric', 'Lapels', 'Vents', 'Summary'];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar style={isDark ? "light" : "dark"} />
      {/* 3D Scene Viewport */}
      <View style={[styles.canvasContainer, { backgroundColor: theme.background }]}>
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} shadow-focus={0.5} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          
          <Suspense fallback={null}>
            <SuitModel 
              material={activeMaterial} 
              silhouette={activeSilhouette} 
              lapel={activeLapel}
              vent={activeVent}
            />
            <Environment preset="city" />
            <ContactShadows position={[0, -1.6, 0]} opacity={0.6} scale={10} blur={2} far={4.5} />
          </Suspense>
          
          <OrbitControls 
            enableZoom={false} 
            autoRotate={step === 5} 
            maxPolarAngle={Math.PI / 1.5}
            minPolarAngle={Math.PI / 3}
          />
        </Canvas>

        {/* UI Overlays */}
        <TouchableOpacity 
          className="absolute top-12 left-6 w-10 h-10 items-center justify-center rounded-full border"
          style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)', borderColor: theme.border }}
          onPress={() => router.back()}
        >
          <Ionicons name="close" size={20} color={theme.text} />
        </TouchableOpacity>

        <View className="absolute top-12 right-6">
          <GlassView intensity={isDark ? 20 : 60} className="px-4 py-2 rounded-full border border-white/20" style={{ borderColor: theme.border }}>
            <Text className="text-gold font-bold text-[10px] uppercase tracking-widest">Workshop 3D</Text>
          </GlassView>
        </View>

        <View className="absolute bottom-12 left-6 right-6">
            <Text style={{ fontFamily: FontFamily.display, color: theme.text }} className="text-3xl mb-1 text-center shadow-lg">Bespoke Workshop</Text>
            <View className="flex-row items-center justify-center gap-2">
                <View className="h-[1px] w-4 bg-gold" />
                <Text className="text-gold text-center font-bold uppercase text-[10px] tracking-widest">
                    {steps[step-1]} Step
                </Text>
                <View className="h-[1px] w-4 bg-gold" />
            </View>
        </View>
      </View>

      {/* Control Panel */}
      <GlassView intensity={isDark ? 30 : 60} style={[styles.controlPanel, { borderColor: theme.border }]}>
        <View className="flex-row items-center justify-between px-8 py-5 border-b" style={{ borderBottomColor: theme.border }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
            <View className="flex-row gap-8 pr-8">
              {steps.map((label, idx) => (
                <TouchableOpacity key={label} onPress={() => setStep(idx + 1)} className="items-center">
                  <Text className={`text-[10px] font-bold uppercase tracking-widest ${step === idx + 1 ? 'text-gold' : ''}`} style={{ color: step === idx + 1 ? Colors.gold : theme.textSecondary }}>
                      0{idx + 1} {label}
                  </Text>
                  {step === idx + 1 && <View className="h-1 w-4 bg-gold mt-1 rounded-full" />}
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
          <View className="flex-row items-baseline gap-1 px-2 py-1 rounded-md">
            <Text style={{ fontFamily: FontFamily.display, color: theme.text }} className="text-sm">$</Text>
            <Text style={{ fontFamily: FontFamily.display, color: theme.text }} className="text-lg">1,250</Text>
          </View>
        </View>

        <ScrollView className="flex-1 px-6 pt-8 pb-32">
          {step === 1 && (
            <View>
              <Text style={{ fontFamily: FontFamily.display, color: theme.text }} className="text-xl mb-6">Select Silhouette</Text>
              {silhouettes.map((s) => (
                <TouchableOpacity 
                  key={s.id} 
                  onPress={() => {
                    setActiveSilhouette(s.id);
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                  }}
                  className={`p-5 rounded-[24px] mb-4 flex-row items-center justify-between border`}
                  style={{ backgroundColor: activeSilhouette === s.id ? (isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)') : theme.surface, borderColor: activeSilhouette === s.id ? Colors.gold : theme.border }}
                >
                  <View className="flex-1">
                    <Text style={{ fontFamily: FontFamily.display, color: activeSilhouette === s.id ? Colors.gold : theme.text }} className="text-base">{s.name}</Text>
                    <Text style={{ fontFamily: FontFamily.regular, color: theme.textSecondary }} className="text-[11px] mt-1 leading-4">{s.description}</Text>
                  </View>
                  <View className={`w-6 h-6 rounded-full items-center justify-center border`} style={{ backgroundColor: activeSilhouette === s.id ? Colors.gold : 'transparent', borderColor: activeSilhouette === s.id ? Colors.gold : theme.border }}>
                    {activeSilhouette === s.id && <Ionicons name="checkmark" size={14} color="#000" />}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {step === 2 && (
            <View>
              <Text style={{ fontFamily: FontFamily.display, color: theme.text }} className="text-xl mb-6">Masterpiece Fabrics</Text>
              <View className="flex-row items-center gap-4 flex-wrap justify-between">
                {materials.map((m) => (
                  <TouchableOpacity 
                    key={m.id} 
                    onPress={() => {
                      setActiveMaterial(m.id);
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    }}
                    className={`w-[48%] items-center p-6 rounded-[32px] border`}
                    style={{ backgroundColor: activeMaterial === m.id ? (isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)') : theme.surface, borderColor: activeMaterial === m.id ? Colors.gold : theme.border }}
                  >
                    <View style={{ backgroundColor: m.color, borderColor: theme.border }} className="w-14 h-14 rounded-full border mb-4 shadow-xl" />
                    <Text className={`text-[10px] font-bold text-center uppercase tracking-widest`} style={{ color: activeMaterial === m.id ? Colors.gold : theme.text }}>
                        {m.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {step === 3 && (
            <View>
              <Text style={{ fontFamily: FontFamily.display, color: theme.text }} className="text-xl mb-6">Lapel Style</Text>
              {lapels.map((l) => (
                <TouchableOpacity 
                  key={l.id} 
                  onPress={() => {
                    setActiveLapel(l.id);
                    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                  }}
                  className={`p-5 rounded-[24px] mb-4 flex-row items-center justify-between border`}
                  style={{ backgroundColor: activeLapel === l.id ? (isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)') : theme.surface, borderColor: activeLapel === l.id ? Colors.gold : theme.border }}
                >
                  <View className="flex-x">
                    <Text style={{ fontFamily: FontFamily.display, color: activeLapel === l.id ? Colors.gold : theme.text }} className="text-base">{l.name}</Text>
                    <Text style={{ fontFamily: FontFamily.regular, color: theme.textSecondary }} className="text-[11px] mt-1 leading-4">{l.description}</Text>
                  </View>
                  <View className={`w-6 h-6 rounded-full items-center justify-center border`} style={{ backgroundColor: activeLapel === l.id ? Colors.gold : 'transparent', borderColor: activeLapel === l.id ? Colors.gold : theme.border }}>
                    {activeLapel === l.id && <Ionicons name="checkmark" size={14} color="#000" />}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {step === 4 && (
            <View>
              <Text style={{ fontFamily: FontFamily.display, color: theme.text }} className="text-xl mb-6">Vent Configuration</Text>
              {vents.map((v) => (
                <TouchableOpacity 
                  key={v.id} 
                  onPress={() => {
                    setActiveVent(v.id);
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  }}
                  className={`p-5 rounded-[24px] mb-4 flex-row items-center justify-between border`}
                  style={{ backgroundColor: activeVent === v.id ? (isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)') : theme.surface, borderColor: activeVent === v.id ? Colors.gold : theme.border }}
                >
                  <View className="flex-1">
                    <Text style={{ fontFamily: FontFamily.display, color: activeVent === v.id ? Colors.gold : theme.text }} className="text-base">{v.name}</Text>
                    <Text style={{ fontFamily: FontFamily.regular, color: theme.textSecondary }} className="text-[11px] mt-1 leading-4">{v.description}</Text>
                  </View>
                  <View className={`w-6 h-6 rounded-full items-center justify-center border`} style={{ backgroundColor: activeVent === v.id ? Colors.gold : 'transparent', borderColor: activeVent === v.id ? Colors.gold : theme.border }}>
                    {activeVent === v.id && <Ionicons name="checkmark" size={14} color="#000" />}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {step === 5 && (
            <View className="items-center py-4">
                <View className="w-20 h-20 bg-gold/10 rounded-full items-center justify-center mb-6">
                    <Ionicons name="sparkles" size={32} color={Colors.gold} />
                </View>
                <Text style={{ fontFamily: FontFamily.display, color: theme.text }} className="text-2xl text-center">Bespoke Masterpiece</Text>
                <Text style={{ fontFamily: FontFamily.regular, color: theme.textSecondary }} className="text-center mt-3 px-6 leading-5">
                    Your {activeSilhouette} suit in {activeMaterial} with {activeLapel}s and {activeVent} vents is finalized.
                </Text>
                <View className="w-full h-[1px] my-8" style={{ backgroundColor: theme.border }} />
                <View className="w-full gap-4">
                    <View className="flex-row justify-between">
                        <Text style={{ fontFamily: FontFamily.regular, color: theme.textSecondary }} className="font-medium">Style Code</Text>
                        <Text style={{ fontFamily: FontFamily.regular, color: theme.text }} className="font-bold uppercase">{activeSilhouette.slice(0,2)}-{activeLapel.slice(0,2)}-{activeVent.slice(0,2)}</Text>
                    </View>
                    <View className="flex-row justify-between">
                        <Text style={{ fontFamily: FontFamily.regular, color: theme.textSecondary }} className="font-medium">Estimated Build</Text>
                        <Text style={{ fontFamily: FontFamily.regular, color: theme.text }} className="font-bold">14-21 Days</Text>
                    </View>
                </View>
            </View>
          )}
        </ScrollView>

        <View className="absolute bottom-0 left-0 right-0 px-8 py-8" style={{ backgroundColor: isDark ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.8)' }}>
          <Button 
            title={step < 5 ? "Next Step" : "Save & Start Measurement"} 
            variant="luxury" 
            onPress={handleNext}
          />
        </View>
      </GlassView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  canvasContainer: {
    flex: 1.3,
    backgroundColor: '#000',
    position: 'relative',
  },
  controlPanel: {
    flex: 1,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: -40,
    overflow: 'hidden',
    borderColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
  },
});
