// app/(tabs)/Searching.tsx
import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function SearchingScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const popularSearches = [
    'Mobile Recharge',
    'Electricity Bill',
    'Send Money',
    'Credit Card Bill',
    'DTH Recharge',
    'FASTag',
    'Gas Bill',
    'Loan EMI',
  ];

  const handleSearch = (query: string) => {
    if (query.trim() && !recentSearches.includes(query)) {
      setRecentSearches([query, ...recentSearches.slice(0, 4)]);
    }
    setSearchQuery(query);
    // Future: real search logic yahan add kar sakte ho
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Fixed Top Search Bar */}
      <View style={styles.searchBarContainer}>
        <View style={styles.roundIconWrapper}>
          <Ionicons name="search" size={22} color="#ffffff" />
        </View>

        <TextInput
          style={styles.searchInput}
          placeholder="Search bills, recharges, UPI ID, contacts..."
          placeholderTextColor="#b0c4ff"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={() => handleSearch(searchQuery)}
          autoCapitalize="none"
          returnKeyType="search"
          clearButtonMode="never"
          autoCorrect={false}
        />

        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
            <Ionicons name="close-circle" size={24} color="#b0c4ff" />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        style={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Quick Actions - Send & Request Money */}
        <View style={styles.quickActionsContainer}>
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => router.push('/payment/send-money')}
          >
            <View style={[styles.actionIcon, { backgroundColor: '#e8f0ff' }]}>
              <Ionicons name="arrow-up-circle" size={32} color="#0066FF" />
            </View>
            <Text style={styles.actionText}>Send Money</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => router.push('/payment/request-money')}
          >
            <View style={[styles.actionIcon, { backgroundColor: '#e8f5e9' }]}>
              <Ionicons name="arrow-down-circle" size={32} color="#34C759" />
            </View>
            <Text style={styles.actionText}>Request Money</Text>
          </TouchableOpacity>
        </View>

        {/* Content Area */}
        {searchQuery.length > 0 ? (
          <View style={styles.resultsContainer}>
            <Text style={styles.resultsTitle}>Results for "{searchQuery}"</Text>
            {/* Yahan real results FlatList mein daal sakte ho */}
            <View style={styles.noResults}>
              <Ionicons name="search-outline" size={100} color="#e0e7ff" />
              <Text style={styles.noResultsText}>No results found</Text>
              <Text style={styles.noResultsSubText}>
                Try different keywords or check spelling
              </Text>
            </View>
          </View>
        ) : (
          <>
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Recent Searches</Text>
                <View style={styles.suggestionsContainer}>
                  {recentSearches.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.suggestionChip}
                      onPress={() => setSearchQuery(item)}
                    >
                      <Ionicons name="time-outline" size={16} color="#64748b" style={{ marginRight: 6 }} />
                      <Text style={styles.suggestionText}>{item}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            {/* Popular Searches */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Popular Searches</Text>
              <View style={styles.suggestionsContainer}>
                {popularSearches.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.suggestionChip}
                    onPress={() => handleSearch(item)}
                  >
                    <Text style={styles.suggestionText}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Quick Categories */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Quick Categories</Text>
              <View style={styles.categoriesGrid}>
                <TouchableOpacity style={styles.categoryCard}>
                  <View style={styles.categoryIcon}>
                    <Ionicons name="phone-portrait-outline" size={28} color="#0066FF" />
                  </View>
                  <Text style={styles.categoryText}>Recharge</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.categoryCard}>
                  <View style={styles.categoryIcon}>
                    <Ionicons name="flash-outline" size={28} color="#FF9500" />
                  </View>
                  <Text style={styles.categoryText}>Electricity</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.categoryCard}>
                  <View style={styles.categoryIcon}>
                    <Ionicons name="cash-outline" size={28} color="#34C759" />
                  </View>
                  <Text style={styles.categoryText}>UPI Transfer</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.categoryCard}>
                  <View style={styles.categoryIcon}>
                    <Ionicons name="card-outline" size={28} color="#8B5CF6" />
                  </View>
                  <Text style={styles.categoryText}>Credit Card</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },

  // Search Bar - Premium look
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 16,
    paddingHorizontal: 16,
    borderRadius: 30,
    height: 56,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },

  roundIconWrapper: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#0066FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1e293b',
    paddingVertical: 0,
  },

  clearButton: {
    padding: 8,
  },

  scrollContent: {
    flex: 1,
  },

  // Quick Actions - Send & Request
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    marginBottom: 24,
  },

  actionCard: {
    alignItems: 'center',
    width: width / 2 - 32,
    backgroundColor: '#ffffff',
    paddingVertical: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },

  actionIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },

  actionText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1e293b',
  },

  // Sections
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 16,
  },

  suggestionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },

  suggestionChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },

  suggestionText: {
    fontSize: 14,
    color: '#334155',
    fontWeight: '500',
  },

  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  categoryCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },

  categoryIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },

  categoryText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1e293b',
  },

  // No Results
  resultsContainer: {
    paddingHorizontal: 16,
  },

  resultsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 24,
  },

  noResults: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 100,
  },

  noResultsText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#475569',
    marginTop: 24,
    textAlign: 'center',
  },

  noResultsSubText: {
    fontSize: 15,
    color: '#94a3b8',
    marginTop: 8,
    textAlign: 'center',
  },
});