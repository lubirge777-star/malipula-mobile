import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
  useColorScheme,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors, FontFamily, getThemeColors } from '../../../src/theme';
import { GlassView } from '../../../src/components/ui';

const upcomingAppointments = [
  {
    id: '1',
    type: 'In-Store Fitting',
    date: 'Mon, 15 Jan 2025',
    time: '10:00 AM',
    stylist: 'James Mwangi',
    stylistImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    status: 'confirmed' as const,
    location: 'Malipula Boutique, Kijitonyama',
  },
  {
    id: '2',
    type: 'Style Consultation',
    date: 'Wed, 20 Jan 2025',
    time: '2:00 PM',
    stylist: 'Fatma Hassan',
    stylistImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    status: 'pending' as const,
    location: 'Virtual (Zoom)',
  },
];

const pastAppointments = [
  {
    id: '3',
    type: 'Measurement Session',
    date: 'Fri, 5 Jan 2025',
    time: '11:00 AM',
    stylist: 'James Mwangi',
    stylistImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    status: 'completed' as const,
    location: 'Malipula Boutique, Kijitonyama',
  },
  {
    id: '4',
    type: 'Suit Fitting',
    date: 'Tue, 28 Dec 2024',
    time: '3:00 PM',
    stylist: 'Ahmed Mohamed',
    stylistImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    status: 'completed' as const,
    location: 'Malipula Boutique, Msasani',
  },
];

const statusConfig: Record<string, { color: string; bg: string; label: string }> = {
  confirmed: { color: Colors.gold, bg: 'rgba(201, 169, 98, 0.15)', label: 'Confirmed' },
  pending: { color: '#EAB308', bg: 'rgba(234, 179, 8, 0.15)', label: 'Pending' },
  completed: { color: '#9CA3AF', bg: 'rgba(156, 163, 175, 0.15)', label: 'Completed' },
  cancelled: { color: '#EF4444', bg: 'rgba(239, 68, 68, 0.15)', label: 'Cancelled' },
};

