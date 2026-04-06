import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'react-native';
import { Colors, getThemeColors } from '../../src/theme';

const GOLD = Colors.gold;
const NAVY = Colors.navy;

const appointmentTypes = [
  { id: 'in-store', icon: 'storefront-outline' as const, title: 'In-Store Fitting', desc: 'Visit our boutique for a personal fitting session', duration: '45 min' },
  { id: 'virtual', icon: 'videocam-outline' as const, title: 'Virtual Consultation', desc: 'Connect with a stylist via video call', duration: '30 min' },
  { id: 'measurement', icon: 'resize-outline' as const, title: 'Measurement Session', desc: 'Get professionally measured for the perfect fit', duration: '30 min' },
  { id: 'style', icon: 'color-palette-outline' as const, title: 'Style Consultation', desc: 'Expert advice on fabrics, colors, and styles', duration: '45 min' },
];

const timeSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM',
];

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// Generate some mock dates
const generateDates = () => {
  const dates = [];
  const now = new Date();
  for (let i = 0; i < 14; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() + i);
    if (d.getDay() !== 0) { // Skip Sundays
      dates.push({
        date: d.getDate(),
        day: days[d.getDay() === 6 ? 6 : d.getDay() - 1],
        month: d.toLocaleDateString('en', { month: 'short' }),
        fullDate: d.toISOString().split('T')[0],
      });
    }
  }
  return dates;
};

const dates = generateDates();

