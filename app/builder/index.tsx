import React, { Suspense, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Canvas } from '@react-three/fiber/native';
import { useGLTF, OrbitControls, PerspectiveCamera, Environment, Float, ContactShadows } from '@react-three/drei/native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Colors, getThemeColors } from '../../src/theme';
import { Button, GlassView } from '../../src/components/ui';

const SUIT_MODEL_URL = 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/SheenChair/glTF/SheenChair.gltf'; // Example high-quality fabric model

function SuitModel({ material, silhouette }: { material: string, silhouette: string }) {
  const { nodes, materials } = useGLTF(SUIT_MODEL_URL) as any;
  const isDark = useColorScheme() === 'dark';
  
  // Dynamic material mapping
  const activeColor = material === 'wool' ? '#1A2B44' : material === 'silk' ? '#C9A962' : '#FCFAF2';
  const roughness = material === 'silk' ? 0.3 : 0.7;

  return (
    <group scale={2.5} position={[0, -1, 0]}>
        <mesh 
            geometry={nodes.chair?.geometry || nodes.Object_2?.geometry} 
            material={materials.fabric || materials.Material_0}
        >
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

export default function BuilderScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = getThemeColors(colorScheme === 'dark' ? 'dark' : 'light');
  
  const [activeSilhouette, setActiveSilhouette] = useState('slim');
  const [activeMaterial, setActiveMaterial] = useState('wool');
  const [step, setStep] = useState(1);

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      router.push('/measure/scan');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* 3D Scene Viewport */}
      <View style={styles.canvasContainer}>
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} shadow-focus={0.5} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          
          <Suspense fallback={null}>
            <SuitModel material={activeMaterial} silhouette={activeSilhouette} />
            <Environment preset="city" />
            <ContactShadows position={[0, -1.6, 0]} opacity={0.6} scale={10} blur={2} far={4.5} />
          </Suspense>
          
          <OrbitControls enableZoom={false} autoRotate={step === 3} />
        </Canvas>

        {/* UI Overlays */}
        <TouchableOpacity 
          className="absolute top-12 left-6 p-3 bg-black/20 rounded-full"
          onPress={() => router.back()}
        >
          <Ionicons name="close" size={24} color="#FFF" />
        </TouchableOpacity>

        <View className="absolute top-12 right-6">
          <GlassView intensity={10} className="px-4 py-2 rounded-full border border-gold/20">
            <Text className="text-gold font-bold text-[10px] uppercase tracking-widest">Workshop 3D</Text>
          </GlassView>
        </View>

        <View className="absolute bottom-12 left-6 right-6">
            <Text className="text-white text-3xl font-display mb-1 text-center shadow-lg">Bespoke Workshop</Text>
            <View className="flex-row items-center justify-center gap-2">
                <View className="h-[1px] w-4 bg-gold" />
                <Text className="text-gold text-center font-medium uppercase text-[10px] tracking-widest">
                    {activeSilhouette} • {activeMaterial}
                </Text>
                <View className="h-[1px] w-4 bg-gold" />
            </View>
        </View>
      </View>

      {/* Control Panel */}
      <View style={[styles.controlPanel, { backgroundColor: theme.background }]}>
        <View className="flex-row items-center justify-between px-8 py-5 border-b border-gold/10">
          <View className="flex-row gap-8">
            {['Style', 'Fabric', 'Summary'].map((label, idx) => (
              <TouchableOpacity key={label} onPress={() => setStep(idx + 1)} className="items-center">
                <Text className={`text-[10px] font-bold uppercase tracking-widest ${step === idx + 1 ? 'text-gold' : 'text-app-text-secondary'}`}>
                    0{idx + 1} {label}
                </Text>
                {step === idx + 1 && <View className="h-1 w-4 bg-gold mt-1 rounded-full" />}
              </TouchableOpacity>
            ))}
          </View>
          <View className="flex-row items-baseline gap-1">
            <Text className="text-gold font-display text-sm">$</Text>
            <Text className="text-gold font-display text-lg">1,250</Text>
          </View>
        </View>

        <ScrollView className="flex-1 px-8 pt-8">
          {step === 1 && (
            <View>
              <Text className="text-navy dark:text-ivory font-heading text-xl mb-6">Select Silhouette</Text>
              {silhouettes.map((s) => (
                <TouchableOpacity 
                  key={s.id} 
                  onPress={() => {
                    setActiveSilhouette(s.id);
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                  }}
                  className={`p-5 rounded-[24px] mb-4 flex-row items-center justify-between border ${activeSilhouette === s.id ? 'bg-gold/5 border-gold shadow-sm' : 'bg-app-surface border-gold/10'}`}
                >
                  <View className="flex-1">
                    <Text className={`font-heading text-base ${activeSilhouette === s.id ? 'text-gold' : theme.text}`}>{s.name}</Text>
                    <Text className="text-[11px] text-app-text-secondary mt-1 leading-4">{s.description}</Text>
                  </View>
                  <View className={`w-6 h-6 rounded-full items-center justify-center border ${activeSilhouette === s.id ? 'bg-gold border-gold' : 'border-gray-300'}`}>
                    {activeSilhouette === s.id && <Ionicons name="checkmark" size={14} color="#FFF" />}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {step === 2 && (
            <View>
              <Text className="text-navy dark:text-ivory font-heading text-xl mb-6">Masterpiece Fabrics</Text>
              <View className="flex-row items-center gap-4 flex-wrap">
                {materials.map((m) => (
                  <TouchableOpacity 
                    key={m.id} 
                    onPress={() => {
                      setActiveMaterial(m.id);
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    }}
                    className={`w-[47%] items-center p-6 rounded-[32px] border ${activeMaterial === m.id ? 'bg-gold/5 border-gold' : 'bg-app-surface border-gold/10'}`}
                  >
                    <View style={{ backgroundColor: m.color }} className="w-14 h-14 rounded-full border border-black/10 mb-4 shadow-xl" />
                    <Text className={`text-[10px] font-bold text-center uppercase tracking-widest ${activeMaterial === m.id ? 'text-gold' : theme.text}`}>
                        {m.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {step === 3 && (
            <View className="items-center py-4">
                <View className="w-20 h-20 bg-gold/10 rounded-full items-center justify-center mb-6">
                    <Ionicons name="sparkles" size={32} color={Colors.gold} />
                </View>
                <Text className="text-navy dark:text-ivory font-display text-2xl text-center">Bespoke Masterpiece</Text>
                <Text className="text-app-text-secondary text-center mt-3 px-6 leading-5">
                    Your customized {activeSilhouette} {activeMaterial} suit is ready. Next: Precise AI body measurements.
                </Text>
                <View className="w-full h-[1px] bg-gold/10 my-8" />
                <View className="w-full gap-4">
                    <View className="flex-row justify-between">
                        <Text className="text-app-text-secondary font-medium">Craftsmanship</Text>
                        <Text className="text-navy dark:text-ivory font-bold">Premium Artisan</Text>
                    </View>
                    <View className="flex-row justify-between">
                        <Text className="text-app-text-secondary font-medium">Estimated Build</Text>
                        <Text className="text-navy dark:text-ivory font-bold">14-21 Days</Text>
                    </View>
                    <View className="flex-row justify-between">
                        <Text className="text-app-text-secondary font-medium">Shipping</Text>
                        <Text className="text-navy dark:text-ivory font-bold">Eco-Express</Text>
                    </View>
                </View>
            </View>
          )}
        </ScrollView>

        <View className="px-8 py-8">
          <Button 
            title={step < 3 ? "Next Step" : "Save & Start Measurement"} 
            variant="luxury" 
            onPress={handleNext}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  canvasContainer: {
    flex: 1.3,
    backgroundColor: '#0A0A0A',
    position: 'relative',
  },
  controlPanel: {
    flex: 1,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: -40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -15 },
    shadowOpacity: 0.15,
    shadowRadius: 25,
    elevation: 20,
  },
});
