import React, { useState, useMemo } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SearchBar } from '../components/SearchBar';
import { CourtCard } from '../components/CourtCard';
import { courts } from '../data/courts';
import { Court, RootStackParamList } from '../types/Court';

type CourtListScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Courts'>;

interface CourtListScreenProps {
  navigation: CourtListScreenNavigationProp;
}

export const CourtListScreen: React.FC<CourtListScreenProps> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourts = useMemo(() => {
    if (searchQuery.trim() === '') {
      return courts;
    }

    const query = searchQuery.toLowerCase();
    return courts.filter(
      (court) =>
        court.name.toLowerCase().includes(query) ||
        court.location.toLowerCase().includes(query) ||
        court.surface.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleCourtPress = (court: Court) => {
    navigation.navigate('CourtDetail', { court });
  };

  const renderItem = ({ item }: { item: Court }) => (
    <CourtCard court={item} onPress={() => handleCourtPress(item)} />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyStateTitle}>No courts found</Text>
      <Text style={styles.emptyStateText}>
        Try adjusting your search criteria
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Tennis Courts</Text>
        <Text style={styles.headerSubtitle}>{filteredCourts.length} courts available</Text>
      </View>
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search by name, location, or surface..."
      />
      <FlatList
        data={filteredCourts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  headerContainer: {
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 8,
    backgroundColor: '#F8F9FA',
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 6,
    letterSpacing: -1,
  },
  headerSubtitle: {
    fontSize: 17,
    color: '#666',
    fontWeight: 'normal',
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyState: {
    paddingTop: 60,
    paddingHorizontal: 40,
    alignItems: 'center',
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
