// app/(auth)/create-pin.tsx
import { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import KKInput from '@/components/common/KKInput';
import KKButton from '@/components/common/KKButton';
import { useAuthStore } from '@/store/authStore';

export default function CreatePin() {
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { completeLogin } = useAuthStore(); // ✅ completeLogin import karo

  const handleSetPin = () => {
    if (pin.length !== 4 || confirmPin.length !== 4) {
      Alert.alert('Error', 'PIN must be 4 digits');
      return;
    }
    if (pin !== confirmPin) {
      Alert.alert('Error', 'PINs do not match');
      return;
    }

    setLoading(true);
    
    // Simulate API call to save PIN
    setTimeout(() => {
      // ✅ completeLogin() call karo - isAuthenticated = true ho jayega
      completeLogin();
      
      // ✅ FIR home par jao
      router.replace('/(tabs)');
      
      setLoading(false);
    }, 1200);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set 4-Digit PIN</Text>
      <Text style={styles.subtitle}>For quick & secure payments</Text>

      <KKInput
        label="Enter PIN"
        value={pin}
        onChangeText={setPin}
        keyboardType="number-pad"
        maxLength={4}
        secureTextEntry
        containerStyle={{ marginVertical: 20 }}
      />

      <KKInput
        label="Confirm PIN"
        value={confirmPin}
        onChangeText={setConfirmPin}
        keyboardType="number-pad"
        maxLength={4}
        secureTextEntry
        containerStyle={{ marginBottom: 40 }}
      />

      <KKButton title="Set PIN" onPress={handleSetPin} loading={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 32, backgroundColor: '#fff', justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#666', textAlign: 'center', marginTop: 8, marginBottom: 40 },
});