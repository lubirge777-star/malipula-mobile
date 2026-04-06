import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
  Alert,
  StatusBar,
  useColorScheme,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors, FontFamily, Shadows, getThemeColors } from '../../../src/theme';
import { GlassView } from '../../../src/components/ui';

const cartItems = [
  {
    id: '1',
    name: 'The Executive 3-Piece',
    variant: 'Navy / Size 42',
    price: 1250000,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
  },
  {
    id: '2',
    name: 'Ivory Formal Kaftan',
    variant: 'White / Size M',
    price: 120000,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=150&h=150&fit=crop',
  },
];

export default function CartScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const theme = getThemeColors(isDark ? 'dark' : 'light');
  const [items, setItems] = useState(cartItems);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
      ).filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id: string) => {
    Alert.alert('Remove Item', 'Are you sure you want to remove this item from your cart?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: () => setItems((prev) => prev.filter((item) => item.id !== id)),
      },
    ]);
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = items.length > 0 ? 15000 : 0;
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal + deliveryFee - discount;

  const formatPrice = (price: number) => `TZS ${price.toLocaleString()}`;

  const handlePromo = () => {
    if (promoCode.toUpperCase() === 'MALIPULA10') {
      setPromoApplied(true);
    }
  };

  const isEmpty = items.length === 0;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.background }]}>
        <View>
          <Text style={[styles.headerTitle, { color: theme.text }]}>My Archive</Text>
          {!isEmpty && (
            <Text style={styles.headerSubtitle}>
              {items.length} {items.length === 1 ? 'masterpiece' : 'masterpieces'}
            </Text>
          )}
        </View>
        {!isEmpty && (
          <TouchableOpacity onPress={() => Alert.alert('Clear Archive', 'Remove all items?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Clear', style: 'destructive', onPress: () => setItems([]) },
          ])} style={styles.headerTrash}>
            <Ionicons name="trash-outline" size={20} color="rgba(255, 255, 255, 0.4)" />
          </TouchableOpacity>
        )}
      </View>

      {isEmpty ? (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconWrapper}>
            <Ionicons name="bag-outline" size={44} color={Colors.gold} />
          </View>
          <Text style={styles.emptyTitle}>Your archive is empty</Text>
          <Text style={styles.emptySubtitle}>
            Discover our collection and commission your next masterpiece.
          </Text>
          <TouchableOpacity
            style={styles.emptyBtn}
            onPress={() => router.push('/shop')}
          >
            <Text style={styles.emptyBtnText}>Enter Gallery</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            {/* Cart Items */}
            <View style={styles.itemsContainer}>
              {items.map((item) => (
                <View key={item.id} style={styles.itemCard}>
                  <Image
                    source={{ uri: item.image }}
                    style={styles.itemImage}
                    resizeMode="cover"
                  />
                  <View style={styles.itemDetails}>
                    <View>
                      <Text style={styles.itemName} numberOfLines={1}>
                        {item.name}
                      </Text>
                      <Text style={styles.itemVariant}>{item.variant}</Text>
                    </View>
                    <View style={styles.itemActionsRow}>
                      <Text style={styles.itemPrice}>
                        {formatPrice(item.price * item.quantity)}
                      </Text>
                      <View style={styles.qtyControls}>
                        <TouchableOpacity
                          style={styles.qtyBtn}
                          onPress={() => updateQuantity(item.id, -1)}
                        >
                          <Ionicons name="remove" size={14} color={Colors.gold} />
                        </TouchableOpacity>
                        <Text style={styles.qtyText}>{item.quantity}</Text>
                        <TouchableOpacity
                          style={styles.qtyBtn}
                          onPress={() => updateQuantity(item.id, 1)}
                        >
                          <Ionicons name="add" size={14} color={Colors.gold} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={styles.removeBtn}
                    onPress={() => removeItem(item.id)}
                  >
                    <Ionicons name="close" size={16} color="rgba(255,255,255,0.4)" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            {/* Promo Code */}
            <View style={styles.promoContainer}>
              <Text style={styles.promoLabel}>Commission Privilege Code</Text>
              <View style={styles.promoRow}>
                <View style={styles.promoInputWrapper}>
                  <Ionicons name="ticket-outline" size={16} color={Colors.gold} />
                  <TextInput
                    style={styles.promoInput}
                    placeholder="Enter code"
                    placeholderTextColor="rgba(255, 255, 255, 0.3)"
                    value={promoCode}
                    onChangeText={setPromoCode}
                  />
                </View>
                <TouchableOpacity
                  style={[styles.promoApplyBtn, promoApplied && styles.promoAppliedBtn]}
                  onPress={handlePromo}
                >
                  <Text style={styles.promoApplyText}>
                    {promoApplied ? 'Applied' : 'Apply'}
                  </Text>
                </TouchableOpacity>
              </View>
              {promoApplied && (
                <View style={styles.promoSuccessMsg}>
                  <Ionicons name="checkmark-circle" size={14} color={Colors.gold} />
                  <Text style={styles.promoSuccessText}>
                    Privilege applied! Discount: {formatPrice(discount)}
                  </Text>
                </View>
              )}
            </View>
          </ScrollView>

          {/* Sticky Order Summary */}
          <GlassView intensity={40} style={styles.summaryBar}>
            <View style={styles.summaryHandle} />
            <View style={styles.summaryDetails}>
              <View style={styles.summaryRowItem}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>{formatPrice(subtotal)}</Text>
              </View>
              <View style={styles.summaryRowItem}>
                <Text style={styles.summaryLabel}>Delivery</Text>
                <Text style={styles.summaryValue}>{formatPrice(deliveryFee)}</Text>
              </View>
              {promoApplied && (
                <View style={styles.summaryRowItem}>
                  <Text style={[styles.summaryLabel, { color: Colors.gold }]}>Discount</Text>
                  <Text style={[styles.summaryValue, { color: Colors.gold }]}>-{formatPrice(discount)}</Text>
                </View>
              )}
              <View style={styles.summaryDivider} />
              <View style={styles.summaryRowItem}>
                <Text style={styles.totalLabel}>Total Commission</Text>
                <Text style={styles.totalValue}>{formatPrice(total)}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.checkoutBtn}
              onPress={() => router.push('/checkout')}
              activeOpacity={0.85}
            >
              <Text style={styles.checkoutBtnText}>Secure Commission</Text>
            </TouchableOpacity>
          </GlassView>
        </>
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
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontFamily: FontFamily.display,
    fontSize: 28,
    color: '#FFF',
    fontWeight: '700',
    letterSpacing: 1,
  },
  headerSubtitle: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 13,
    marginTop: 4,
    fontFamily: FontFamily.medium,
  },
  headerTrash: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  emptyIconWrapper: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(201, 169, 98, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(201, 169, 98, 0.3)',
  },
  emptyTitle: {
    fontFamily: FontFamily.display,
    fontSize: 22,
    color: '#FFF',
    marginBottom: 12,
  },
  emptySubtitle: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  emptyBtn: {
    backgroundColor: Colors.gold,
    paddingHorizontal: 32,
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
    paddingBottom: 200,
  },
  itemsContainer: {
    gap: 16,
  },
  itemCard: {
    backgroundColor: 'rgba(15, 15, 18, 0.8)',
    borderRadius: 20,
    padding: 12,
    flexDirection: 'row',
    gap: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    position: 'relative',
  },
  itemImage: {
    width: 80,
    height: 100,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  itemName: {
    color: '#FFF',
    fontFamily: FontFamily.display,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
    paddingRight: 20,
  },
  itemVariant: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 12,
  },
  itemActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  itemPrice: {
    color: Colors.gold,
    fontWeight: '700',
    fontSize: 14,
  },
  qtyControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    paddingHorizontal: 4,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  qtyBtn: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '600',
    width: 20,
    textAlign: 'center',
  },
  removeBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  promoContainer: {
    marginTop: 32,
  },
  promoLabel: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 12,
  },
  promoRow: {
    flexDirection: 'row',
    gap: 12,
  },
  promoInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 15, 18, 0.8)',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  promoInput: {
    flex: 1,
    marginLeft: 12,
    color: '#FFF',
    fontFamily: FontFamily.medium,
    fontSize: 14,
  },
  promoApplyBtn: {
    backgroundColor: 'rgba(201, 169, 98, 0.1)',
    paddingHorizontal: 24,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(201, 169, 98, 0.4)',
  },
  promoAppliedBtn: {
    backgroundColor: 'rgba(201, 169, 98, 0.3)',
  },
  promoApplyText: {
    color: Colors.gold,
    fontWeight: '700',
    fontSize: 13,
  },
  promoSuccessMsg: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
    paddingHorizontal: 4,
  },
  promoSuccessText: {
    color: Colors.gold,
    fontSize: 12,
    fontWeight: '600',
  },
  summaryBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 16,
    paddingHorizontal: 24,
    paddingBottom: 80,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  summaryHandle: {
    width: 40,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  summaryDetails: {
    marginBottom: 20,
  },
  summaryRowItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 13,
  },
  summaryValue: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '500',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginVertical: 12,
  },
  totalLabel: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  totalValue: {
    color: Colors.gold,
    fontSize: 20,
    fontWeight: '700',
    fontFamily: FontFamily.display,
  },
  checkoutBtn: {
    backgroundColor: Colors.gold,
    borderRadius: 20,
    paddingVertical: 18,
    alignItems: 'center',
  },
  checkoutBtnText: {
    color: '#000',
    fontWeight: '800',
    fontSize: 15,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
});
