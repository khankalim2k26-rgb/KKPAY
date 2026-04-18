// components/home/QuickActions.tsx
import { StyleSheet, View } from 'react-native';
import KKButton from '@/components/common/KKButton';
import { useRouter } from 'expo-router';

export default function QuickActions() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <KKButton
        title="Send Money"
        onPress={() => router.push('/payment/send-money')}
        style={styles.btn}
      />
      <KKButton
        title="Request Money"
        variant="outline"
        onPress={() => router.push('/payment/request-money')}
        style={styles.btn}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 28,
  },
  btn: {
    flex: 1,
    marginHorizontal: 6,
  },
});