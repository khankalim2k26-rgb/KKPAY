// app/payment/add-money.tsx
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import KKButton from '@/components/common/KKButton';

export default function AddMoney() {
  const router = useRouter();
  const [amount, setAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState<'upi' | 'card' | 'bank' | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const quickAmounts = ['100', '500', '1000', '2000', '5000'];

  const handleAddMoney = () => {
    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount greater than 0');
      return;
    }

    if (!selectedMethod) {
      Alert.alert('Method Required', 'Please select a payment method');
      return;
    }

    setIsLoading(true);

    // Simulate API call / payment processing (2 seconds delay)
    setTimeout(() => {
      setIsLoading(false);
      
      Alert.alert(
        'Success!',
        `₹${amount} successfully added to your wallet via ${selectedMethod.toUpperCase()}`,
        [
          {
            text: 'OK',
            onPress: () => router.replace('/(tabs)'), // home pe wapas
          },
        ]
      );
      
      // Real app mein yahan payment gateway call hoga (Razorpay, Paytm etc.)
      // Example: router.push({ pathname: '/payment/success', params: { amount, method: selectedMethod } });
    }, 2000);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={28} color="#000" />
          </TouchableOpacity>
          <Text style={styles.title}>Add Money to Wallet</Text>
        </View>

        {/* Current Balance */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Current Wallet Balance</Text>
          <Text style={styles.balanceAmount}>₹ 48,750.00</Text>
        </View>

        {/* Amount Input */}
        <View style={styles.amountSection}>
          <Text style={styles.amountLabel}>Enter Amount (₹)</Text>
          
          <View style={styles.amountInputContainer}>
            <Text style={styles.rupeeSymbol}>₹</Text>
            <TextInput
              style={styles.amountInput}
              value={amount}
              onChangeText={(text) => {
                // Only allow numbers and one decimal
                if (/^\d*\.?\d{0,2}$/.test(text)) {
                  setAmount(text);
                }
              }}
              keyboardType="numeric"
              placeholder="0.00"
              placeholderTextColor="#aaa"
              maxLength={10}
              returnKeyType="done"
            />
            {amount.length > 0 && (
              <TouchableOpacity onPress={() => setAmount('')} style={styles.clearAmount}>
                <Ionicons name="close-circle" size={24} color="#999" />
              </TouchableOpacity>
            )}
          </View>

          {/* Quick Amounts */}
          <View style={styles.quickAmounts}>
            {quickAmounts.map((val) => (
              <TouchableOpacity
                key={val}
                style={[
                  styles.quickBtn,
                  amount === val && styles.quickBtnSelected,
                ]}
                onPress={() => setAmount(val)}
              >
                <Text style={[
                  styles.quickBtnText,
                  amount === val && styles.quickBtnTextSelected,
                ]}>
                  ₹{val}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Payment Methods */}
        <View style={styles.methodsSection}>
          <Text style={styles.sectionTitle}>Select Payment Method</Text>

          <TouchableOpacity
            style={[
              styles.methodCard,
              selectedMethod === 'upi' && styles.selectedMethod,
            ]}
            onPress={() => setSelectedMethod('upi')}
          >
            <View style={styles.methodIcon}>
              <Ionicons name="qr-code-outline" size={28} color="#0066FF" />
            </View>
            <View>
              <Text style={styles.methodTitle}>UPI</Text>
              <Text style={styles.methodSubtitle}>Google Pay, PhonePe, Paytm etc.</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.methodCard,
              selectedMethod === 'card' && styles.selectedMethod,
            ]}
            onPress={() => setSelectedMethod('card')}
          >
            <View style={styles.methodIcon}>
              <Ionicons name="card-outline" size={28} color="#0066FF" />
            </View>
            <View>
              <Text style={styles.methodTitle}>Debit / Credit Card</Text>
              <Text style={styles.methodSubtitle}>Visa, Mastercard, RuPay</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.methodCard,
              selectedMethod === 'bank' && styles.selectedMethod,
            ]}
            onPress={() => setSelectedMethod('bank')}
          >
            <View style={styles.methodIcon}>
              <Ionicons name="business-outline" size={28} color="#0066FF" />
            </View>
            <View>
              <Text style={styles.methodTitle}>Net Banking</Text>
              <Text style={styles.methodSubtitle}>All major banks</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Add Money Button */}
        <KKButton
          title={isLoading ? "Processing..." : "Add Money"}
          onPress={handleAddMoney}
          variant="primary"
          loading={isLoading}
          disabled={isLoading || !amount || !selectedMethod}
          fullWidth
          style={styles.addButton}
        />

        <Text style={styles.note}>
          100% Secure • Powered by Razorpay • Instant & Safe
        </Text>

        <View style={{ height: 60 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderColor: '#f0f0f0',
  },
  backButton: { padding: 8 },
  title: { fontSize: 22, fontWeight: '700', marginLeft: 16, color: '#000' },

  balanceCard: {
    backgroundColor: '#ffffff',
    margin: 16,
    padding: 24,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  balanceLabel: { fontSize: 16, color: '#666666', marginBottom: 8 },
  balanceAmount: { fontSize: 38, fontWeight: 'bold', color: '#000' },

  amountSection: { paddingHorizontal: 16 },
  amountLabel: { fontSize: 18, fontWeight: '600', color: '#333', marginBottom: 12 },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#e0e0e0',
    paddingHorizontal: 16,
    height: 70,
    marginBottom: 16,
  },
  rupeeSymbol: { fontSize: 32, fontWeight: 'bold', color: '#0066FF', marginRight: 12 },
  amountInput: { flex: 1, fontSize: 34, fontWeight: '700', color: '#000' },
  clearAmount: { padding: 8 },

  quickAmounts: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  quickBtn: {
    backgroundColor: '#f0f8ff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#bfdbfe',
    marginBottom: 12,
    minWidth: '45%',
    alignItems: 'center',
  },
  quickBtnSelected: {
    backgroundColor: '#0066FF',
    borderColor: '#0066FF',
  },
  quickBtnText: { fontSize: 16, color: '#0066FF', fontWeight: '600' },
  quickBtnTextSelected: { color: '#fff' },

  methodsSection: { paddingHorizontal: 16, marginBottom: 32 },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#333', marginBottom: 16 },

  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 18,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1.5,
    borderColor: '#e0e0e0',
  },
  selectedMethod: {
    borderColor: '#0066FF',
    borderWidth: 2.5,
    backgroundColor: '#f8fcff',
  },
  methodIcon: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#f0f8ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  methodTitle: { fontSize: 16, fontWeight: '600', color: '#000' },
  methodSubtitle: { fontSize: 13, color: '#666', marginTop: 2 },

  addButton: { marginHorizontal: 16, marginBottom: 16 },

  note: {
    textAlign: 'center',
    color: '#888',
    fontSize: 13,
    marginBottom: 40,
    paddingHorizontal: 24,
  },
});