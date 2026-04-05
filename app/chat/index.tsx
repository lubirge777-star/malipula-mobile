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
      <View className="pt-16 px-6 pb-6 flex-row items-center justify-between border-b border-gold/10">
        <View className="flex-row items-center gap-3">
            <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
                <Ionicons name="arrow-back" size={24} color={theme.text} />
            </TouchableOpacity>
            <View className="relative">
                <View className="w-10 h-10 bg-gold/20 rounded-full items-center justify-center">
                    <Ionicons name="person" size={20} color={Colors.gold} />
                </View>
                <View className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-navy" />
            </View>
            <View>
                <Text className="font-heading text-lg text-navy dark:text-ivory">Master Stylist</Text>
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
                    className={`p-4 rounded-[24px] ${msg.sender === 'user' ? 'bg-gold' : 'bg-app-surface border border-gold/10'}`}
                >
                    <Text className={`text-sm leading-5 ${msg.sender === 'user' ? 'text-white' : 'text-navy dark:text-ivory'}`}>
                        {msg.text}
                    </Text>
                </View>
                <Text className="text-[9px] text-gray-400 mt-1 px-2">{msg.time}</Text>
            </View>
        ))}
      </ScrollView>

      {/* Input */}
      <View className="p-6 pb-12 border-t border-gold/10 bg-app-background">
        <GlassView intensity={10} className="flex-row items-center p-2 pl-6 rounded-full border border-gold/20 bg-app-surface/50">
            <TextInput 
                className="flex-1 h-12 text-navy dark:text-ivory text-sm"
                placeholder="Talk to your stylist..."
                placeholderTextColor={theme.textSecondary}
            />
            <TouchableOpacity className="w-10 h-10 bg-gold rounded-full items-center justify-center ml-2">
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
