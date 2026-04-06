import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'react-native';
import { Colors, getThemeColors } from '../../src/theme';
import { GlassView } from '../../src/components/ui';

const messages = [
  { id: 1, sender: 'stylist', text: 'Good morning! I see you selected the Midnight Wool for your bespoke suit. Exquisite choice.', time: '09:41' },
  { id: 2, sender: 'user', text: 'Thank you! I was wondering if it works well for evening events?', time: '09:43' },
  { id: 3, sender: 'stylist', text: 'Absolutely. The midnight hue has a subtle sheen that comes alive under gala lighting. Would you like to see a lapel detail?', time: '09:44' },
];

export default function ChatScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = getThemeColors(colorScheme === 'dark' ? 'dark' : 'light');

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View className="pt-16 px-6 pb-6 flex-row items-center justify-between border-b" style={{ borderColor: theme.border }}>
        <View className="flex-row items-center gap-3">
            <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
                <Ionicons name="arrow-back" size={24} color={theme.text} />
            </TouchableOpacity>
            <View className="relative">
                <View className="w-10 h-10 rounded-full items-center justify-center" style={{ backgroundColor: 'rgba(201,169,98,0.2)' }}>
                    <Ionicons name="person" size={20} color={Colors.gold} />
                </View>
                <View className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2" style={{ borderColor: theme.background }} />
            </View>
            <View>
                <Text className="font-heading text-lg" style={{ color: theme.text }}>Master Stylist</Text>
                <Text className="text-[10px] text-green-500 font-bold uppercase tracking-widest">Active Now</Text>
            </View>
        </View>
        <TouchableOpacity className="p-2">
            <Ionicons name="call-outline" size={20} color={theme.text} />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 p-6" contentContainerStyle={{ paddingBottom: 40 }}>
        <View className="items-center mb-8">
            <GlassView intensity={5} className="px-4 py-2 rounded-full border border-gold/10 bg-gold/5">
                <Text className="text-gray-400 text-[10px] uppercase tracking-widest">Today</Text>
            </GlassView>
        </View>

        {messages.map((msg) => (
            <View 
                key={msg.id} 
                className={`mb-6 max-w-[80%] ${msg.sender === 'user' ? 'self-end items-end' : 'self-start items-start'}`}
            >
                <View 
                    className={`p-4 rounded-[24px] border`}
                    style={{ backgroundColor: msg.sender === 'user' ? Colors.gold : theme.surface, borderColor: msg.sender === 'user' ? 'transparent' : theme.border }}
                >
                    <Text className="text-sm leading-5" style={{ color: msg.sender === 'user' ? '#FFFFFF' : theme.text }}>
                        {msg.text}
                    </Text>
                </View>
                <Text className="text-[9px] mt-1 px-2" style={{ color: theme.textSecondary }}>{msg.time}</Text>
            </View>
        ))}
      </ScrollView>

      {/* Input */}
      <View className="p-6 pb-12 border-t" style={{ backgroundColor: theme.background, borderColor: theme.border }}>
        <GlassView intensity={10} className="flex-row items-center p-2 pl-6 rounded-full border border-gold/20" style={{ backgroundColor: 'rgba(201,169,98,0.05)' }}>
            <TextInput 
                className="flex-1 h-12 text-sm"
                style={{ color: theme.text }}
                placeholder="Talk to your stylist..."
                placeholderTextColor={theme.textSecondary}
            />
            <TouchableOpacity className="w-10 h-10 rounded-full items-center justify-center ml-2" style={{ backgroundColor: Colors.gold }}>
                <Ionicons name="send" size={16} color="#FFF" />
            </TouchableOpacity>
        </GlassView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
