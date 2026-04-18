// components/home/ServiceGrid.tsx
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type Item = {
  title: string;
  icon: string;
  route?: string;
};

type Props = {
  items: Item[];
  iconColor?: string;
};

export default function ServiceGrid({ items, iconColor = '#0066FF' }: Props) {
  const router = useRouter();

  return (
    <View style={styles.grid}>
      {items.map((item, i) => (
        <TouchableOpacity
          key={i}
          style={styles.item}
          onPress={() => item.route && router.push(item.route)}
        >
          <Ionicons name={item.icon as any} size={32} color={iconColor} />
          <Text style={styles.itemText}>{item.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  item: {
    width: '23%',               // 4 items per row
    alignItems: 'center',
    marginBottom: 20,
  },
  itemText: {
    marginTop: 8,
    fontSize: 13,
    color: '#333',
    textAlign: 'center',
    lineHeight: 18,
  },
});