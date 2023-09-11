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
import {addToWatchList} from '../services/api';
import {MEDIUM_GREY} from '../styles/colors';
import {FONTS} from '../styles/fonts';
import {BASE_IMAGE_URL} from '../utils/constants';
import {COMMON_ERROR_MSG} from '../utils/strings';
import {showToast} from '../utils/utility';

const DetailScreen = ({route, navigation}) => {
  const [item, setItem] = useState({});
  const [titile, setTitile] = useState('');
  const [banner, setBanner] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [overview, setOverview] = useState('');
  const [ratingInfo, setRatingInfo] = useState('');
  const [isItemWatchlist, setItemWatchlist] = useState(false);

  const watchlistIcon = require('../assets/images/bookmark.png');
  const removeFromWatchlist = require('../assets/images/unbookmark.png');
  const backIcon = require('../assets/images/back.png');

  const {accountId} = useSelector(state => state.user);

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    console.log('[DetailScreen] >>> [init] route: ', route.params?.item);
    const item = route.params?.item;
    setItem(item);
    const rateinfo = item.vote_average ? item.vote_average / 10 : '';
    const votesinfo = item.vote_count ? `${item.vote_count} (votes)` : '';
    setTitile(item.name || item.title);
    setBanner(item?.backdrop_path);
    setReleaseDate(`Release date: ${item.release_date || item.first_air_date}`);
    setOverview(item?.overview ?? '');
    setRatingInfo(`User score: ${rateinfo} ${votesinfo}`);
    //make an api call to check if the item is in watchlist
    setItemWatchlist(isItemWatchlist);
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
          isWatchList
            ? 'Movie added to watchlist'
            : 'Movie removed to watchlist',
        );
      } else {
        showToast('error', '', COMMON_ERROR_MSG);
      }
    } catch (e) {
      showToast('error', '', COMMON_ERROR_MSG);
      console.log('[LoginScreen] >>> [onHandleLogout] [error]: ', e);
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
              <Image style={styles.backButton} source={backIcon} />
            </TouchableOpacity>

            <Text style={styles.headingTitle}> {titile}</Text>

            {/* WatchList button */}

            <TouchableOpacity onPress={() => onPressWatchList()}>
              <Image
                style={styles.addWatchlist}
                source={isItemWatchlist ? watchlistIcon : removeFromWatchlist}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.mainContainer}>
            <Image
              style={[styles.img, styles.spacing]}
              source={{uri: `${BASE_IMAGE_URL}${banner}`}}
            />
            <Text style={[styles.title, styles.spacing]}>{titile}</Text>
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
  addWatchlist: {
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
    fontSize: 14,
  },
  spacing: {
    marginBottom: 12,
  },
});

export default DetailScreen;
function addWatchlist() {
  throw new Error('Function not implemented.');
}
