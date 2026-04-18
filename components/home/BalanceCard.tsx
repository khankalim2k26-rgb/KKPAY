// components/home/BalanceCard.tsx
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const mockBalance = '₹ 48,750.00';

export default function BalanceCard() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={['#0066FF', '#0040D0', '#0030A0']}
      style={styles.card}
    >
      <Text style={styles.label}>Available Balance</Text>
      <Text style={styles.amount}>{mockBalance}</Text>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => router.push('/payment/add-money')}
        >
          <Ionicons name="add-circle-outline" size={28} color="white" />
          <Text style={styles.btnText}>Add Money</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btn}
          onPress={() => router.push('/scanner/qr-scanner')}
        >
          <Ionicons name="qr-code-outline" size={28} color="white" />
          <Text style={styles.btnText}>Scan & Pay</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 16,
    padding: 24,
    borderRadius: 24,
    elevation: 8,
    shadowColor: '#0066FF',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
  },
  label: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 16,
  },
  amount: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    marginVertical: 12,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  btn: {
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 14,
    marginTop: 6,
    fontWeight: '600',
  },
});