import {StyleSheet, Image, View} from 'react-native';
import React from 'react';

export default function CircleLogo() {
  return (
    <View style={styles.imageContainer}>
      <Image style={styles.image} source={require('../../assets/logo.webp')} />
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 10,
  },
});
