import {StyleSheet, Text, ScrollView, Alert, View} from 'react-native';
import React, {useState} from 'react';
import UserInput from '../components/auth/UserInput';
import SubmitButton from '../components/auth/SubmitButton';
import axios from 'axios';
import CIrcleLogo from '../components/auth/CircleLogo';
import {axiosPublic} from '../axiosConfig';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../navigations/auth-navigator';

type ForgotPasswordScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  'ForgotPassword'
>;
export default function ForgotPassword({
  navigation,
}: ForgotPasswordScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [resetCode, setResetCode] = useState('');
  const handleRequestResetCode = async () => {
    setLoading(true);
    if (!email) {
      Alert.alert('Email is required');
      setLoading(false);
      return;
    }
    try {
      const {data} = await axiosPublic.post('/forgot-password', {
        email,
      });
      if (data.error) {
        Alert.alert(data.error);
        setLoading(false);
      } else {
        setLoading(false);
        setVisible(true);
        Alert.alert('Enter the password reset code we sent in your email');
      }
      console.log('RESET PASSWORD RES => ', data);
    } catch (error) {
      console.log(error);
      Alert.alert('Error sending email. Try again.');
      setLoading(false);
    }
  };
  const handleResetPassword = async () => {
    setLoading(true);
    if (!email && !password && !resetCode) {
      Alert.alert('Please fill all fields');
      setLoading(false);
      return;
    }
    try {
      const {data} = await axios.post('/reset-password', {
        email,
        password,
        resetCode,
      });
      if (data.error) {
        Alert.alert(data.error);
        setLoading(false);
      } else {
        setLoading(false);
        Alert.alert('Now you can login with your new password');
        navigation.navigate('SignIn');
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      Alert.alert('Password reset failed. Try again.');
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <CIrcleLogo />
      <Text style={styles.headingText}>Forgot Password</Text>
      <UserInput
        name={'Email'}
        value={email}
        setValue={setEmail}
        autoCompleteType="email"
        keyboardType="email-address"
      />
      {visible && (
        <>
          <UserInput
            name={'New Password'}
            value={password}
            setValue={setPassword}
            secureTextEntry={true}
            autoCompleteType="new-password"
          />
          <UserInput
            name={'Password Reset Code'}
            value={resetCode}
            setValue={setResetCode}
            secureTextEntry={true}
          />
        </>
      )}
      <SubmitButton
        title={visible ? 'Reset Password' : 'Request Reset Code'}
        handleSubmit={visible ? handleResetPassword : handleRequestResetCode}
        loading={loading}
      />
      <View style={styles.footerContainer}>
        <Text
          style={[styles.highlightedText, styles.footerText]}
          onPress={() => navigation.navigate('SignIn')}>
          Back To Sign In
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
    paddingHorizontal: 10,
  },
});
