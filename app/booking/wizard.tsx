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

const GOLD = '#C9A962';
const NAVY = '#1B2A4A';

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
    <View className="flex-1 bg-ivory">
      {/* Header */}
      <View className="px-4 pt-4 pb-3 flex-row items-center gap-3">
        <TouchableOpacity className="p-1" onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={NAVY} />
        </TouchableOpacity>
        <View className="flex-1">
          <Text className="font-heading text-xl text-navy">Book Appointment</Text>
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
                className={`w-8 h-8 rounded-full items-center justify-center ${
                  index <= currentStep ? 'bg-gold' : 'bg-gray-200'
                }`}
              >
                <Text className={`text-xs font-bold ${index <= currentStep ? 'text-navy' : 'text-charcoal/50'}`}>
                  {index + 1}
                </Text>
              </View>
              <Text className={`text-[10px] mt-1 ${index <= currentStep ? 'text-navy font-medium' : 'text-charcoal/40'}`}>
                {label}
              </Text>
            </View>
          ))}
        </View>
        <View className="h-1 bg-gray-200 rounded-full overflow-hidden">
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
            <Text className="font-heading text-lg text-navy mb-1">Select Appointment Type</Text>
            {appointmentTypes.map((type) => (
              <TouchableOpacity
                key={type.id}
                className={`bg-white rounded-2xl p-4 shadow-sm border-2 ${
                  selectedType === type.id ? 'border-gold' : 'border-transparent'
                }`}
                onPress={() => setSelectedType(type.id)}
                activeOpacity={0.85}
              >
                <View className="flex-row items-start gap-3.5">
                  <View className={`w-12 h-12 rounded-xl items-center justify-center ${
                    selectedType === type.id ? 'bg-gold/20' : 'bg-ivory'
                  }`}>
                    <Ionicons name={type.icon} size={22} color={selectedType === type.id ? GOLD : NAVY} />
                  </View>
                  <View className="flex-1">
                    <Text className="font-semibold text-navy text-base">{type.title}</Text>
                    <Text className="text-charcoal/60 text-xs mt-0.5 leading-relaxed">{type.desc}</Text>
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
            <Text className="font-heading text-lg text-navy mb-1">Select Date & Time</Text>

            {/* Calendar Dates */}
            <Text className="text-sm font-semibold text-charcoal/60 mb-2">Available Dates</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="gap-2 mb-5">
              {dates.map((d, index) => (
                <TouchableOpacity
                  key={d.fullDate}
                  className={`w-16 py-3 rounded-xl items-center ${
                    selectedDate === index ? 'bg-gold' : 'bg-white'
                  }`}
                  onPress={() => setSelectedDate(index)}
                >
                  <Text className={`text-[10px] ${selectedDate === index ? 'text-navy/60' : 'text-charcoal/40'}`}>
                    {d.day}
                  </Text>
                  <Text className={`text-lg font-bold mt-0.5 ${selectedDate === index ? 'text-navy' : 'text-navy'}`}>
                    {d.date}
                  </Text>
                  <Text className={`text-[10px] ${selectedDate === index ? 'text-navy/60' : 'text-charcoal/40'}`}>
                    {d.month}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Time Slots */}
            <Text className="text-sm font-semibold text-charcoal/60 mb-2">Available Times</Text>
            <View className="flex-row flex-wrap gap-2">
              {timeSlots.map((time) => (
                <TouchableOpacity
                  key={time}
                  className={`px-4 py-2.5 rounded-xl ${
                    selectedTime === time ? 'bg-gold' : 'bg-white'
                  }`}
                  onPress={() => setSelectedTime(time)}
                >
                  <Text className={`text-sm font-medium ${selectedTime === time ? 'text-navy' : 'text-charcoal'}`}>
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
            <Text className="font-heading text-lg text-navy mb-1">Choose Your Stylist</Text>
            <Text className="text-charcoal/60 text-sm mb-3">Select your preferred stylist or we'll assign one</Text>
            <View className="gap-3">
              {stylists.map((stylist) => (
                <TouchableOpacity
                  key={stylist.id}
                  className={`bg-white rounded-2xl p-4 shadow-sm border-2 ${
                    selectedStylist === stylist.id ? 'border-gold' : 'border-transparent'
                  }`}
                  onPress={() => setSelectedStylist(stylist.id)}
                  activeOpacity={0.85}
                >
                  <View className="flex-row items-center gap-3.5">
                    <View className={`w-14 h-14 rounded-full items-center justify-center ${
                      selectedStylist === stylist.id ? 'bg-gold/20 ring-2 ring-gold ring-offset-2' : 'bg-navy/10'
                    }`}>
                      <Ionicons name="person" size={24} color={NAVY} />
                    </View>
                    <View className="flex-1">
                      <Text className="font-semibold text-navy text-base">{stylist.name}</Text>
                      <Text className="text-charcoal/60 text-xs">{stylist.specialty}</Text>
                      <View className="flex-row items-center gap-1 mt-1">
                        <Ionicons name="star" size={12} color={GOLD} />
                        <Text className="text-xs text-navy font-medium">{stylist.rating}</Text>
                        <Text className="text-xs text-charcoal/40">({stylist.reviews} reviews)</Text>
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
            <Text className="font-heading text-lg text-navy mb-1">Contact Details</Text>

            {/* Summary Card */}
            <View className="bg-white rounded-2xl p-4 shadow-sm mb-5">
              <Text className="text-xs font-semibold text-charcoal/50 uppercase tracking-wider mb-3">Booking Summary</Text>
              <View className="space-y-2.5">
                <View className="flex-row justify-between">
                  <Text className="text-charcoal/60 text-sm">Type</Text>
                  <Text className="text-navy text-sm font-medium">
                    {appointmentTypes.find((t) => t.id === selectedType)?.title}
                  </Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-charcoal/60 text-sm">Date</Text>
                  <Text className="text-navy text-sm font-medium">{dates[selectedDate]?.fullDate}</Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-charcoal/60 text-sm">Time</Text>
                  <Text className="text-navy text-sm font-medium">{selectedTime}</Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-charcoal/60 text-sm">Stylist</Text>
                  <Text className="text-navy text-sm font-medium">
                    {stylists.find((s) => s.id === selectedStylist)?.name}
                  </Text>
                </View>
              </View>
            </View>

            {/* Contact Form */}
            <View className="space-y-3">
              <View>
                <Text className="text-sm font-medium text-navy mb-1.5">Full Name</Text>
                <View className="bg-white rounded-xl px-3.5 py-3 shadow-sm">
                  <TextInput
                    className="text-sm text-navy"
                    value={name}
                    onChangeText={setName}
                    placeholder="Enter your name"
                  />
                </View>
              </View>
              <View>
                <Text className="text-sm font-medium text-navy mb-1.5">Phone Number</Text>
                <View className="bg-white rounded-xl px-3.5 py-3 shadow-sm">
                  <TextInput
                    className="text-sm text-navy"
                    value={phone}
                    onChangeText={setPhone}
                    placeholder="+255 xxx xxx xxx"
                    keyboardType="phone-pad"
                  />
                </View>
              </View>
              <View>
                <Text className="text-sm font-medium text-navy mb-1.5">Special Notes (Optional)</Text>
                <View className="bg-white rounded-xl px-3.5 py-3 shadow-sm">
                  <TextInput
                    className="text-sm text-navy"
                    value={notes}
                    onChangeText={setNotes}
                    placeholder="Any special requests..."
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
      <View className="absolute bottom-0 left-0 right-0 bg-white px-4 pt-3 pb-8 shadow-lg" style={styles.stickyBar}>
        {currentStep > 0 && (
          <TouchableOpacity
            className="absolute left-4 top-3 p-2"
            onPress={() => setCurrentStep(currentStep - 1)}
          >
            <Ionicons name="arrow-back" size={20} color={NAVY} />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          className={`py-3.5 rounded-xl items-center ${canProceed() ? 'bg-gold' : 'bg-gray-200'}`}
          onPress={handleNext}
          disabled={!canProceed()}
          activeOpacity={0.85}
        >
          <Text className={`font-bold text-sm ${canProceed() ? 'text-navy' : 'text-charcoal/40'}`}>
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
