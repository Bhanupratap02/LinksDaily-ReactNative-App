import {StyleSheet, Text, ScrollView, Alert} from 'react-native';
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

type SignUpScreenProps = NativeStackScreenProps<AuthStackParamList, 'SignUp'>;
export default function SignUp({navigation}: SignUpScreenProps) {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    setLoading(true);
    if (!name && !email && !password) {
      Alert.alert('Please fill all fields');
      setLoading(false);
      return;
    }
    try {
      const {data} = await axios.post(
        'http://10.0.2.2:8000/api/signup/',

        {
          name,
          email,
          password,
        },
      );
      if (data.error) {
        Alert.alert(data.error);
        setLoading(false);
      } else {
        dispatch(setSignIn(data));
        await AsyncStorage.setItem('@auth', JSON.stringify(data));
        setLoading(false);
        Alert.alert('Sign In Successful');
        // navigation.navigate('Home');
      }

      setLoading(false);
      console.log('Sign Up =>', data.data);
    } catch (error) {
      console.log(error, 'error');
      setLoading(false);
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <CIrcleLogo />
      <Text style={styles.headingText}>SignUp</Text>
      <UserInput
        name={'Name'}
        value={name}
        setValue={setName}
        autoCapitalize="words"
      />
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
        autoCompleteType="new-password"
      />
      <SubmitButton
        title="Sign Up"
        handleSubmit={handleSubmit}
        loading={loading}
      />
      <Text style={styles.footerText}>
        Already Joined ?
        <Text
          onPress={() => navigation.navigate('SignIn')}
          style={styles.highlightedText}>
          Sign In
        </Text>
      </Text>
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
  footerText: {
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 16,
  },
  highlightedText: {
    color: '#ff2222',
  },
});
