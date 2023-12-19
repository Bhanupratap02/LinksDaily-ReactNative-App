import {StyleSheet, View} from 'react-native';
import React from 'react';
import Tab from './Tab';
import {CommonActions, useNavigation, useRoute} from '@react-navigation/native';

export default function FooterTabs() {
  const navigation = useNavigation();
  const route = useRoute();
  return (
    <View style={styles.parent}>
      <View style={styles.container}>
        <Tab
          name="home"
          text="Home"
          handlePress={() =>
            navigation.dispatch(CommonActions.navigate('Home'))
          }
          routeName={route.name}
        />
        <Tab
          name="plus-square"
          text="Post"
          handlePress={() =>
            navigation.dispatch(CommonActions.navigate('Post'))
          }
          routeName={route.name}
        />
        <Tab
          name="th-list"
          text="Links"
          handlePress={() =>
            navigation.dispatch(CommonActions.navigate('Profile'))
          }
          routeName={route.name}
        />
        <Tab
          name="user-alt"
          text="Account"
          handlePress={() =>
            navigation.dispatch(CommonActions.navigate('Account'))
          }
          routeName={route.name}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 30,
    margin: 10,
    justifyContent: 'space-between',
  },
  parent: {
    marginBottom: 10,
    borderTopWidth: 1,
    borderColor: 'grey',
  },
});
