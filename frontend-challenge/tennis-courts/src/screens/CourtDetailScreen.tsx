import React, { useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../types/Court';
import { ReviewItem } from '../components/ReviewItem';
import { AddReviewForm } from '../components/AddReviewForm';
import { Review } from '../types/Court';

type Props = NativeStackScreenProps<RootStackParamList, 'CourtDetail'>;

export const CourtDetailScreen: React.FC<Props> = ({ route }) => {
  const { court: initialCourt } = route.params;
  const [reviews, setReviews] = useState<Review[]>(initialCourt.reviews);

  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0;

  const handleAddReview = (rating: number, comment: string) => {
    const newReview: Review = {
      id: `${Date.now()}`,
      author: 'You',
      rating,
      comment,
      date: new Date().toISOString(),
    };
    setReviews([newReview, ...reviews]);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i <= Math.round(rating) ? 'star' : 'star-outline'}
          size={20}
          color="#FFB800"
        />
      );
    }
    return stars;
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Image source={{ uri: initialCourt.image }} style={styles.image} resizeMode="cover" />
      
      <View style={styles.content}>
        <Text style={styles.name}>{initialCourt.name}</Text>
        
        <View style={styles.locationRow}>
          <Ionicons name="location" size={18} color="#666" />
          <Text style={styles.location}>{initialCourt.location}</Text>
        </View>

        <View style={styles.tagsRow}>
          <View style={styles.surfaceTag}>
            <Ionicons name="tennisball" size={14} color="#2E7D32" style={styles.iconMargin} />
            <Text style={styles.surfaceText}>{initialCourt.surface} Court</Text>
          </View>
          {initialCourt.indoor && (
            <View style={styles.indoorTag}>
              <Ionicons name="home" size={14} color="#4A90E2" style={styles.iconMargin} />
              <Text style={styles.indoorText}>Indoor</Text>
            </View>
          )}
        </View>

        {reviews.length > 0 && (
          <View style={styles.ratingSummary}>
            <View style={styles.ratingLeft}>
              <Text style={styles.ratingNumber}>{averageRating.toFixed(1)}</Text>
              <View style={styles.stars}>{renderStars(averageRating)}</View>
              <Text style={styles.reviewsCount}>{reviews.length} review{reviews.length !== 1 ? 's' : ''}</Text>
            </View>
          </View>
        )}

        <View style={styles.reviewsSection}>
          <Text style={styles.sectionTitle}>Reviews</Text>
          {reviews.length === 0 ? (
            <View style={styles.noReviews}>
              <Ionicons name="chatbubble-outline" size={48} color="#CCC" />
              <Text style={styles.noReviewsText}>No reviews yet</Text>
              <Text style={styles.noReviewsSubtext}>Be the first to review this court!</Text>
            </View>
          ) : (
            reviews.map((review) => <ReviewItem key={review.id} review={review} />)
          )}
        </View>

        <AddReviewForm onSubmit={handleAddReview} />
        
        <View style={styles.bottomPadding} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  image: {
    width: '100%',
    height: 320,
    backgroundColor: '#E0E0E0',
  },
  content: {
    padding: 20,
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 14,
    letterSpacing: -0.5,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  location: {
    fontSize: 16,
    color: '#666',
    marginLeft: 6,
    fontWeight: 'normal',
  },
  tagsRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  surfaceTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  surfaceText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  indoorTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    marginLeft: 12,
  },
  indoorText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1976D2',
  },
  ratingSummary: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    marginBottom: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 4,
  },
  ratingLeft: {
    alignItems: 'center',
  },
  ratingNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 8,
  },
  stars: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  reviewsCount: {
    fontSize: 14,
    color: '#666',
    fontWeight: 'normal',
  },
  reviewsSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 16,
  },
  noReviews: {
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: '#FFF',
    borderRadius: 16,
    marginBottom: 16,
  },
  noReviewsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#999',
    marginTop: 16,
  },
  noReviewsSubtext: {
    fontSize: 14,
    color: '#BBB',
    marginTop: 4,
  },
  bottomPadding: {
    height: 40,
  },
  iconMargin: {
    marginRight: 6,
  },
});