export default function BookingsScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const theme = getThemeColors(isDark ? 'dark' : 'light');
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  const appointments = activeTab === 'upcoming' ? upcomingAppointments : pastAppointments;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.background }]}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Appointments</Text>
        <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>Manage your bespoke sessions</Text>
      </View>

      {/* Tab Switcher */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'upcoming' && styles.activeTab]}
          onPress={() => setActiveTab('upcoming')}
        >
          <Text style={[styles.tabText, activeTab === 'upcoming' && styles.activeTabText]}>
            Upcoming ({upcomingAppointments.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'past' && styles.activeTab]}
          onPress={() => setActiveTab('past')}
        >
          <Text style={[styles.tabText, activeTab === 'past' && styles.activeTabText]}>
            Past
          </Text>
        </TouchableOpacity>
      </View>

      {/* Appointments List */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {appointments.length === 0 ? (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconWrapper}>
              <Ionicons name="calendar-outline" size={36} color={Colors.gold} />
            </View>
            <Text style={styles.emptyTitle}>No Appointments</Text>
            <Text style={styles.emptySubtitle}>
              {activeTab === 'upcoming'
                ? "You don't have any upcoming appointments. Book one now to start your bespoke journey."
                : "Your completed appointments will appear here."}
            </Text>
            {activeTab === 'upcoming' && (
              <TouchableOpacity
                style={styles.emptyBtn}
                onPress={() => router.push('/booking/wizard')}
              >
                <Text style={styles.emptyBtnText}>Book Appointment</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <View style={styles.listContainer}>
            {appointments.map((apt) => {
              const status = statusConfig[apt.status];
              return (
                <GlassView intensity={20} style={styles.card} key={apt.id}>
                  <View style={styles.cardHeader}>
                    <View style={styles.cardHeaderLeft}>
                      <Text style={styles.cardType}>{apt.type}</Text>
                      <View style={styles.locationRow}>
                        <Ionicons name="location-outline" size={14} color="rgba(255,255,255,0.4)" />
                        <Text style={styles.locationText}>{apt.location}</Text>
                      </View>
                    </View>
                    <View style={[styles.statusBadge, { backgroundColor: status.bg }]}>
                      <Text style={[styles.statusText, { color: status.color }]}>
                        {status.label}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.dateTimeContainer}>
                    <View style={styles.dateTimeRow}>
                      <Ionicons name="calendar-outline" size={16} color={Colors.gold} />
                      <Text style={styles.dateTimeText}>{apt.date}</Text>
                    </View>
                    <View style={styles.dateTimeRow}>
                      <Ionicons name="time-outline" size={16} color={Colors.gold} />
                      <Text style={styles.dateTimeText}>{apt.time}</Text>
                    </View>
                  </View>

                  <View style={styles.cardFooter}>
                    <View style={styles.stylistContainer}>
                      <Image
                        source={{ uri: apt.stylistImage }}
                        style={styles.stylistImage}
                      />
                      <View>
                        <Text style={styles.stylistLabel}>Stylist</Text>
                        <Text style={styles.stylistName}>{apt.stylist}</Text>
                      </View>
                    </View>
                    {apt.status !== 'completed' && (
                      <TouchableOpacity style={styles.cancelBtn}>
                        <Ionicons name="close-outline" size={16} color="#EF4444" />
                        <Text style={styles.cancelBtnText}>Cancel</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </GlassView>
              );
            })}
          </View>
        )}
      </ScrollView>

      {/* Book Appointment FAB */}
      {activeTab === 'upcoming' && appointments.length > 0 && (
        <TouchableOpacity
          style={styles.fab}
          onPress={() => router.push('/booking/wizard')}
          activeOpacity={0.85}
        >
          <Ionicons name="add" size={20} color="#000" />
          <Text style={styles.fabText}>Book Appointment</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 24,
  },
  headerTitle: {
    fontFamily: FontFamily.display,
    fontSize: 28,
    color: '#FFF',
    fontWeight: '700',
  },
  headerSubtitle: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 14,
    marginTop: 4,
    fontFamily: FontFamily.medium,
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 24,
    marginBottom: 24,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: 4,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 12,
  },
  activeTab: {
    backgroundColor: 'rgba(201, 169, 98, 0.15)',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.5)',
  },
  activeTabText: {
    color: Colors.gold,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
    paddingHorizontal: 32,
  },
  emptyIconWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(201, 169, 98, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(201, 169, 98, 0.3)',
  },
  emptyTitle: {
    fontFamily: FontFamily.display,
    fontSize: 20,
    color: '#FFF',
    marginBottom: 8,
  },
  emptySubtitle: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  emptyBtn: {
    backgroundColor: Colors.gold,
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 24,
  },
  emptyBtnText: {
    color: '#000',
    fontWeight: '700',
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 120,
  },
  listContainer: {
    gap: 16,
  },
  card: {
    padding: 20,
    borderRadius: 24,
    backgroundColor: 'rgba(15, 15, 18, 0.6)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  cardHeaderLeft: {
    flex: 1,
  },
  cardType: {
    fontFamily: FontFamily.display,
    fontSize: 18,
    color: '#FFF',
    fontWeight: '700',
    marginBottom: 6,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  locationText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 13,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: 20,
  },
  dateTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dateTimeText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '500',
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  stylistContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  stylistImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  stylistLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.4)',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 2,
  },
  stylistName: {
    fontSize: 14,
    color: '#FFF',
    fontWeight: '600',
  },
  cancelBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },
  cancelBtnText: {
    fontSize: 12,
    color: '#EF4444',
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    bottom: 90,
    right: 24,
    backgroundColor: Colors.gold,
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    elevation: 8,
    shadowColor: Colors.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    shadowOpacity: 0.3,
  },
  fabText: {
    color: '#000',
    fontWeight: '700',
    fontSize: 15,
  },
});
