import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, getThemeColors } from '../../src/theme';
import { GlassView, Badge } from '../../src/components/ui';

const CONVERSATIONS = [
  {
    id: '1',
    name: 'Master Tailor Elias',
    lastMessage: 'Your pattern rendering is complete and ready for cutting.',
    time: '2m ago',
    unread: 2,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
    role: 'Head Stylist',
  },
  {
    id: '2',
    name: 'Sarah (Logistics)',
    lastMessage: 'Shipping address for your Midnight Wool suit verified.',
    time: '1h ago',
    unread: 0,
    avatar: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=200&auto=format&fit=crop',
    role: 'Client Success',
  },
  {
    id: '3',
    name: 'Artisan Workshop',
    lastMessage: 'Step 4: Horn buttons selected for your tailored fit.',
    time: '3h ago',
    unread: 0,
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop',
    role: 'Workshop',
  },
];

export default function ConversationsScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = getThemeColors(colorScheme === 'dark' ? 'dark' : 'light');

  const renderItem = ({ item }: { item: typeof CONVERSATIONS[0] }) => (
    <TouchableOpacity 
      onPress={() => router.push('/chat')}
      style={[styles.item, { borderBottomColor: theme.border }]}
    >
      <View style={styles.avatarContainer}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <View style={[styles.statusDot, { borderColor: theme.background }]} />
      </View>
      
      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={[styles.name, { color: theme.text }]}>{item.name}</Text>
          <Text style={[styles.time, { color: theme.textSecondary }]}>{item.time}</Text>
        </View>
        <Text style={styles.role}>{item.role}</Text>
        <Text numberOfLines={1} style={[styles.lastMessage, { color: theme.textSecondary }]}>{item.lastMessage}</Text>
      </View>
      
      {item.unread > 0 && (
        <View style={styles.unreadBadge}>
          <Text style={styles.unreadText}>{item.unread}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <View>
          <Text style={[styles.headerTitle, { color: theme.text }]}>Messages</Text>
          <Text className="text-gold text-[9px] font-bold uppercase tracking-widest text-center mt-1">Concierge Service</Text>
        </View>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="search" size={20} color={theme.text} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={CONVERSATIONS}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View className="mb-8 mt-4">
             <GlassView className="p-4 rounded-[28px] border" style={{ borderColor: 'rgba(201,169,98,0.1)', backgroundColor: 'rgba(201,169,98,0.05)' }}>
                <View className="flex-row items-center gap-4">
                    <View className="w-10 h-10 rounded-full items-center justify-center" style={{ backgroundColor: Colors.gold }}>
                        <Ionicons name="sparkles" size={20} color="#FFF" />
                    </View>
                    <View>
                        <Text style={{ color: theme.text }} className="font-bold">AI Bespoke Assistant</Text>
                        <Text className="text-[11px]" style={{ color: theme.textSecondary }}>Ready for a real-time consultation</Text>
                    </View>
                </View>
             </GlassView>
          </View>
        }
      />
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
    fontSize: 22,
    fontFamily: 'PlayfairDisplay_700Bold',
  },
  list: { padding: 24 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
  },
  avatarContainer: { position: 'relative' },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: 'rgba(201, 169, 98, 0.1)',
  },
  statusDot: {
    position: 'absolute',
    bottom: 0,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4ade80',
    borderWidth: 2,
  },
  content: {
    flex: 1,
    marginLeft: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontFamily: 'PlayfairDisplay_700Bold',
  },
  role: {
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#C9A962',
    fontWeight: '700',
    marginTop: 2,
  },
  time: {
    fontSize: 11,
    fontWeight: '500',
  },
  lastMessage: {
    fontSize: 13,
    marginTop: 5,
    fontFamily: 'Inter',
  },
  unreadBadge: {
    backgroundColor: '#C9A962',
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  unreadText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '800',
  },
});
