import {StyleSheet, Text, ScrollView, Alert, View} from 'react-native';
import React, {useState} from 'react';
import UserInput from '../components/auth/UserInput';
import SubmitButton from '../components/auth/SubmitButton';
import axios from 'axios';
import CIrcleLogo from '../components/auth/CircleLogo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';

import {setSignIn} from '../redux/slices/authSlice';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../navigations/auth-navigator';

type SignInScreenProps = NativeStackScreenProps<AuthStackParamList, 'SignIn'>;
export default function SignIn({navigation}: SignInScreenProps) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    setLoading(true);
    if (!email && !password) {
      Alert.alert('Please fill all fields');
      setLoading(false);
      return;
    }
    try {
      console.log('got it', email, password);

      const {data} = await axios.post('http://10.0.2.2:8000/api/signin', {
        email,
        password,
      });
      if (data.error) {
        Alert.alert(data.error);
        setLoading(false);
      } else {
        dispatch(setSignIn(data));
        await AsyncStorage.setItem('@auth', JSON.stringify(data));
        setLoading(false);
        Alert.alert('Sign In Successful');
      }

      console.log('Sign In response =>', data);
    } catch (error) {
      console.log(error);
      setLoading(false);
      Alert.alert('Sign In Failed');
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <CIrcleLogo />
      <Text style={styles.headingText}>SignIn</Text>
      <UserInput
        name={'Email'}
        value={email}
        setValue={setEmail}
        autoCompleteType="email"
        keyboardType="email-address"
      />
      <UserInput
        name={'Password'}
        value={password}
        setValue={setPassword}
        secureTextEntry={true}
        autoCompleteType="current-password"
      />
      <SubmitButton
        title="Sign In"
        handleSubmit={handleSubmit}
        loading={loading}
      />
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>
          Not yet registered ?
          <Text
            style={styles.highlightedText}
            onPress={() => navigation.navigate('SignUp')}>
            Sign Up
          </Text>
        </Text>
        <Text
          style={[styles.footerText, styles.highlightedText]}
          onPress={() => navigation.navigate('ForgotPassword')}>
          Forgot Password
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    // paddingHorizontal: 24,
  },
  headingText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#006992',
    textAlign: 'center',
  },
  footerContainer: {
    marginTop: 15,
    gap: 5,
  },
  footerText: {
    textAlign: 'center',
    fontSize: 16,
  },
  highlightedText: {
    color: '#ff2222',
  },
});
