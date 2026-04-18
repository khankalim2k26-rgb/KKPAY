// app/(tabs)/index.tsx
import { ScrollView, StyleSheet, View } from 'react-native';
import BalanceCard from '@/components/home/BalanceCard';
import QuickActions from '@/components/home/QuickActions';
import ServiceGrid from '@/components/home/ServiceGrid';
import MiniUtilityCard from '@/components/home/MiniUtilityCard';
import SectionHeader from '@/components/home/SectionHeader';
import TransactionItem from '@/components/home/TransactionItem';

const mockBalance = '₹ 48,750.00';

const recentTransactions = [
  { id: '1', name: 'Rahul Kumar', amount: '-₹ 1,200', time: '10 min ago', type: 'sent' },
  { id: '2', name: 'Salary Credit', amount: '+₹ 35,000', time: 'Yesterday', type: 'received' },
  { id: '3', name: 'Zomato Order', amount: '-₹ 450', time: '2 days ago', type: 'sent' },
  { id: '4', name: 'Friend Request', amount: '+₹ 500', time: '3 days ago', type: 'received' },
];

const rechargeItems = [
  { title: 'Mobile Recharge', icon: 'phone-portrait-outline', route: '/recharges/mobile' },
  { title: 'DTH / Cable TV', icon: 'tv-outline', route: '/recharges/dth' },
  { title: 'FASTag Recharge', icon: 'car-outline', route: '/recharges/fastag' },
  { title: 'Metro Card Recharge', icon: 'train-outline', route: '/recharges/metro' },
  { title: 'Broadband / Landline', icon: 'wifi-outline', route: '/recharges/broadband' },
  { title: 'Bus Pass / Ticket', icon: 'bus-outline', route: '/recharges/bus' },
];

const billPaymentItems = [
  { title: 'Electricity Bill', icon: 'flash-outline', route: '/bills/electricity' },
  { title: 'Water Bill', icon: 'water-outline', route: '/bills/water' },
  { title: 'Gas Cylinder (LPG)', icon: 'flame-outline', route: '/bills/gas' },
  { title: 'Credit Card Bill', icon: 'card-outline', route: '/bills/credit-card' },
  { title: 'Loan EMI', icon: 'cash-outline', route: '/bills/loan-emi' },
  { title: 'Insurance Premium', icon: 'shield-outline', route: '/bills/insurance' },
  { title: 'Municipal / Property Tax', icon: 'business-outline', route: '/bills/property-tax' },
  { title: 'Housing Society Maintenance', icon: 'home-outline', route: '/bills/society-maintenance' },
  { title: 'LIC Premium', icon: 'heart-outline', route: '/bills/lic' },
  { title: 'School / College Fee', icon: 'school-outline', route: '/bills/education-fee' },
];

const loanItems = [
  { title: 'Home Loan', icon: 'home-outline' },
  { title: 'Education Loan', icon: 'school-outline' },
  { title: 'Car Loan', icon: 'car-sport-outline' },
  { title: 'Personal Loan', icon: 'wallet-outline' },
];

const utilityItems = [
  { title: 'History', icon: 'time-outline', color: '#0066FF' },
  { title: 'Check Balance', icon: 'wallet-outline', color: '#34C759' },
  { title: 'CIBIL Score', icon: 'shield-checkmark-outline', color: '#FF9500' },
  { title: 'Passbook', icon: 'book-outline', color: '#5856D6' },
];

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* 1. Balance Card */}
      <BalanceCard />

      {/* 2. Quick Actions */}
      <QuickActions />

      {/* 3. Recharges Section */}
      <View style={styles.section}>
        <SectionHeader title="Recharges" showSeeAll={false} />
        <ServiceGrid items={rechargeItems} iconColor="#0066FF" />
      </View>

      {/* 4. Bill Payments Section */}
      <View style={styles.section}>
        <SectionHeader title="Bill Payments" showSeeAll={false} />
        <ServiceGrid items={billPaymentItems} iconColor="#8B5CF6" /> {/* purple for distinction */}
      </View>

      {/* 5. Loans & Credit */}
      <View style={styles.section}>
        <SectionHeader title="Loans & Credit" showSeeAll={false} />
        <ServiceGrid items={loanItems} iconColor="#FF9500" />
      </View>

      {/* 6. Quick Services */}
      <View style={styles.section}>
        <SectionHeader title="Quick Services" showSeeAll={false} />
        <View style={styles.utilityContainer}>
          {utilityItems.map((item, index) => (
            <MiniUtilityCard key={index} {...item} />
          ))}
        </View>
      </View>

      {/* 7. Recent Transactions – sabse neeche */}
      <View style={styles.section}>
        <SectionHeader title="Recent Activity" showSeeAll={true} />
        {recentTransactions.map((tx) => (
          <TransactionItem key={tx.id} transaction={tx} />
        ))}
      </View>

      <View style={{ height: 100 }} /> {/* extra bottom padding */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  utilityContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});