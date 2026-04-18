// app/payment/confirm.tsx
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function PaymentConfirm() {
  const router = useRouter();
  const { amount, method } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Confirm Payment</Text>
      </View>

      <View style={styles.content}>
        <Ionicons name="checkmark-circle" size={100} color="#34C759" />
        <Text style={styles.successText}>Payment Successful!</Text>
        <Text style={styles.details}>
          Amount: ₹{amount || '0'}
        </Text>
        <Text style={styles.details}>
          Method: {method ? method.toString().toUpperCase() : 'Unknown'}
        </Text>

        <TouchableOpacity 
          style={styles.doneBtn}
          onPress={() => router.replace('/(tabs)')}
        >
          <Text style={styles.doneText}>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#fff', borderBottomWidth: 1, borderColor: '#eee' },
  title: { fontSize: 20, fontWeight: '700', marginLeft: 16 },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  successText: { fontSize: 28, fontWeight: 'bold', color: '#34C759', marginTop: 24 },
  details: { fontSize: 18, color: '#333', marginTop: 16 },
  doneBtn: { backgroundColor: '#0066FF', paddingVertical: 16, paddingHorizontal: 40, borderRadius: 12, marginTop: 40 },
  doneText: { color: 'white', fontSize: 18, fontWeight: '600' },
});