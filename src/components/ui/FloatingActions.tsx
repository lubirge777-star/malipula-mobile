import React from 'react';
import { View, Text, TouchableOpacity, Linking, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '../../theme';
import { GlassView } from './GlassView';

export function FloatingActions() {
  const router = useRouter();

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
      {/* Main Chat Navigation Button */}
      <View className="absolute bottom-28 right-6">
        <TouchableOpacity 
          onPress={() => router.push('/chat/conversations')}
          className="w-14 h-14 bg-gold rounded-full items-center justify-center shadow-2xl ring-4 ring-gold/10"
          activeOpacity={0.9}
        >
          <Ionicons name="chatbubbles" size={26} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Styles removed as they are no longer needed for the simplified layout
});
