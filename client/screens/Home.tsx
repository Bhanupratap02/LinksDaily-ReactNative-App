import {
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FooterTabs from '../components/tabs/FooterTabs';
import {useDispatch, useSelector} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import {
  deleteLink,
  fetchLinks,
  likeLink,
  resetErrorAsync,
  selectError,
  selectLinks,
  selectLoading,
  unlikeLink,
  updateViewCount,
} from '../redux/slices/linkSlice';
import {RootState} from '../redux/store';
import DetailsLinkCard from '../components/links/DetailsLinkCard';
import SubmitButton from '../components/auth/SubmitButton';
import {axiosPrivate} from '../axiosConfig';
import FilterLinks from '../components/links/FilterLinks';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackParamList} from '../navigations/app-navigator';

type HomeScreenProps = NativeStackScreenProps<AppStackParamList, 'Home'>;
const Home = ({navigation}: HomeScreenProps) => {
  const dispatch = useDispatch<ThunkDispatch<RootState, any, any>>();
  const links = useSelector(selectLinks);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const [page, setPage] = useState(1);
  const [linksCount, setLinksCount] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [filteredLinks, setFilteredLinks] = useState([...links]);
  useEffect(() => {
    dispatch(fetchLinks({page})).then(result => {
      if (fetchLinks.rejected.match(result)) {
        dispatch(resetErrorAsync());
      }
    });
  }, [dispatch, page]);

  useEffect(() => {
    const linksCountfn = async () => {
      const {data} = await axiosPrivate.get('/links-count');
      setLinksCount(data);
    };
    linksCountfn();
  }, []);
  const handlePress = async (link: any) => {
    dispatch(updateViewCount(link));

    navigation.navigate('LinkView', {link});
  };
  const handleLike = (link: any, user: any) => {
    dispatch(likeLink({link, user}));
  };
  const handleUnlike = (link: any, user: any) => {
    dispatch(unlikeLink({link, user}));
  };
  const handleDelete = (link: any) => {
    dispatch(deleteLink(link));
  };
  const handleNavigateToProfile = (link: any) => {
    navigation.navigate('Profile', {
      name: link?.postedBy?.name,
      _id: link.postedBy?._id,
    });
  };
  useEffect(() => {
    // Filter links based on the entered keyword
    const filtered = links.filter(link =>
      link.title.toLowerCase().includes(keyword.toLowerCase()),
    );
    setFilteredLinks(filtered);
  }, [keyword, links]);
  if (loading) {
    return (
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          alignItems: 'center',
          backgroundColor: '#fff',
          height: '100%',
          justifyContent: 'center',
        }}>
        <Image
          source={require('../assets/loading.gif')}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{height: 300, width: 200}}
        />
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.homeContainer}>
      <ScrollView>
        {error && <Text>{error}</Text>}
        <FilterLinks value={keyword} setValue={setKeyword} />
        <Text style={styles.title}>Recent Links</Text>
        <View style={styles.cardConatiner}>
          {filteredLinks.length > 0 &&
            filteredLinks.map(link => (
              <DetailsLinkCard
                key={link._id}
                link={link}
                handlePress={handlePress}
                handleUnlike={handleUnlike}
                handleLike={handleLike}
                handleNavigateToProfile={handleNavigateToProfile}
                handleDelete={handleDelete}
              />
            ))}
        </View>
        {linksCount > links?.length && (
          <SubmitButton
            loading={loading}
            title="Load more"
            handleSubmit={() => setPage(page + 1)}
          />
        )}
      </ScrollView>
      <FooterTabs />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  cardConatiner: {
    marginTop: 10,
    marginHorizontal: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '500',
    color: 'black',
    paddingTop: 10,
  },
});
