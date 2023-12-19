import {
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Image,
  TouchableHighlight,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FooterTabs from '../components/tabs/FooterTabs';
import {useDispatch, useSelector} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import {
  fetchLinks,
  resetErrorAsync,
  selectError,
  selectLinks,
  selectLoading,
  updateViewCount,
} from '../redux/slices/linkSlice';
import {RootState} from '../redux/store';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackParamList} from '../navigations/app-navigator';
import PreviewCard from '../components/links/PreviewCard';
import {Link} from '../types/link';

type TrendingScreenProps = NativeStackScreenProps<
  AppStackParamList,
  'Trending'
>;
const Trending = ({navigation}: TrendingScreenProps) => {
  const dispatch = useDispatch<ThunkDispatch<RootState, any, any>>();
  const links = useSelector(selectLinks);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const [trendingLinks, setTrendingLinks] = useState([...links]);
  const [latestLinks, setLatestLinks] = useState([...links]);

  const filterLinks = () => {
    const tempLinks = [...links]; // Create a copy of the links array
    const tempTrend = tempLinks
      .sort((a, b) => (a.views < b.views ? 1 : -1))
      .slice(0, 3);
    const tempLatest = tempLinks
      .sort((a, b) => (a.createdAt! < b.createdAt! ? 1 : -1))
      .slice(0, 3);
    setTrendingLinks([...tempTrend]);
    setLatestLinks([...tempLatest]);
  };

  useEffect(() => {
    dispatch(fetchLinks({page: 1})).then(result => {
      if (fetchLinks.rejected.match(result)) {
        dispatch(resetErrorAsync());
      }
    });
    filterLinks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  const handlePress = async (link: Link) => {
    dispatch(updateViewCount(link));

    navigation.navigate('LinkView', {link});
  };
  // const handleLike = (link: any, user: any) => {
  //   dispatch(likeLink({link, user})).then(() => {
  //     setTimeout(() => {
  //       filterLinks();
  //     }, 5000);
  //   });
  // };
  // const handleUnlike = (link: Link, user: any) => {
  //   dispatch(unlikeLink({link, user})).then(() => {
  //     setTimeout(() => {
  //       filterLinks();
  //     }, 5000);
  //   });
  // };
  // const handleDelete = (link: Link) => {
  //   dispatch(deleteLink(link));
  //   filterLinks();
  // };
  // const handleNavigateToProfile = (link: Link) => {
  //   navigation.navigate('Profile', {
  //     name: link?.postedBy?.name,
  //     _id: link.postedBy?._id,
  //   });
  // };
  if (loading) {
    return (
      <View
        style={{
          alignItems: 'center',
          backgroundColor: '#fff',
          height: '100%',
          justifyContent: 'center',
        }}>
        <Image
          source={require('../assets/loading.gif')}
          style={{height: 300, width: 200}}
        />
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.homeContainer}>
      <ScrollView>
        {error && <Text>{error}</Text>}
        <Text style={styles.title}>Trending Links</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.cardConatiner}>
          {trendingLinks.length > 0 &&
            trendingLinks.map(link => (
              <TouchableHighlight
                onPress={() => handlePress(link)}
                style={{width: 300, marginRight: 10}}>
                {/* <DetailsLinkCard
                  key={link._id}
                  link={link}
                  handlePress={handlePress}
                  handleUnlike={handleUnlike}
                  handleLike={handleLike}
                  handleNavigateToProfile={handleNavigateToProfile}
                  handleDelete={handleDelete}
                /> */}
                <PreviewCard {...link.urlPreview} />
              </TouchableHighlight>
            ))}
        </ScrollView>
        <Text style={styles.title}>Latest Links</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.cardConatiner}>
          {latestLinks.length > 0 &&
            latestLinks.map(link => (
              <TouchableHighlight
                onPress={() => handlePress(link)}
                style={{width: 300, marginRight: 10}}>
                <PreviewCard {...link.urlPreview} />
              </TouchableHighlight>
            ))}
        </ScrollView>
      </ScrollView>

      <FooterTabs />
    </SafeAreaView>
  );
};

export default Trending;

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  cardConatiner: {
    marginTop: 10,
    marginHorizontal: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: '500',
    paddingTop: 10,
  },
});
