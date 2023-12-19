import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {useSelector} from 'react-redux';
import {selectUser} from '../../redux/slices/authSlice';
import {Link} from '../../types/link';
import {User} from '../../types/user';

export default function DetailsLinkCard({
  link,
  handlePress,
  handleLike,
  handleUnlike,
  handleNavigateToProfile = () => {},
  handleDelete,
}: {
  link: Link;
  handlePress: (link: Link) => void;
  handleLike: (link: Link, user: User) => void;
  handleUnlike: (link: Link, user: User) => void;
  handleNavigateToProfile?: (link: Link) => void;
  handleDelete: (link: Link) => void;
}) {
  const user = useSelector(selectUser);
  const isLiked: boolean = link?.likes?.includes(user?._id);
  const handleLikeUnlike = () => {
    if (isLiked) {
      // unlike the post
      handleUnlike(link, link.postedBy);
    } else {
      // like the post
      handleLike(link, link.postedBy);
    }
  };

  const ogImageUrl = (ogImage: any) => {
    if (ogImage?.url) {
      return ogImage.url;
    } else if (ogImage?.length > 0) {
      return ogImage[0].url;
    } else {
      return 'https://via.placeholder.com/500x500.png?text=Image';
    }
  };

  return (
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        <TouchableOpacity onPress={() => handleNavigateToProfile(link)}>
          {link?.postedBy?.image ? (
            <Image
              source={{uri: link?.postedBy?.image?.url}}
              style={styles.avatar}
            />
          ) : (
            <Image
              source={require('../../assets/avatar.png')}
              style={styles.avatar}
            />
          )}
        </TouchableOpacity>

        <View>
          <Text
            onPress={() => handleNavigateToProfile(link)}
            style={styles.name}>
            {link?.postedBy?.name}
          </Text>
          <Text style={styles.date}>{link?.createdAt}</Text>
        </View>
        {link.postedBy._id === user._id && (
          <FontAwesome5Icon
            name="trash"
            size={20}
            color={'red'}
            style={styles.deleteIcon}
            onPress={() => handleDelete(link)}
          />
        )}
      </View>
      <TouchableOpacity
        key={link._id}
        activeOpacity={1}
        onPress={() => handlePress(link)}>
        <View style={styles.cardContainer}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
            {link?.title}
          </Text>

          <Image
            source={{uri: ogImageUrl(link?.urlPreview?.ogImage)}}
            style={styles.image}
          />

          <View style={styles.metaContainer}>
            <Text numberOfLines={2} ellipsizeMode="tail" style={styles.desc}>
              {link?.urlPreview?.ogDescription}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.postFooter}>
        <TouchableOpacity style={styles.actionIcon} onPress={handleLikeUnlike}>
          <FontAwesome5Icon
            name="thumbs-up"
            size={25}
            aria-valuetext="likes"
            color={isLiked ? 'red' : 'grey'}
          />
          <Text>
            {link.likes?.length} {link.likes?.length > 1 ? 'likes' : 'like'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity disabled style={styles.actionIcon}>
          <FontAwesome5Icon name="eye" size={25} />
          <Text>{link?.views} Views</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: '#fff',
    width: '100%',
    height: 310, // Adjusted height
    borderRadius: 14,
    overflow: 'hidden', // Ensure content inside the borderRadius is not visible
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2, // Android shadow
    marginBottom: 20,
  },
  postHeader: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    marginHorizontal: 12,
    position: 'relative',
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginHorizontal: 3,
  },
  name: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  date: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 10,
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginHorizontal: 20,
  },
  deleteIcon: {
    position: 'absolute',
    top: 20,
    right: 35,
  },
  actionIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  cardContainer: {
    paddingHorizontal: 10,
  },
  metaContainer: {
    padding: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 3,
  },
  desc: {
    fontSize: 14,
    color: '#666',
  },
  image: {
    height: 130,
    width: '100%',
    resizeMode: 'cover',
  },
});
