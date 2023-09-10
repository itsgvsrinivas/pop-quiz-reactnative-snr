import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';
import {MEDIUM_GREY, SHADOW_LIGHT} from '../../styles/colors';
import {FONTS} from '../../styles/fonts';
import {
  addRating,
  addToWatchList,
  authenticateUser,
  deleteRating,
  getFavoriteMovies,
  getReview,
  getSessionId,
  getUserInfo,
  getWatchListMovies,
} from '../../services/api';
import {FAVOURITES_TYPE, RATINGS_TYPE} from '../../utils/data';

const ProfileTab = ({route, navigation}) => {
  const [name, setName] = useState('gvsrinivas');
  const [memberYear, setMemberYear] = useState('2023');

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    console.log('[ProfileTab] >>> [init]');
  };

  const onHandleLogin = async () => {
    console.log('[ProfileTab] >>> [onHandleLogin]');
    //setItemWatchlist(!isItemWatchlist);
    //make an api call to add to watchlist
    const response = await authenticateUser(username, password, token);
    console.log('[ProfileTab] >>> [init] response:', response);

    //const response = await clearSession(token);
    const response1 = await getSessionId(token);
    console.log('[ProfileTab] >>> [init] response1:', response1);
    if (response1?.success) {
      const session_id = response1?.session_id;
      console.log('[ProfileTab] >>> [init] session_id:', session_id);
      const userInfoResponse = await getUserInfo(session_id);
      console.log(
        '[ProfileTab] >>> [init] userInfoResponse:',
        userInfoResponse,
      );
      const watchListInfoResponse = await addToWatchList(userInfoResponse?.id);
      console.log(
        '[ProfileTab] >>> [init] watchListInfoResponse:',
        watchListInfoResponse,
      );
      const watchListMoviesResponse = await getWatchListMovies(
        userInfoResponse?.id,
      );
      console.log(
        '[ProfileTab] >>> [init] watchListMoviesResponse:',
        watchListMoviesResponse,
      );

      const addRatingResponse = await addRating('11', '8');
      console.log(
        '[ProfileTab] >>> [init] addRatingResponse:',
        addRatingResponse,
      );

      const deleteRatingResponse = await deleteRating('11');
      console.log(
        '[ProfileTab] >>> [init] deleteRatingResponse:',
        deleteRatingResponse,
      );

      const reviewResponse = await getReview('11');
      console.log('[ProfileTab] >>> [init] reviewResponse:', reviewResponse);

      const favouriteMoviewsResponse = await getFavoriteMovies(
        userInfoResponse?.id,
      );
      console.log(
        '[ProfileTab] >>> [init] favouriteMoviewsResponse:',
        favouriteMoviewsResponse,
      );
      navigation.canGoBack() && navigation.goBack();
    } else {
      //"Invalid username and/or password"
    }
  };

  const onPressMyFavourites = () => {
    console.log('[ProfileTab] >>> [onPressMyFavourites]');
    navigation.navigate('MoviesListScreen', {type: FAVOURITES_TYPE});
  };

  const onPressMyRatings = () => {
    console.log('[ProfileTab] >>> [onPressMyRatings]');
    navigation.navigate('MoviesListScreen', {type: RATINGS_TYPE});
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <View style={styles.mainHeader}>
            <Image
              style={styles.logo}
              source={require('../../assets/images/tmdb.png')}
            />
          </View>
          <View style={styles.wrapper}>
            <View
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                borderWidth: 1,
                borderColor: 'black',
                borderStyle: 'solid',
                justifyContent: 'center',
                backgroundColor: 'pink',
              }}>
              <Text style={styles.logoTitle}>G</Text>
            </View>
            <Text style={[styles.username, styles.vspacer]}>{name}</Text>
            <Text style={[styles.tileTitle]}>Member since {memberYear}</Text>

            {/*  tiles */}
            <View style={[styles.tileMainWrapper, styles.vspacer]}>
              <TouchableOpacity
                style={styles.tile}
                onPress={onPressMyFavourites}>
                <View style={styles.tileWrapper}>
                  <Image
                    style={styles.tileLogo}
                    source={require('../../assets/images/defaultLike.png')}
                  />
                  <Text style={[styles.tileTitle]}>My Favourites</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.tile} onPress={onPressMyRatings}>
                <View style={styles.tileWrapper}>
                  <Image
                    style={styles.tileLogo}
                    source={require('../../assets/images/star_black.png')}
                  />
                  <Text style={[styles.tileTitle]}>My Ratings</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MEDIUM_GREY,
  },
  mainHeader: {
    flexDirection: 'row',
    marginBottom: 8,
    width: '100%',
    justifyContent: 'space-between',
    backgroundColor: '#032541',
    height: '18%',
  },
  logo: {
    width: 60,
    height: 48,
    resizeMode: 'contain',
    alignSelf: 'center',
    flex: 1,
  },
  close: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
    alignSelf: 'center',
    flex: 1,
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
  vspacer: {
    marginVertical: 8,
  },
  image: {
    marginBottom: 40,
  },
  wrapper: {
    padding: 16,
    alignItems: 'center',
    alignContent: 'center',
  },
  logoTitle: {
    fontSize: 36,
    fontFamily: FONTS.MontserratBold,
    textAlign: 'center',
  },
  username: {
    fontSize: 24,
    fontFamily: FONTS.MontserratBold,
    textAlign: 'center',
  },
  desc: {
    fontSize: 14,
    fontFamily: FONTS.MontserratRegular,
    color: 'black',
    textAlign: 'left',
  },
  inputView: {
    backgroundColor: '#FFC0CB',
    borderRadius: 30,
    width: '70%',
    height: 45,
    marginBottom: 20,
    alignItems: 'center',
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 5,
    fontSize: 14,
    fontFamily: FONTS.MontserratRegular,
  },
  reset: {
    height: 30,
    marginBottom: 30,
    color: '#01b4e4',
  },
  loginBtn: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
    backgroundColor: '#01b4e4',
  },
  loginText: {
    fontSize: 14,
    fontFamily: FONTS.MontserratSemiBold,
  },
  tileMainWrapper: {
    flex: 1,
    flexDirection: 'row',
  },
  tile: {
    width: 110,
    height: 75,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
    backgroundColor: '#fff',
    shadowColor: SHADOW_LIGHT,
    shadowOpacity: 10,
    margin: 8,
  },

  tileWrapper: {
    flex: 1,
  },
  tileLogo: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    alignSelf: 'center',
    flex: 1,
  },
  tileTitle: {
    fontSize: 14,
    fontFamily: FONTS.MontserratRegular,
    alignSelf: 'center',
    flex: 1,
  },
});
