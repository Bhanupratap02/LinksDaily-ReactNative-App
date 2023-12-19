import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
type TabPamas = {
  name: string;
  text: string;
  handlePress: () => void;
  //   screenName: string;
  routeName: string;
};
export default function Tab({
  name,
  text,
  handlePress,
  routeName,
}: //   screenName,
//   routeName,
TabPamas) {
  const iconColor = text === routeName ? '#ff2222' : '#006992';
  return (
    <TouchableOpacity onPress={handlePress}>
      <FontAwesome5
        style={styles.icon}
        name={name}
        size={25}
        color={iconColor}
      />
      <Text style={{color: iconColor}}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  icon: {
    marginBottom: 3,
    alignSelf: 'center',
  },
});
