// app/scanner/qr-scanner.tsx
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function QRScanner() {
  const router = useRouter();
  const [manualUpiVisible, setManualUpiVisible] = useState(false);
  const [upiId, setUpiId] = useState('');

  const handleManualUpi = () => {
    if (!upiId.trim()) {
      Alert.alert('Error', 'Please enter UPI ID');
      return;
    }
    // Yahan real payment flow start kar sakte ho
    Alert.alert('Success', `Request sent to ${upiId}`);
    setManualUpiVisible(false);
    setUpiId('');
    // router.push('/payment/confirm?upi=' + upiId); // real mein yeh use kar sakte ho
  };

  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={28} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.title}>Scan QR Code</Text>
        <View style={{ width: 28 }} /> {/* placeholder for balance */}
      </View>

      {/* Scanner Area */}
      <View style={styles.scannerArea}>
        <View style={styles.scannerFrame}>
          <Ionicons name="qr-code-outline" size={120} color="#00ff88" style={styles.qrIcon} />
          <Text style={styles.scannerText}>Align QR code within the frame</Text>
        </View>
      </View>

      {/* Instructions & Flash */}
      <View style={styles.instructions}>
        <Text style={styles.instructionText}>
          Ensure the QR code is well-lit and fully visible within the frame.
        </Text>

        <TouchableOpacity style={styles.flashBtn}>
          <Ionicons name="flash-outline" size={28} color="#0066FF" />
          <Text style={styles.flashText}>Flash On</Text>
        </TouchableOpacity>
      </View>

      {/* Manual UPI Entry Button */}
      <TouchableOpacity 
        style={styles.manualBtn}
        onPress={() => setManualUpiVisible(true)}
      >
        <Ionicons name="keypad-outline" size={24} color="#fff" />
        <Text style={styles.manualText}>Enter UPI ID Manually</Text>
      </TouchableOpacity>

      {/* Manual UPI Modal/Input (simple overlay style) */}
      {manualUpiVisible && (
        <View style={styles.manualOverlay}>
          <View style={styles.manualCard}>
            <Text style={styles.manualTitle}>Enter UPI ID</Text>
            <Text style={styles.manualSubTitle}>e.g. username@upi</Text>

            <View style={styles.upiInputContainer}>
              <Ionicons name="at-outline" size={24} color="#0066FF" style={{ marginRight: 12 }} />
              <TextInput
                style={styles.upiInput}
                value={upiId}
                onChangeText={setUpiId}
                placeholder="yourname@upi"
                placeholderTextColor="#aaa"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={styles.manualActions}>
              <TouchableOpacity 
                style={styles.cancelBtn}
                onPress={() => setManualUpiVisible(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <KKButton
                title="Proceed"
                onPress={handleManualUpi}
                style={styles.proceedBtn}
              />
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  backButton: {
    padding: 12,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  title: { fontSize: 20, fontWeight: '700', color: '#fff' },

  scannerArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scannerFrame: {
    width: 280,
    height: 280,
    borderWidth: 4,
    borderColor: '#00ff88',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,255,136,0.1)',
  },
  qrIcon: { opacity: 0.9 },
  scannerText: { color: '#fff', fontSize: 16, textAlign: 'center', marginTop: 16 },

  instructions: {
    padding: 24,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  instructionText: { fontSize: 16, color: '#333', marginBottom: 16, textAlign: 'center' },
  flashBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f8ff',
    padding: 16,
    borderRadius: 12,
  },
  flashText: { marginLeft: 12, fontSize: 16, color: '#0066FF', fontWeight: '600' },

  manualBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0066FF',
    padding: 18,
    margin: 24,
    borderRadius: 16,
  },
  manualText: { color: 'white', fontSize: 18, fontWeight: '600', marginLeft: 12 },

  // Manual UPI Overlay
  manualOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  manualCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    width: '90%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  manualTitle: { fontSize: 22, fontWeight: '700', marginBottom: 8 },
  manualSubTitle: { fontSize: 14, color: '#666', marginBottom: 24 },
  upiInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 24,
  },
  upiInput: { flex: 1, fontSize: 16, color: '#000' },
  manualActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelBtn: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    marginRight: 12,
  },
  cancelText: { fontSize: 16, fontWeight: '600', color: '#334155' },
  proceedBtn: { flex: 1 },
});