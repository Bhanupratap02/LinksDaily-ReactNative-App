import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {UrlPreview} from '../../types/link';
// type PreviewCardParams = {
//   ogTitle: string;
//   ogDescription: string;
//   ogImage: {
//     url: string;
//   };
// };
export default function PreviewCard({
  ogTitle = 'Untitled',
  ogDescription = 'No description',
  ogImage = {url: 'https://placehold.jp/006699/cccc00/150x100.jpg'},
}: UrlPreview) {
  return (
    <View style={styles.cardContainer}>
      <Image source={{uri: ogImage?.url}} style={styles.image} />
      <View style={styles.metaContainer}>
        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.title}>
          {ogTitle}
        </Text>
        <Text numberOfLines={3} ellipsizeMode="tail" style={styles.desc}>
          {ogDescription}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    width: '100%',
    height: 300, // Adjusted height
    borderRadius: 14,
    overflow: 'hidden', // Ensure content inside the borderRadius is not visible
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2, // Android shadow
    marginBottom: 20,
  },
  metaContainer: {
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 3,
  },
  desc: {
    fontSize: 14,
    color: '#666',
  },
  image: {
    height: '60%',
    width: '100%',
    resizeMode: 'cover',
  },
});
