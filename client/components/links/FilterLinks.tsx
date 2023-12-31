import React from 'react';
import {TextInput, View} from 'react-native';

const FilterLinks = ({
  value,
  setValue,
}: {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <View>
      <TextInput
        style={{
          height: 50,
          paddingHorizontal: 20,
          marginHorizontal: 15,
          marginTop: 20,
          borderRadius: 50,
          borderWidth: 5,
          borderColor: '#d9d9d9',
          backgroundColor: '#e6e6e6',
        }}
        value={value}
        onChangeText={text => setValue(text)}
        placeholder="Search"
        autoCapitalize="none"
      />
    </View>
  );
};

export default FilterLinks;
