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

const materialFilters = ['All', 'Wool', 'Linen', 'Cotton', 'Silk', 'Cashmere', 'Polyester'];
const qualityFilters = ['All Tiers', 'Premium', 'Standard', 'Budget'];

const fabrics = [
  { id: '1', name: 'Super 150s Italian Wool', material: 'Wool', quality: 'Premium', origin: 'Italy', composition: '100% Merino Wool', pricePerMeter: 85000, color: '#2C3E50' },
  { id: '2', name: 'English Worsted Tweed', material: 'Wool', quality: 'Premium', origin: 'England', composition: '100% Wool', pricePerMeter: 72000, color: '#7D6608' },
  { id: '3', name: 'Egyptian Cotton Twill', material: 'Cotton', quality: 'Standard', origin: 'Egypt', composition: '100% Egyptian Cotton', pricePerMeter: 35000, color: '#F5F5DC' },
  { id: '4', name: 'Irish Linen', material: 'Linen', quality: 'Standard', origin: 'Ireland', composition: '100% Linen', pricePerMeter: 42000, color: '#E8DCC8' },
  { id: '5', name: 'Chinese Silk Charmeuse', material: 'Silk', quality: 'Premium', origin: 'China', composition: '100% Mulberry Silk', pricePerMeter: 120000, color: '#8B0000' },
  { id: '6', name: 'Mongolian Cashmere', material: 'Cashmere', quality: 'Premium', origin: 'Mongolia', composition: '100% Cashmere', pricePerMeter: 180000, color: '#D2B48C' },
  { id: '7', name: 'Japanese Cotton Gabardine', material: 'Cotton', quality: 'Standard', origin: 'Japan', composition: '98% Cotton, 2% Elastane', pricePerMeter: 38000, color: '#1A1A1A' },
  { id: '8', name: 'Portuguese Wool Flannel', material: 'Wool', quality: 'Budget', origin: 'Portugal', composition: '80% Wool, 20% Polyester', pricePerMeter: 45000, color: '#36454F' },
  { id: '9', name: 'Thai Silk Brocade', material: 'Silk', quality: 'Premium', origin: 'Thailand', composition: '100% Thai Silk', pricePerMeter: 95000, color: '#C9A962' },
  { id: '10', name: 'Indian Linen Blend', material: 'Linen', quality: 'Budget', origin: 'India', composition: '55% Linen, 45% Cotton', pricePerMeter: 28000, color: '#F0E68C' },
];

export default function FabricsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMaterial, setActiveMaterial] = useState('All');
  const [activeQuality, setActiveQuality] = useState('All Tiers');

  const filteredFabrics = fabrics.filter((f) => {
    const matchesSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMaterial = activeMaterial === 'All' || f.material === activeMaterial;
    const matchesQuality = activeQuality === 'All Tiers' || f.quality === activeQuality;
    return matchesSearch && matchesMaterial && matchesQuality;
  });

  const formatPrice = (price: number) => `TZS ${price.toLocaleString()}/m`;

  const qualityColor: Record<string, { text: string; bg: string }> = {
    Premium: { text: '#B45309', bg: '#FEF3C7' },
    Standard: { text: '#2563EB', bg: '#DBEAFE' },
    Budget: { text: '#059669', bg: '#D1FAE5' },
  };

  return (
    <View className="flex-1 bg-ivory">
      {/* Header */}
      <View className="px-4 pt-4 pb-2 flex-row items-center gap-3">
        <TouchableOpacity className="p-1" onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={NAVY} />
        </TouchableOpacity>
        <View className="flex-1">
          <Text className="font-heading text-xl text-navy">Fabric Library</Text>
          <Text className="text-charcoal/60 text-xs">{fabrics.length} fabrics available</Text>
        </View>
      </View>

      {/* Search */}
      <View className="px-4 py-2">
        <View className="flex-row items-center bg-white rounded-xl px-3.5 py-2.5 shadow-sm">
          <Ionicons name="search" size={18} color="#6B6361" />
          <TextInput
            className="flex-1 ml-2 text-sm text-navy"
            placeholder="Search fabrics..."
            placeholderTextColor="#6B636180"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Material Filter */}
      <View className="px-4 py-1">
        <Text className="text-xs font-semibold text-charcoal/50 uppercase tracking-wider mb-2">Material</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="gap-2">
          {materialFilters.map((m) => (
            <TouchableOpacity
              key={m}
              className={`px-3.5 py-1.5 rounded-full ${activeMaterial === m ? 'bg-gold' : 'bg-white'}`}
              onPress={() => setActiveMaterial(m)}
            >
              <Text className={`text-xs font-semibold ${activeMaterial === m ? 'text-navy' : 'text-charcoal'}`}>
                {m}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Quality Filter */}
      <View className="px-4 py-2">
        <Text className="text-xs font-semibold text-charcoal/50 uppercase tracking-wider mb-2">Quality Tier</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="gap-2">
          {qualityFilters.map((q) => (
            <TouchableOpacity
              key={q}
              className={`px-3.5 py-1.5 rounded-full ${activeQuality === q ? 'bg-navy' : 'bg-white'}`}
              onPress={() => setActiveQuality(q)}
            >
              <Text className={`text-xs font-semibold ${activeQuality === q ? 'text-gold' : 'text-charcoal'}`}>
                {q}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Fabric Cards */}
      <ScrollView showsVerticalScrollIndicator={false} className="px-4 py-3 pb-8">
        <View className="gap-3">
          {filteredFabrics.map((fabric) => {
            const qc = qualityColor[fabric.quality] || qualityColor.Standard;
            return (
              <TouchableOpacity
                key={fabric.id}
                className="bg-white rounded-2xl p-4 shadow-sm flex-row gap-3.5"
                activeOpacity={0.85}
              >
                <View
                  className="w-16 h-20 rounded-xl items-center justify-center"
                  style={{ backgroundColor: fabric.color + '20', borderWidth: 1, borderColor: fabric.color + '40' }}
                >
                  <View className="w-10 h-14 rounded-lg" style={{ backgroundColor: fabric.color }} />
                </View>
                <View className="flex-1 justify-between py-0.5">
                  <View>
                    <Text className="font-semibold text-navy text-sm mb-0.5" numberOfLines={1}>
                      {fabric.name}
                    </Text>
                    <Text className="text-charcoal/60 text-xs mb-1">{fabric.composition}</Text>
                    <View className="flex-row items-center gap-2">
                      <View className="flex-row items-center gap-1">
                        <Ionicons name="location-outline" size={11} color="#6B6361" />
                        <Text className="text-charcoal/50 text-[11px]">{fabric.origin}</Text>
                      </View>
                      <View
                        className="px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: qc.bg }}
                      >
                        <Text className="text-[10px] font-semibold" style={{ color: qc.text }}>
                          {fabric.quality}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View className="flex-row items-center justify-between mt-2">
                    <Text className="text-gold font-bold text-sm">{formatPrice(fabric.pricePerMeter)}</Text>
                    <TouchableOpacity className="bg-gold/10 px-3 py-1.5 rounded-lg">
                      <Text className="text-gold text-xs font-semibold">Select</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
