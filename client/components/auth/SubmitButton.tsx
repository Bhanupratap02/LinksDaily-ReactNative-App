import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
type SubmitButtonParams = {
  handleSubmit: () => void;
  title: string;
  loading: boolean;
};
export default function SubmitButton({
  title,
  handleSubmit,
  loading,
}: SubmitButtonParams): JSX.Element {
  return (
    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
      <Text style={styles.buttonText}>
        {loading ? 'Please wait...' : title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#006992',
    padding: 13,
    marginHorizontal: 22,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
});
