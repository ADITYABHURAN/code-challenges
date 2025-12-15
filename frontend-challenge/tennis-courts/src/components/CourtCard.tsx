import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Court } from '../types/Court';

interface CourtCardProps {
  court: Court;
  onPress: () => void;
}

export const CourtCard: React.FC<CourtCardProps> = ({ court, onPress }) => {
  const averageRating = court.reviews.length > 0
    ? court.reviews.reduce((sum, review) => sum + review.rating, 0) / court.reviews.length
    : 0;

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i <= Math.round(rating) ? 'star' : 'star-outline'}
          size={14}
          color="#FFB800"
        />
      );
    }
    return stars;
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <Image 
        source={{ uri: court.image }} 
        style={styles.image} 
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">{court.name}</Text>
        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={14} color="#666" />
          <Text style={styles.location} numberOfLines={1} ellipsizeMode="tail">{court.location}</Text>
        </View>
        <View style={styles.detailsRow}>
          <View style={styles.surfaceTag}>
            <Text style={styles.surfaceText}>{court.surface}</Text>
          </View>
          {court.indoor && (
            <View style={styles.indoorTag}>
              <Ionicons name="home-outline" size={12} color="#4A90E2" style={styles.iconMargin} />
              <Text style={styles.indoorText}>Indoor</Text>
            </View>
          )}
        </View>
        <View style={styles.ratingRow}>
          <View style={styles.stars}>{renderStars(averageRating)}</View>
          <Text style={styles.reviewCount}>
            ({court.reviews.length} {court.reviews.length === 1 ? 'review' : 'reviews'})
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginHorizontal: 16,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
    backgroundColor: '#E0E0E0',
  },
  content: {
    padding: 18,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  location: {
    fontSize: 15,
    color: '#666',
    marginLeft: 6,
    flex: 1,
  },
  detailsRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  surfaceTag: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  surfaceText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  indoorTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    marginLeft: 8,
  },
  indoorText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1976D2',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stars: {
    flexDirection: 'row',
    marginRight: 8,
  },
  reviewCount: {
    fontSize: 14,
    color: '#666',
    fontWeight: 'normal',
  },
  iconMargin: {
    marginRight: 4,
  },
});
