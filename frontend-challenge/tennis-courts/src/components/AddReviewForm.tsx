import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface AddReviewFormProps {
  onSubmit: (rating: number, comment: string, author: string) => void;
}

export const AddReviewForm: React.FC<AddReviewFormProps> = ({ onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [author, setAuthor] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (rating === 0) {
      return;
    }
    if (comment.trim() === '') {
      return;
    }
    if (author.trim() === '') {
      return;
    }

    onSubmit(rating, comment.trim(), author.trim());
    
    // Show success feedback
    setSubmitted(true);
    
    // Reset form
    setTimeout(() => {
      setRating(0);
      setComment('');
      setAuthor('');
      setSubmitted(false);
    }, 2000);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity
          key={i}
          onPress={() => setRating(i)}
          activeOpacity={0.7}
          style={styles.starButton}
        >
          <Ionicons
            name={i <= rating ? 'star' : 'star-outline'}
            size={32}
            color="#FFB800"
          />
        </TouchableOpacity>
      );
    }
      
      {submitted && (
        <View style={styles.successMessage}>
          <Ionicons name="checkmark-circle" size={24} color="#2E7D32" />
          <Text style={styles.successText}>Review submitted successfully!</Text>
        </View>
      )}
    return stars;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Your Review</Text>
      
      <Text style={styles.label}>Your Name</Text>
      <TextInput
        style={styles.nameInput}
        value={author}
        onChangeText={setAuthor}
        placeholder="Enter your name"
        placeholderTextColor="#999"
        autoCapitalize="words"
      />

      <Text style={styles.label}>Rating</Text>
      <View style={styles.starsContainer}>{renderStars()}</View>

      <Text style={styles.label}>Your Review</Text>
      <TextInput
        style={styles.commentInput}
        value={comment}
        onChangeText={setComment}
        placeholder="Share your experience..."
        placeholderTextColor="#999"
        multiline={true}
        numberOfLines={4}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} activeOpacity={0.8}>
        <Text style={styles.submitButtonText}>Submit Review</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 24,
  },
  label: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    marginTop: 12,
  },
  nameInput: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1A1A1A',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  starButton: {
    padding: 6,
    marginRight: 8,
  },
  commentInput: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1A1A1A',
    minHeight: 120,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  submitButton: {
    backgroundColor: '#1976D2',
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
    shadowColor: '#1976D2',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  successMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    padding: 14,
    borderRadius: 12,
    marginBottom: 16,
  },
  successText: {
    marginLeft: 10,
    fontSize: 15,
    color: '#2E7D32',
    fontWeight: 'bold',
  },
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});
