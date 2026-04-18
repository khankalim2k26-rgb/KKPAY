// app/(auth)/login.tsx - Improved Premium UPI-style Login Screen
import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import KKInput from '@/components/common/KKInput';
import KKButton from '@/components/common/KKButton';
import { authService } from '@/services/authService';

export default function LoginScreen() {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSendOtp = async () => {
    if (phone.length !== 10) {
      Alert.alert('Invalid Number', 'Please enter a valid 10-digit mobile number');
      return;
    }

    setLoading(true);

    try {
      const formattedPhone = `+91${phone}`;
      const response = await authService.sendOtp(formattedPhone);

      if (response.success) {
        router.push({
          pathname: '/(auth)/otp',
          params: { phone: formattedPhone },
        });
      } else {
        Alert.alert('Failed', response.message || 'Unable to send OTP. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardView}
    >
      <View style={styles.container}>
        {/* Header / Branding */}
        <View style={styles.header}>
          <Ionicons name="wallet" size={64} color="#0066FF" />
          <Text style={styles.appName}>KKPAY</Text>
          <Text style={styles.tagline}>India's Fastest & Safest UPI</Text>
        </View>

        {/* Main Content */}
        <View style={styles.formContainer}>
          <Text style={styles.title}>Get Started</Text>
          <Text style={styles.subtitle}>
            Enter your mobile number to receive an OTP
          </Text>

          <KKInput
            label="Mobile Number"
            placeholder="98765 43210"
            value={phone}
            onChangeText={(text) => setPhone(text.replace(/\D/g, '').slice(0, 10))}
            keyboardType="phone-pad"
            maxLength={10}
            autoFocus
            containerStyle={styles.inputContainer}
            rightIcon="call-outline"
          />

          <KKButton
            title="Send OTP"
            onPress={handleSendOtp}
            loading={loading}
            disabled={phone.length !== 10 || loading}
            variant="primary"
            style={styles.sendButton}
          />

          <TouchableOpacity style={styles.terms}>
            <Text style={styles.termsText}>
              By continuing, you agree to our{' '}
              <Text style={styles.link}>Terms & Conditions</Text> and{' '}
              <Text style={styles.link}>Privacy Policy</Text>
            </Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>Powered by KKPay • RBI Authorized</Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  container: {
    flex: 1,
    paddingHorizontal: 28,
    justifyContent: 'space-between',
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginTop: 80,
  },
  appName: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#0066FF',
    marginTop: 12,
    letterSpacing: 2,
  },
  tagline: {
    fontSize: 16,
    color: '#555',
    marginTop: 4,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
    lineHeight: 24,
  },
  inputContainer: {
    marginBottom: 28,
  },
  sendButton: {
    marginTop: 12,
  },
  terms: {
    marginTop: 24,
    alignItems: 'center',
  },
  termsText: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    lineHeight: 20,
  },
  link: {
    color: '#0066FF',
    fontWeight: '600',
  },
  footer: {
    fontSize: 13,
    color: '#999',
    textAlign: 'center',
  },
});