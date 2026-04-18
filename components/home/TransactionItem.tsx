// components/home/TransactionItem.tsx
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Transaction = {
  id: string;
  name: string;          // e.g. "Rahul Kumar" or "Salary Credit"
  amount: string;        // e.g. "-₹ 1,200" or "+₹ 35,000"
  time: string;          // e.g. "10 min ago"
  type: 'sent' | 'received';  // ya 'debit' / 'credit'
  icon?: string;         // optional override
};

interface Props {
  transaction: Transaction;
}

export default function TransactionItem({ transaction }: Props) {
  const isSent = transaction.type === 'sent';
  const iconName = transaction.icon || (isSent ? 'arrow-up' : 'arrow-down');
  const iconColor = isSent ? '#ef4444' : '#10b981'; // red for sent, green for received

  return (
    <View style={styles.container}>
      {/* Left side: Icon + Name + Time */}
      <View style={styles.left}>
        <View style={[
          styles.iconWrapper,
          { backgroundColor: isSent ? '#fee2e2' : '#ecfdf5' } // light red / light green bg
        ]}>
          <Ionicons name={iconName} size={22} color={iconColor} />
        </View>

        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={1}>
            {transaction.name}
          </Text>
          <Text style={styles.time}>{transaction.time}</Text>
        </View>
      </View>

      {/* Right side: Amount */}
      <Text style={[
        styles.amount,
        isSent ? styles.amountSent : styles.amountReceived
      ]}>
        {transaction.amount}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },

  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  info: {
    marginLeft: 14,
    flex: 1,
  },

  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },

  time: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 3,
  },

  amount: {
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'right',
  },

  amountSent: {
    color: '#ef4444', // red
  },

  amountReceived: {
    color: '#10b981', // green
  },
});