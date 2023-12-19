import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  View,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import ogs from '@uehreka/open-graph-scraper-react-native';
import urlRegx from 'url-regex-safe';
import FooterTabs from '../components/tabs/FooterTabs';
import SubmitButton from '../components/auth/SubmitButton';
import PreviewCard from '../components/links/PreviewCard';
import {axiosPrivate} from '../axiosConfig';
import {UrlPreview} from '../types/link';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackParamList} from '../navigations/app-navigator';

type PostScreenProps = NativeStackScreenProps<AppStackParamList, 'Post'>;
export default function Post({navigation}: PostScreenProps) {
  const [link, setLink] = useState('');
  const [title, setTitle] = useState('');
  const [ogData, setOgData] = useState<UrlPreview | null>(null);
  const [loading, setLoading] = useState(false);
  const handleChange = (text: string) => {
    try {
      setLoading(true);
      setLink(text);
      if (!urlRegx({strict: false}).test(text)) {
        return;
      }
      ogs({url: text}).then((data: any) => {
        const {result} = data;
        console.log(data);

        // console.log('error:', error);
        if (result && result.success) {
          setOgData(result);
        }
      });

      setLoading(false);
    } catch (error) {
      console.log(error, 'error in handleChange');
      setLoading(false);
    }
  };
  const handleSubmit = async () => {
    if (!link || !title) {
      Alert.alert('Paste a url and give it a nice title');
      return;
    }
    try {
      setLoading(true);
      const {data} = await axiosPrivate.post('/post-link', {
        title,
        link,
        urlPreview: ogData,
      });
      setLoading(false);
      navigation.navigate('Home');
      console.log(data);
      setLink('');
      setTitle('');
      setOgData(null);
    } catch (error) {
      console.log(error, 'error');
      Alert.alert('Error in posting link');
    }
  };
  return (
    <SafeAreaView style={styles.homeContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.Title}>PASTE WEBSITE URL</Text>
        <TextInput
          value={link}
          onChangeText={text => handleChange(text)}
          style={styles.Input}
          placeholder="Website link"
        />
        <TextInput
          autoCapitalize="sentences"
          value={title}
          onChangeText={text => setTitle(text)}
          style={styles.Input}
          placeholder="Give a title"
        />

        {ogData && (
          <View style={styles.resultContainer}>
            <PreviewCard {...ogData} />
          </View>
        )}
        <SubmitButton
          title="Submit"
          loading={loading}
          handleSubmit={handleSubmit}
        />
      </ScrollView>
      <FooterTabs />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  Title: {
    color: 'grey',
    fontSize: 20,
    marginVertical: 20,
    textAlign: 'center',
    paddingTop: 10,
    fontWeight: 'bold',
  },
  Input: {
    height: 60,
    backgroundColor: 'white',
    marginHorizontal: 13,
    marginVertical: 15,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    fontSize: 20,
    paddingHorizontal: 20,
  },
  resultContainer: {
    marginTop: 20,
    marginHorizontal: 30,
  },
});
