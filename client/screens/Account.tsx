import React, {useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {selectUser} from '../redux/slices/authSlice';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setSignOut} from '../redux/slices/authSlice';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {launchImageLibrary} from 'react-native-image-picker';
import {axiosPrivate} from '../axiosConfig';
export default function Account() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const navigation = useNavigation();
  const [imageToUpload, setImageToUpload] = useState('');
  const handleSignOut = async () => {
    try {
      await AsyncStorage.removeItem('@auth');
      dispatch(setSignOut());
    } catch (error) {
      console.log(error, 'error in removing token from async storage');
    }
  };

  const handleUpload = async () => {
    try {
      const image = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0,
        includeBase64: true,
      });
      if (image.didCancel) {
        return;
      }
      if (!image.assets) {
        return;
      }
      const base64Image = `data:image/jpg;base64,${image?.assets[0].base64}`;
      setImageToUpload(base64Image);
      const {data} = await axiosPrivate.post('/upload-image', {
        image: base64Image,
      });
      console.log('uploaded response', data);
      const auth = JSON.parse((await AsyncStorage.getItem('@auth')) as string);
      auth.user = data;
      await AsyncStorage.setItem('@auth', JSON.stringify(auth));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.conatiner}>
      <View style={styles.header}></View>
      {user?.image?.url ? (
        <Image style={styles.avatar} source={{uri: user?.image?.url}} />
      ) : imageToUpload ? (
        <Image source={{uri: imageToUpload}} style={styles.avatar} />
      ) : (
        <Image style={styles.avatar} source={require('../assets/avatar.png')} />
      )}

      <TouchableOpacity style={styles.camera} onPress={handleUpload}>
        <FontAwesome5Icon name="camera" size={25} color={'white'} />
      </TouchableOpacity>

      <View style={styles.body}>
        <View style={styles.bodyContent}>
          <View>
            <View>
              <Text>Name:</Text>
              <Text style={styles.name}>{user?.name}</Text>
            </View>
            <View>
              <Text>Email:</Text>
              <Text style={styles.email}>{user?.email}</Text>
            </View>
          </View>
          <View style={{paddingTop: 40}}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() =>
                navigation.dispatch(CommonActions.navigate('ChangePassword'))
              }>
              <Text style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>
                Change Password
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer}>
              <Text
                style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}
                onPress={handleSignOut}>
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  conatiner: {},
  header: {
    backgroundColor: '#006992',
    height: 200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 130,
    backgroundColor: 'transparent',
  },

  body: {
    marginTop: 40,
  },
  bodyContent: {
    alignItems: 'center',
    padding: 30,
  },

  email: {
    fontSize: 19,
    color: 'black',
    fontWeight: '500',
    fontStyle: 'italic',
  },
  name: {
    fontSize: 19,
    color: 'black',
    fontWeight: '600',
    fontStyle: 'italic',
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 30,
    backgroundColor: '#006992',
    paddingVertical: 18,
    paddingHorizontal: 100,
  },
  camera: {
    borderRadius: 50,
    borderWidth: 3,
    borderColor: 'white',
    color: 'white',
    position: 'absolute',
    marginTop: 130,
    marginLeft: 240,
    backgroundColor: '#006992',
    paddingVertical: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
});
