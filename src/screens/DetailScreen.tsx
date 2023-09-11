import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {addToFavourite, addToWatchList} from '../services/api';
import {MEDIUM_GREY} from '../styles/colors';
import {FONTS} from '../styles/fonts';
import {BASE_IMAGE_URL} from '../utils/constants';
import {
  ADDED_TO_FAVOURITE_LIST,
  ADDED_TO_WATCHLIST,
  COMMON_ERROR_MSG,
  REMOVED_FROM_FAVOURITE_LIST,
  REMOVED_FROM_WATCHLIST,
} from '../utils/strings';
import {showToast} from '../utils/utility';
import imageAssets from '../assets/images';

const DetailScreen = ({route, navigation}) => {
  const [item, setItem] = useState({});
  const [titile, setTitile] = useState('');
  const [banner, setBanner] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [overview, setOverview] = useState('');
  const [ratingInfo, setRatingInfo] = useState('');
  const [isItemWatchlist, setItemWatchlist] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);

  const {accountId} = useSelector(state => state.user);

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    console.log('[DetailScreen] >>> [init] route: ', route.params?.item);
    const item = route.params?.item;
    const rating = item?.vote_average
      ? parseFloat(item.vote_average).toFixed(1)
      : '';
    setItem(item);
    const rateinfo = item.vote_average ? rating : '';
    const votesinfo = item.vote_count ? `(${item.vote_count} votes)` : '';
    setTitile(item.name || item.title);
    setBanner(item?.backdrop_path);
    setReleaseDate(`Release date: ${item.release_date || item.first_air_date}`);
    setOverview(item?.overview ?? '');
    setRatingInfo(`User score: ${rateinfo} ${votesinfo}`);

    //make an api call to check if the item is in watchlist/favourite
    setItemWatchlist(isItemWatchlist);
    setIsFavourite(isFavourite);
    console.log('[DetailScreen] >>> [init] item: ', item);
  };

  const onPressBack = () => {
    console.log('[DetailScreen] >>> [onPressBack]');
    navigation.canGoBack() && navigation.goBack();
  };

  const onPressWatchList = async () => {
    console.log('[DetailScreen] >>> [onPressWatchList]', !isItemWatchlist);
    try {
      //make an api call to add to watchlist
      const movieId = item?.id ?? '';
      const isWatchList = !isItemWatchlist;
      const response = await addToWatchList(accountId, movieId, isWatchList);
      if (response.success) {
        setItemWatchlist(isWatchList);
        showToast(
          'success',
          '',
          isWatchList ? ADDED_TO_WATCHLIST : REMOVED_FROM_WATCHLIST,
        );
      } else {
        showToast('error', '', COMMON_ERROR_MSG);
      }
    } catch (e) {
      showToast('error', '', COMMON_ERROR_MSG);
      console.log('[DetailScreen] >>> [onHandleLogout] [error]: ', e);
    }
  };

  const onPressFavourite = async () => {
    console.log('[DetailScreen] >>> [onPressFavourite]', !isFavourite);
    try {
      //make an api call to add to watchlist
      const movieId = item?.id ?? '';
      const isFavouriteItem = !isFavourite;
      const response = await addToFavourite(
        accountId,
        movieId,
        isFavouriteItem,
      );
      if (response.success) {
        setIsFavourite(isFavouriteItem);
        showToast(
          'success',
          '',
          isFavouriteItem
            ? ADDED_TO_FAVOURITE_LIST
            : REMOVED_FROM_FAVOURITE_LIST,
        );
      } else {
        showToast('error', '', COMMON_ERROR_MSG);
      }
    } catch (e) {
      showToast('error', '', COMMON_ERROR_MSG);
      console.log('[DetailScreen] >>> [onHandleLogout] [error]: ', e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          {/* Header */}
          <View style={styles.header}>
            {/* Back button */}
            <TouchableOpacity onPress={() => onPressBack()}>
              <Image style={styles.backButton} source={imageAssets.back} />
            </TouchableOpacity>

            <Text style={styles.headingTitle}> {titile}</Text>
          </View>

          <View style={styles.mainContainer}>
            <Image
              style={[styles.img, styles.spacing]}
              source={{uri: `${BASE_IMAGE_URL}${banner}`}}
            />
            <Text style={[styles.title, styles.spacing]}>{titile}</Text>

            <View style={styles.iconRows}>
              {/* WatchList button */}
              <TouchableOpacity onPress={() => onPressWatchList()}>
                <Image
                  style={styles.userIcon}
                  source={
                    isItemWatchlist
                      ? imageAssets.bookmark
                      : imageAssets.unbookmark
                  }
                />
              </TouchableOpacity>

              {/* Favourite button */}
              <TouchableOpacity onPress={() => onPressFavourite()}>
                <Image
                  style={styles.userIcon}
                  source={
                    isFavourite ? imageAssets.like : imageAssets.defaultLike
                  }
                />
              </TouchableOpacity>
            </View>
            <View style={styles.spacing} />
            <Text style={[styles.desc, styles.spacing]}>{releaseDate}</Text>
            <Text style={[styles.desc, styles.spacing]}>{ratingInfo}</Text>
            <Text style={[styles.desc, styles.spacing]}>{overview}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MEDIUM_GREY,
    padding: 16,
  },

  header: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'center',
    width: '100%',
    alignContent: 'center',
  },
  backButton: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  userIcon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
    marginRight: 16,
  },
  headingTitle: {
    fontSize: 20,
    color: 'black',
    fontFamily: FONTS.MontserratBold,
    width: '84%',
    textAlign: 'center',
  },
  mainContainer: {
    marginVertical: 8,
  },
  img: {
    width: '100%',
    height: 240,
  },
  title: {
    fontFamily: FONTS.MontserratSemiBold,
    color: 'black',
    fontSize: 18,
  },
  desc: {
    fontFamily: FONTS.MontserratRegular,
    color: 'black',
    fontSize: 16,
  },
  spacing: {
    marginBottom: 12,
  },
  iconRows: {
    flexDirection: 'row',
  },
});

export default DetailScreen;
