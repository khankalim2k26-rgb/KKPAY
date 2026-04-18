// app/payment/request-money.tsx
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function RequestMoney() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Request Money</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.heading}>Request Money from Anyone</Text>
        <Text style={styles.subHeading}>Share UPI ID or Scan to Request</Text>

        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={24} color="#34C759" />
          <Text style={styles.inputPlaceholder}>From: UPI ID / Phone / Name</Text>
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="cash-outline" size={24} color="#34C759" />
          <Text style={styles.inputPlaceholder}>Amount</Text>
        </View>

        <TouchableOpacity style={styles.requestButton}>
          <Text style={styles.requestButtonText}>Request Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderColor: '#eee' },
  title: { fontSize: 20, fontWeight: '700', marginLeft: 16 },
  content: { flex: 1, padding: 24 },
  heading: { fontSize: 28, fontWeight: 'bold', marginBottom: 8 },
  subHeading: { fontSize: 16, color: '#666', marginBottom: 32 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 16, borderWidth: 1, borderColor: '#ddd' },
  inputPlaceholder: { marginLeft: 12, fontSize: 16, color: '#888' },
  requestButton: { backgroundColor: '#34C759', padding: 18, borderRadius: 12, alignItems: 'center', marginTop: 24 },
  requestButtonText: { color: 'white', fontSize: 18, fontWeight: '600' },
});