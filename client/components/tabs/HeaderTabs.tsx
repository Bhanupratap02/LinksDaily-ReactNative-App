import {SafeAreaView, TouchableOpacity} from 'react-native';
import Ionicon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
export default function HeaderTabs() {
  const navigation = useNavigation();
  const handleNavigation = () => {
    navigation.navigate('Trending');
  };
  return (
    <SafeAreaView>
      <TouchableOpacity onPress={handleNavigation}>
        <Ionicon name="whatshot" size={30} color={'#006992'} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
