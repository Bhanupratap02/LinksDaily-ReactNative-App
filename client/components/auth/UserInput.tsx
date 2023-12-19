import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
type UserInputParams = {
  name: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  autoCapitalize?: 'words' | 'none' | 'sentences' | 'characters' | undefined;
  autoCompleteType?: 'email' | 'new-password' | 'current-password' | 'off';
  keyboardType?: 'email-address' | 'default' | undefined;
  secureTextEntry?: boolean;
};
export default function UserInput({
  name,
  value,
  setValue,
  autoCapitalize = 'none',
  keyboardType = 'default',
  secureTextEntry = false,
  autoCompleteType = 'off',
}: UserInputParams) {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{name}</Text>
      <TextInput
        style={styles.textInput}
        value={value}
        onChangeText={text => setValue(text)}
        autoCorrect={false}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        autoComplete={autoCompleteType}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 24,
  },
  inputLabel: {
    fontSize: 17,
    color: '#006992',
  },
  textInput: {
    height: 40,
    borderBottomWidth: 0.7,
    borderBottomColor: '#006992',
    marginBottom: 30,
  },
});
