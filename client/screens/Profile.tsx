import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  View,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import dayjs from 'dayjs';
import FooterTabs from '../components/tabs/FooterTabs';
import {useDispatch, useSelector} from 'react-redux';
import {selectUser} from '../redux/slices/authSlice';
import {axiosPrivate} from '../axiosConfig';
import {
  deleteLink,
  likeLink,
  unlikeLink,
  updateViewCount,
} from '../redux/slices/linkSlice';
import DetailsLinkCard from '../components/links/DetailsLinkCard';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {RootState} from '../redux/store';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackParamList} from '../navigations/app-navigator';
import {Link} from '../types/link';
import {User} from '../types/user';

type ProfileScreenProps = NativeStackScreenProps<AppStackParamList, 'Profile'>;
export default function Profile({navigation, route}: ProfileScreenProps) {
  const dispatch = useDispatch<ThunkDispatch<RootState, any, any>>();
  const routeParamsId = route?.params?._id;
  const user = useSelector(selectUser);
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [links, setLinks] = useState<Link[] | []>([]);
  const fetchUserProfile = async (id: string) => {
    try {
      const {data} = await axiosPrivate.get(`/user-profile/${id}`);
      // console.log("user profile data => ", data);
      setUserProfile(data.profile);
      setLinks(data.links);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    routeParamsId
      ? fetchUserProfile(routeParamsId)
      : fetchUserProfile(user?._id as string);
  }, [routeParamsId, user?._id]);

  const handleLike = (link: Link, user: User) => {
    dispatch(likeLink({link, user}));
    fetchUserProfile(userProfile?._id as string);
  };
  const handleUnlike = (link: Link, user: User) => {
    dispatch(unlikeLink({link, user}));
    fetchUserProfile(userProfile?._id as string);
  };
  const handlePress = async (link: Link) => {
    dispatch(updateViewCount(link));
    navigation.navigate('LinkView', {link});
  };
  const handleDelete = (link: Link) => {
    dispatch(deleteLink(link));
    setLinks(items => {
      const index = items.findIndex(l => l._id === link._id);
      items.splice(index, 1);
      return [...items];
    });
  };
  return (
    <SafeAreaView style={styles.homeContainer}>
      <ScrollView style={{padding: 16}}>
        <View style={styles.header}>
          {userProfile?.image?.url ? (
            <Image
              style={styles.photo}
              source={{
                uri: userProfile?.image?.url,
              }}
            />
          ) : (
            <Image
              style={styles.photo}
              source={require('../assets/avatar.png')}
            />
          )}
          <Text style={styles.name}> {userProfile?.name}</Text>
          <Text style={styles.title}>
            Joined on {dayjs(userProfile?.createdAt).format('DD/MM/YYYY')}
          </Text>
          <Text style={styles.title}> {links?.length} Links</Text>
        </View>
        <View>
          {links.length > 0 &&
            links.map(link => (
              <DetailsLinkCard
                key={link._id}
                link={link}
                handlePress={handlePress}
                handleUnlike={handleUnlike}
                handleLike={handleLike}
                handleDelete={handleDelete}
              />
            ))}
        </View>
      </ScrollView>
      <FooterTabs />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
  },
  title: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
  },
});
