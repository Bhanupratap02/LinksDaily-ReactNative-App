import React, {useState} from 'react';
import {
  View,
  Text,
  //   Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import {axiosPrivate} from '../axiosConfig';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {selectUser} from '../redux/slices/authSlice';

const ChangePassword = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigation();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    setLoading(true);
    if (!password && !confirmPassword) {
      setLoading(false);
      Alert.alert('Please all the fields');
      return;
    }
    if (password !== confirmPassword) {
      setLoading(false);
      Alert.alert('Passwords do not match');
      return;
    }
    try {
      const {data} = await axiosPrivate.post('/update-password', {
        password,
      });
      if (data.error) {
        Alert.alert(data.error);
        setLoading(false);
      } else {
        Alert.alert('👍 Password updated');
        setPassword('');
        setLoading(false);
        navigate.dispatch(CommonActions.navigate('Home'));
      }
      setLoading(false);
    } catch (error) {
      Alert.alert('Password update failed. Try again.');
      console.log(error, 'error in chnaging password');
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        {user?.image?.url ? (
          <Image
            style={styles.logo}
            source={{
              uri: user?.image?.url,
            }}
          />
        ) : (
          <Image style={styles.logo} source={require('../assets/avatar.png')} />
        )}
      </View>
      <Text style={styles.title}>Change Password</Text>
      <Text style={styles.description}>
        Password and Confirm Password must have same value
      </Text>
      <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder="Enter New Password"
          keyboardType="default"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
          autoCorrect={false}
          autoComplete="new-password"
        />
      </View>
      <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          keyboardType="default"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          autoCorrect={false}
          autoComplete="new-password"
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>
          {loading ? 'Please wait...' : 'Submit'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  logoContainer: {
    overflow: 'hidden',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  description: {
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    width: '80%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    shadowColor: '#00CED1',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    fontSize: 18,
  },
  button: {
    backgroundColor: '#006992',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '80%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ChangePassword;
