import React, {useEffect, useState} from 'react';
import {WebView} from 'react-native-webview';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackParamList} from '../navigations/app-navigator';

type LinkViewScreenProps = NativeStackScreenProps<
  AppStackParamList,
  'LinkView'
>;
export default function LinkView({route}: LinkViewScreenProps) {
  const [weblink, setWeblink] = useState('');

  useEffect(() => {
    if (route.params?.link) {
      if (route.params.link.link.includes('http' || 'https')) {
        setWeblink(route.params.link.link);
      } else {
        setWeblink(`http://${route.params.link.link}`);
      }
    }
  }, [route.params?.link]);

  return <WebView startInLoadingState source={{uri: weblink}} />;
}