const stylists = [
  { id: '1', name: 'James Mwangi', rating: 4.9, reviews: 201, specialty: 'Classic Suits', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
  { id: '2', name: 'Fatma Hassan', rating: 4.8, reviews: 156, specialty: 'Modern Fit & Kaftans', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
  { id: '3', name: 'Ahmed Mohamed', rating: 4.7, reviews: 132, specialty: 'Formal Wear', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop' },
  { id: '4', name: 'Grace Kimaro', rating: 4.9, reviews: 178, specialty: 'Wedding & Event', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop' },
];

const stepLabels = ['Type', 'Date & Time', 'Stylist', 'Confirm'];

export default function BookingWizardScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = getThemeColors(colorScheme === 'dark' ? 'dark' : 'light');
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedStylist, setSelectedStylist] = useState<string | null>(null);
  const [name, setName] = useState('Michael Kimaro');
  const [phone, setPhone] = useState('+255 712 345 678');
  const [notes, setNotes] = useState('');

  const canProceed = () => {
    switch (currentStep) {
      case 0: return selectedType !== null;
      case 1: return selectedTime !== null;
      case 2: return selectedStylist !== null;
      case 3: return name.length >= 2 && phone.length >= 10;
      default: return false;
    }
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Booking complete
      router.push('/bookings');
    }
  };

  return (
    <View className="flex-1" style={{ backgroundColor: theme.background }}>
      {/* Header */}
      <View className="px-4 pt-4 pb-3 flex-row items-center gap-3">
        <TouchableOpacity className="p-1" onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <View className="flex-1">
          <Text className="font-heading text-xl" style={{ color: theme.text }}>Book Appointment</Text>
        </View>
        <TouchableOpacity onPress={() => { setCurrentStep(0); setSelectedType(null); setSelectedTime(null); setSelectedStylist(null); }}>
          <Text className="text-gold text-sm font-medium">Reset</Text>
        </TouchableOpacity>
      </View>

      {/* Step Indicator */}
      <View className="px-4 pb-4">
        <View className="flex-row items-center justify-between mb-2">
          {stepLabels.map((label, index) => (
            <View key={label} className="flex-1 items-center">
              <View
                className={`w-8 h-8 rounded-full items-center justify-center`}
                style={{ backgroundColor: index <= currentStep ? GOLD : theme.border }}
              >
                <Text style={{ color: index <= currentStep ? NAVY : theme.textSecondary, fontWeight: 'bold', fontSize: 12 }}>
                  {index + 1}
                </Text>
              </View>
              <Text className="text-[10px] mt-1" style={{ color: index <= currentStep ? theme.text : theme.textSecondary, fontWeight: index <= currentStep ? '500' : 'normal' }}>
                {label}
              </Text>
            </View>
          ))}
        </View>
        <View className="h-1 rounded-full overflow-hidden" style={{ backgroundColor: theme.border }}>
          <View
            className="h-full bg-gold rounded-full"
            style={{ width: `${((currentStep + 1) / 4) * 100}%` }}
          />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-4 pb-32">
        {/* Step 1: Appointment Type */}
        {currentStep === 0 && (
          <View className="gap-3">
            <Text className="font-heading text-lg mb-1" style={{ color: theme.text }}>Select Appointment Type</Text>
            {appointmentTypes.map((type) => (
              <TouchableOpacity
                key={type.id}
                className={`rounded-2xl p-4 shadow-sm border-2 ${
                  selectedType === type.id ? 'border-gold' : 'border-transparent'
                }`}
                style={{ backgroundColor: theme.surface }}
                onPress={() => setSelectedType(type.id)}
                activeOpacity={0.85}
              >
                <View className="flex-row items-start gap-3.5">
                  <View className={`w-12 h-12 rounded-xl items-center justify-center`}
                    style={{ backgroundColor: selectedType === type.id ? 'rgba(201, 169, 98, 0.2)' : theme.background }}
                  >
                    <Ionicons name={type.icon} size={22} color={selectedType === type.id ? GOLD : theme.text} />
                  </View>
                  <View className="flex-1">
                    <Text className="font-semibold text-base" style={{ color: theme.text }}>{type.title}</Text>
                    <Text className="text-xs mt-0.5 leading-relaxed" style={{ color: theme.textSecondary }}>{type.desc}</Text>
                    <View className="flex-row items-center gap-1 mt-2">
                      <Ionicons name="time-outline" size={12} color={GOLD} />
                      <Text className="text-gold text-xs font-medium">{type.duration}</Text>
                    </View>
                  </View>
                  {selectedType === type.id && (
                    <View className="w-6 h-6 bg-gold rounded-full items-center justify-center">
                      <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Step 2: Date & Time */}
        {currentStep === 1 && (
          <View>
            <Text className="font-heading text-lg mb-1" style={{ color: theme.text }}>Select Date & Time</Text>

            {/* Calendar Dates */}
            <Text className="text-sm font-semibold mb-2" style={{ color: theme.textSecondary }}>Available Dates</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="gap-2 mb-5">
              {dates.map((d, index) => (
                <TouchableOpacity
                  key={d.fullDate}
                  className={`w-16 py-3 rounded-xl items-center`}
                  style={{ backgroundColor: selectedDate === index ? GOLD : theme.surface }}
                  onPress={() => setSelectedDate(index)}
                >
                  <Text className="text-[10px]" style={{ color: selectedDate === index ? NAVY : theme.textSecondary }}>
                    {d.day}
                  </Text>
                  <Text className="text-lg font-bold mt-0.5" style={{ color: selectedDate === index ? NAVY : theme.text }}>
                    {d.date}
                  </Text>
                  <Text className="text-[10px]" style={{ color: selectedDate === index ? NAVY : theme.textSecondary }}>
                    {d.month}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Time Slots */}
            <Text className="text-sm font-semibold mb-2" style={{ color: theme.textSecondary }}>Available Times</Text>
            <View className="flex-row flex-wrap gap-2">
              {timeSlots.map((time) => (
                <TouchableOpacity
                  key={time}
                  className={`px-4 py-2.5 rounded-xl`}
                  style={{ backgroundColor: selectedTime === time ? GOLD : theme.surface }}
                  onPress={() => setSelectedTime(time)}
                >
                  <Text className="text-sm font-medium" style={{ color: selectedTime === time ? NAVY : theme.text }}>
                    {time}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Step 3: Stylist */}
        {currentStep === 2 && (
          <View>
            <Text className="font-heading text-lg mb-1" style={{ color: theme.text }}>Choose Your Stylist</Text>
            <Text className="text-sm mb-3" style={{ color: theme.textSecondary }}>Select your preferred stylist or we'll assign one</Text>
            <View className="gap-3">
              {stylists.map((stylist) => (
                <TouchableOpacity
                  key={stylist.id}
                  className={`rounded-2xl p-4 shadow-sm border-2 ${
                    selectedStylist === stylist.id ? 'border-gold' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: theme.surface }}
                  onPress={() => setSelectedStylist(stylist.id)}
                  activeOpacity={0.85}
                >
                  <View className="flex-row items-center gap-3.5">
                    <View className={`w-14 h-14 rounded-full items-center justify-center ${
                      selectedStylist === stylist.id ? 'ring-2 ring-gold ring-offset-2' : ''
                    }`}
                      style={{ backgroundColor: selectedStylist === stylist.id ? 'rgba(201,169,98,0.2)' : theme.background }}
                    >
                      <Ionicons name="person" size={24} color={theme.text} />
                    </View>
                    <View className="flex-1">
                      <Text className="font-semibold text-base" style={{ color: theme.text }}>{stylist.name}</Text>
                      <Text className="text-xs" style={{ color: theme.textSecondary }}>{stylist.specialty}</Text>
                      <View className="flex-row items-center gap-1 mt-1">
                        <Ionicons name="star" size={12} color={GOLD} />
                        <Text className="text-xs font-medium" style={{ color: theme.text }}>{stylist.rating}</Text>
                        <Text className="text-xs" style={{ color: theme.textSecondary }}>({stylist.reviews} reviews)</Text>
                      </View>
                    </View>
                    {selectedStylist === stylist.id && (
                      <View className="w-6 h-6 bg-gold rounded-full items-center justify-center">
                        <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Step 4: Contact Details & Confirm */}
        {currentStep === 3 && (
          <View>
            <Text className="font-heading text-lg mb-1" style={{ color: theme.text }}>Contact Details</Text>

            {/* Summary Card */}
            <View className="rounded-2xl p-4 shadow-sm mb-5" style={{ backgroundColor: theme.surface }}>
              <Text className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: theme.textSecondary }}>Booking Summary</Text>
              <View className="space-y-2.5">
                <View className="flex-row justify-between">
                  <Text className="text-sm" style={{ color: theme.textSecondary }}>Type</Text>
                  <Text className="text-sm font-medium" style={{ color: theme.text }}>
                    {appointmentTypes.find((t) => t.id === selectedType)?.title}
                  </Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-sm" style={{ color: theme.textSecondary }}>Date</Text>
                  <Text className="text-sm font-medium" style={{ color: theme.text }}>{dates[selectedDate]?.fullDate}</Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-sm" style={{ color: theme.textSecondary }}>Time</Text>
                  <Text className="text-sm font-medium" style={{ color: theme.text }}>{selectedTime}</Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-sm" style={{ color: theme.textSecondary }}>Stylist</Text>
                  <Text className="text-sm font-medium" style={{ color: theme.text }}>
                    {stylists.find((s) => s.id === selectedStylist)?.name}
                  </Text>
                </View>
              </View>
            </View>

            {/* Contact Form */}
            <View className="space-y-3">
              <View>
                <Text className="text-sm font-medium mb-1.5" style={{ color: theme.text }}>Full Name</Text>
                <View className="rounded-xl px-3.5 py-3 shadow-sm border" style={{ backgroundColor: theme.surface, borderColor: theme.border }}>
                  <TextInput
                    className="text-sm"
                    style={{ color: theme.text }}
                    value={name}
                    onChangeText={setName}
                    placeholder="Enter your name"
                    placeholderTextColor={theme.textSecondary}
                  />
                </View>
              </View>
              <View>
                <Text className="text-sm font-medium mb-1.5" style={{ color: theme.text }}>Phone Number</Text>
                <View className="rounded-xl px-3.5 py-3 shadow-sm border" style={{ backgroundColor: theme.surface, borderColor: theme.border }}>
                  <TextInput
                    className="text-sm"
                    style={{ color: theme.text }}
                    value={phone}
                    onChangeText={setPhone}
                    placeholder="+255 xxx xxx xxx"
                    placeholderTextColor={theme.textSecondary}
                    keyboardType="phone-pad"
                  />
                </View>
              </View>
              <View>
                <Text className="text-sm font-medium mb-1.5" style={{ color: theme.text }}>Special Notes (Optional)</Text>
                <View className="rounded-xl px-3.5 py-3 shadow-sm border" style={{ backgroundColor: theme.surface, borderColor: theme.border }}>
                  <TextInput
                    className="text-sm"
                    style={{ color: theme.text }}
                    value={notes}
                    onChangeText={setNotes}
                    placeholder="Any special requests..."
                    placeholderTextColor={theme.textSecondary}
                    multiline
                    numberOfLines={3}
                  />
                </View>
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Bottom Action Bar */}
      <View className="absolute bottom-0 left-0 right-0 px-4 pt-3 pb-8 shadow-lg" style={[styles.stickyBar, { backgroundColor: theme.surface, borderTopColor: theme.border, borderTopWidth: 1 }]}>
        {currentStep > 0 && (
          <TouchableOpacity
            className="absolute left-4 top-3 p-2"
            onPress={() => setCurrentStep(currentStep - 1)}
          >
            <Ionicons name="arrow-back" size={20} color={theme.text} />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          className={`py-3.5 rounded-xl items-center ${canProceed() ? 'bg-gold' : 'bg-gray-200'}`}
          style={!canProceed() ? { backgroundColor: theme.border } : {}}
          onPress={handleNext}
          disabled={!canProceed()}
          activeOpacity={0.85}
        >
          <Text className={`font-bold text-sm ${canProceed() ? 'text-navy' : 'text-charcoal/40'}`} style={!canProceed() ? { color: theme.textSecondary } : { color: NAVY }}>
            {currentStep === 3 ? 'Confirm Booking' : 'Continue'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  stickyBar: {
    elevation: 10,
    shadowColor: 'rgba(27, 42, 74, 0.1)',
    shadowOffset: { width: 0, height: -4 },
    shadowRadius: 16,
    shadowOpacity: 1,
  },
});
