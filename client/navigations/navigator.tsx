import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './app-navigator';
import AuthNavigator from './auth-navigator';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectIsLoggedIn,
  selectToken,
  setSignIn,
  setSignOut,
} from '../redux/slices/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import {axiosPrivate} from '../axiosConfig';
const AppRoute = () => {
  let isLoggedIn = useSelector(selectIsLoggedIn);

  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  useEffect(() => {
    const loadAsyncStorageData = async () => {
      try {
        const data = await AsyncStorage.getItem('@auth');
        if (data != null) {
          const userData = JSON.parse(data);
          dispatch(setSignIn(userData));
          axiosPrivate.defaults.headers.common.Authorization = `Bearer ${token}`;
        } else {
        }
      } catch (error) {
        // error reading value
        console.log(error, 'error from redaing async stoarge');
        Alert.alert('Unable to get data from async stoarge');
      }
    };
    loadAsyncStorageData();
  }, [dispatch, token]);

  axiosPrivate.interceptors.response.use(
    async function (response) {
      return response;
    },
    async function (error) {
      let res = error.response;
      if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
        await AsyncStorage.removeItem('@auth');
        dispatch(setSignOut());
      }
    },
  );
  return (
    <NavigationContainer>
      {/* Conditional stack navigator rendering based on login state */}
      {isLoggedIn ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppRoute;
