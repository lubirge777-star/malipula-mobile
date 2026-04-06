import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, getThemeColors } from '../../../src/theme';
import { GlassView, StatusBadge } from '../../../src/components/ui';
import { useColorScheme } from 'react-native';

const TRACKING_STEPS = [
  { id: '1', title: 'Pattern Rendering', description: 'AI measurement analysis complete. Digital patterns generated.', status: 'completed', date: 'Oct 24, 10:30 AM' },
  { id: '2', title: 'Artisan Cutting', description: 'Master tailors are hand-cutting your Midnight Wool fabric.', status: 'completed', date: 'Oct 25, 02:15 PM' },
  { id: '3', title: 'First Stitch', description: 'Structural assembly and inner canvas reinforcement.', status: 'current', date: 'In Progress' },
  { id: '4', title: 'Quality Inspection', description: 'Detailed audit of silhouettes and hardware alignment.', status: 'pending', date: 'Expected Oct 28' },
  { id: '5', title: 'Bespoke Fitting', description: 'Ready for final adjustments and luxury packaging.', status: 'pending', date: 'Scheduled' },
];

export default function OrderTrackingScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = getThemeColors(colorScheme === 'dark' ? 'dark' : 'light');

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Order Tracker</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <GlassView className="p-6 rounded-[32px] border border-gold/10 mb-8">
            <View className="flex-row justify-between items-start mb-6">
                <View>
                    <Text className="text-app-text-secondary text-[10px] uppercase tracking-widest font-bold">Ref: #MAL-{id || '8862'}</Text>
                    <Text style={{ color: theme.text }} className="text-2xl font-display mt-1">Slim Fit Wool</Text>
                </View>
                <StatusBadge status="In Production" />
            </View>
            <View className="flex-row justify-between pt-4 border-t border-gold/10">
                <View>
                    <Text className="text-app-text-secondary text-[10px] uppercase font-bold">Est. Delivery</Text>
                    <Text style={{ color: theme.text }} className="font-bold mt-1">Nov 05 - Nov 10</Text>
                </View>
                <TouchableOpacity className="bg-gold px-4 py-2 rounded-full">
                    <Text className="text-white text-[10px] font-bold">Contact Stylist</Text>
                </TouchableOpacity>
            </View>
        </GlassView>

        <Text style={{ color: theme.text }} className="text-xl font-heading mb-8">Production Timeline</Text>

        {TRACKING_STEPS.map((step, index) => (
          <View key={step.id} style={styles.stepRow}>
            <View style={styles.leftColumn}>
              <View style={[
                  styles.node, 
                  step.status === 'completed' ? styles.nodeCompleted : step.status === 'current' ? styles.nodeCurrent : styles.nodePending
              ]}>
                {step.status === 'completed' && <Ionicons name="checkmark" size={12} color="#FFF" />}
                {step.status === 'current' && <View style={styles.nodeInner} />}
              </View>
              {index < TRACKING_STEPS.length - 1 && (
                <View style={[
                    styles.line, 
                    step.status === 'completed' ? styles.lineCompleted : styles.linePending
                ]} />
              )}
            </View>
            
            <View style={styles.rightColumn}>
              <View className="flex-row justify-between items-baseline mb-1">
                <Text style={{ color: step.status === 'pending' ? 'rgba(107, 99, 97, 0.5)' : theme.text }} className="text-base font-bold">
                    {step.title}
                </Text>
                <Text className="text-app-text-secondary text-[9px] font-medium">{step.date}</Text>
              </View>
              <Text style={{ color:'rgba(107, 99, 97, 0.7)' }} className="text-[12px] leading-5">
                {step.description}
              </Text>
              {step.status === 'current' && (
                <View className="mt-4 p-4 bg-gold/5 rounded-2xl border border-gold/10">
                    <Text className="text-gold text-[10px] font-bold uppercase tracking-widest mb-2">Live Progress</Text>
                    <View className="h-1 bg-gold/10 rounded-full overflow-hidden">
                        <View style={{ width: '65%' }} className="h-full bg-gold" />
                    </View>
                </View>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'PlayfairDisplay_700Bold',
  },
  scrollContent: {
    padding: 24,
  },
  stepRow: {
    flexDirection: 'row',
    marginBottom: 0,
  },
  leftColumn: {
    width: 30,
    alignItems: 'center',
  },
  node: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  nodeCompleted: {
    backgroundColor: '#C9A962',
  },
  nodeCurrent: {
    borderWidth: 2,
    borderColor: '#C9A962',
    backgroundColor: '#FAFAF5',
  },
  nodeInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#C9A962',
  },
  nodePending: {
    borderWidth: 2,
    borderColor: 'rgba(201, 169, 98, 0.2)',
    backgroundColor: 'transparent',
  },
  line: {
    width: 2,
    flex: 1,
    marginVertical: 4,
    zIndex: 1,
  },
  lineCompleted: {
    backgroundColor: '#C9A962',
  },
  linePending: {
    backgroundColor: 'rgba(201, 169, 98, 0.1)',
  },
  rightColumn: {
    flex: 1,
    marginLeft: 15,
    paddingBottom: 35,
  },
});
