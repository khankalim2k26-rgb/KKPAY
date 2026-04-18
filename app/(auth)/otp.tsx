// app/(auth)/otp.tsx - Premium OTP Verification Screen with PIN Flow
import { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import KKButton from '@/components/common/KKButton';
import { useAuthStore } from '@/store/authStore';
import { authService } from '@/services/authService';

export default function OtpScreen() {
  const { phone } = useLocalSearchParams<{ phone: string }>();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const inputs = useRef<TextInput[]>([]);
  const router = useRouter();
  const { verifyOtp } = useAuthStore(); // ✅ verifyOtp use kar rahe hain

  useEffect(() => {
    if (inputs.current[0]) {
      inputs.current[0].focus();
    }
  }, []);

  const handleChange = (text: string, index: number) => {
    if (text.length > 1) text = text[text.length - 1];
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = ({ nativeEvent }: any, index: number) => {
    if (nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
  const otpValue = otp.join('');

  if (otpValue.length !== 6) {
    Alert.alert('Incomplete OTP', 'Please enter all 6 digits');
    return;
  }

  setLoading(true);

  try {
    const success = await verifyOtp(phone || '', otpValue);

    if (success) {
      router.replace('/(auth)/create-pin');
    } else {
      Alert.alert('Invalid OTP', 'Incorrect OTP');
    }
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};
  const handleResend = async () => {
    setResendLoading(true);

    try {
      const response = await authService.sendOtp(phone || '');
      if (response.success) {
        Alert.alert('Success', 'New OTP has been sent to your number.');
        setOtp(['', '', '', '', '', '']);
        inputs.current[0]?.focus();
      } else {
        Alert.alert('Failed', response.message || 'Could not resend OTP.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to resend OTP. Please check your connection.');
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardView}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={28} color="#000" />
          </TouchableOpacity>
          <Text style={styles.title}>Verify OTP</Text>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.subtitle}>
            Enter the 6-digit OTP sent to{'\n'}
            <Text style={styles.phone}>{phone}</Text>
          </Text>

          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => ref && (inputs.current[index] = ref)}
                style={[
                  styles.otpBox,
                  digit ? styles.otpBoxFilled : null,
                ]}
                value={digit}
                onChangeText={(text) => handleChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                keyboardType="number-pad"
                maxLength={1}
                autoFocus={index === 0}
                selectTextOnFocus
              />
            ))}
          </View>

          <KKButton
            title="Verify & Continue"
            onPress={handleVerify}
            loading={loading}
            disabled={otp.some((d) => !d) || loading}
            style={styles.verifyButton}
          />

          <View style={styles.resendContainer}>
            <Text style={styles.resendText}>Didn't receive OTP?</Text>
            <TouchableOpacity onPress={handleResend} disabled={resendLoading}>
              {resendLoading ? (
                <ActivityIndicator size="small" color="#0066FF" />
              ) : (
                <Text style={styles.resendLink}>Resend OTP</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
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
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 48,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginLeft: 16,
    color: '#000',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  phone: {
    fontWeight: '600',
    color: '#0066FF',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  otpBox: {
    width: 52,
    height: 60,
    borderWidth: 1.5,
    borderColor: '#D0D0D0',
    borderRadius: 12,
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#fff',
    color: '#000',
  },
  otpBoxFilled: {
    borderColor: '#0066FF',
    backgroundColor: '#F0F7FF',
  },
  verifyButton: {
    marginBottom: 24,
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resendText: {
    fontSize: 15,
    color: '#666',
  },
  resendLink: {
    fontSize: 15,
    color: '#0066FF',
    fontWeight: '600',
    marginLeft: 8,
  },
});