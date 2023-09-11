import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  TextInput,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BLUE, MEDIUM_GREY, GREY_GHOST, WHITE} from '../../styles/colors';
import {FONTS} from '../../styles/fonts';
import {
  clearSession,
  getMoviesListByType,
  getTerndingMovieList,
} from '../../services/api';
import {SEARCH_TYPE} from '../../utils/data';
import {useSelector, useDispatch} from 'react-redux';
import {
  DETAILS_SCREEN,
  LOGIN_SCREEN,
  MOVIES_LIST_SCREEN,
} from '../../navigation/NavigationConstant';
import {HOME_MOVIE_BG_URL} from '../../utils/url';
import TextLabel from '../../components/TextLabel';
import {
  COMMON_ERROR_MSG,
  HOME_TAB_SUBTITLE,
  NOW_PLAYING,
  POPULAR,
  SEARCH,
  SEARCH_MOVIES,
  TRENDING,
  UPCOMING,
  WELCOME,
} from '../../utils/strings';
import PropTypes from 'prop-types';
import CardMoview from '../../components/CardMoview';
import {logout} from '../../reduxStore/slice/UserSlice';
import {isEmpty, showToast} from '../../utils/utility';
import imageAssets from '../../assets/images';

const HomeTab = ({navigation}) => {
  const [trendingMovieList, setTrendingMovieList] = useState([]);
  const [popularMovieList, setPopularMovieList] = useState([]);
  const [upcomingMovieList, setUpcomingMovieList] = useState([]);
  const [nowPlayingMovieList, setNowPlayingMovieList] = useState([]);

  const [text, onChangeText] = useState('');
  const [welcomeName, setWelcomeName] = useState('');

  const dispatch = useDispatch();
  const {userName, sessionId} = useSelector(state => state.user);

  const isUserLoggedIn = userName === '' ? false : true;

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const name = userName ? `${WELCOME} ${userName}` : '${WELCOME}';
    setWelcomeName(name);
    try {
      const trendingResponse = await getTerndingMovieList();
      setTrendingMovieList(trendingResponse);
      const popularResponse = await getMoviesListByType('popular');
      setPopularMovieList(popularResponse);
      const nowPlayingResponse = await getMoviesListByType('now_playing');
      setNowPlayingMovieList(nowPlayingResponse);
      const upcomingResponse = await getMoviesListByType('upcoming');
      setUpcomingMovieList(upcomingResponse);
    } catch (e) {
      showToast('error', '', COMMON_ERROR_MSG);
      console.log('[LogiHomeTabnScreen] >>> [init] [error]: ', e);
    }
  };

  const renderItem = ({item, index}) => {
    return <CardMoview item={item} onPress={onItemPress} index={index} />;
  };

  renderItem.propTypes = {
    item: PropTypes.object,
    index: PropTypes.number,
  };

  const keyExtractor = (item, index) => {
    return `${item.id}${index}`;
  };

  const onItemPress = item => {
    console.log('[HomeTab] >>> [onItemPress]', item.item);
    navigation.navigate(DETAILS_SCREEN, {item});
  };

  const handleClearSearch = () => {
    console.log('[HomeTab] >>> [handleClearSearch]');
    onChangeText('');
  };

  const handleSearch = () => {
    console.log('[HomeTab] >>> [handleSearch]');
    if (!isEmpty(text)) {
      navigation.navigate(MOVIES_LIST_SCREEN, {
        type: SEARCH_TYPE,
        searchText: text,
      });
    }
  };

  const onHandleLogout = async () => {
    console.log('[HomeTab] >>> [onHandleLogout]');
    try {
      await clearSession(sessionId);
    } catch (e) {
      console.log('[HomeTab] >>> [onHandleLogout] [error]: ', e);
    }
    showToast('success', 'Logout', 'You have logged out.');
    dispatch(logout());
    navigation.navigate(LOGIN_SCREEN);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.mainHeader}>
          <Image style={styles.logo} source={imageAssets.tmdb} />
          <TouchableOpacity onPress={() => onHandleLogout()}>
            <Image
              style={styles.loginImg}
              source={isUserLoggedIn ? imageAssets.logout : imageAssets.login}
            />
          </TouchableOpacity>
        </View>

        {/* BG and welcome text */}
        <ImageBackground
          source={{
            uri: HOME_MOVIE_BG_URL,
          }}
          style={styles.headerImage}>
          <View style={styles.header}>
            <TextLabel
              fontSize={28}
              fontWeight="700"
              textAlign="left"
              color={WHITE}
              text={welcomeName}
              style={styles.welcomeTitle}
            />

            <TextLabel
              fontSize={20}
              lineHeight={24}
              fontWeight="600"
              textAlign="left"
              color={WHITE}
              text={HOME_TAB_SUBTITLE}
              style={styles.welcomeSubTitle}
            />

            {/* Search */}
            <View style={styles.searchContainer}>
              <View style={styles.searchView}>
                <TextInput
                  style={styles.textinput}
                  onChangeText={text => {
                    console.log('text:' + text);
                    onChangeText(text);
                  }}
                  value={text}
                  placeholder={SEARCH_MOVIES}
                  placeholderTextColor={GREY_GHOST}
                />
                <TouchableOpacity onPress={handleClearSearch}>
                  <Image
                    style={styles.searchCloseIcon}
                    source={imageAssets.close}
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                onPress={handleSearch}
                style={styles.searchBtnContainer}>
                <TextLabel
                  fontSize={16}
                  lineHeight={24}
                  fontWeight="400"
                  textAlign="left"
                  color={WHITE}
                  text={SEARCH}
                  style={styles.searchBtnText}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>

        {/* Trending */}
        <MovieList
          title={TRENDING}
          data={trendingMovieList}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />

        {/* Now playing */}
        <MovieList
          title={NOW_PLAYING}
          data={nowPlayingMovieList}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />

        {/* Upcoming */}
        <MovieList
          title={UPCOMING}
          data={upcomingMovieList}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />

        {/* Popular */}
        <MovieList
          title={POPULAR}
          data={popularMovieList}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const MovieList = ({
  title,
  data,
  renderItem,
  keyExtractor,
}): React.JSX.Element => (
  <View>
    <Text style={styles.mainHeading}>{title}</Text>
    {/* List display */}
    <FlatList
      style={styles.flatlistContainer}
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      horizontal={true}
    />
  </View>
);

MovieList.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array,
  renderItem: PropTypes.func,
  keyExtractor: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MEDIUM_GREY,
    padding: 8,
  },
  scrollContainer: {
    flex: 1,
  },
  mainHeader: {
    flexDirection: 'row',
    marginBottom: 8,
    width: '100%',
    justifyContent: 'space-between',
  },
  logo: {
    width: 60,
    height: 48,
    resizeMode: 'contain',
    alignSelf: 'center',
    flex: 1,
  },
  loginImg: {
    width: 36,
    height: 36,
    resizeMode: 'contain',
    marginRight: 8,
  },
  mainHeading: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
    fontFamily: FONTS.MontserratBold,
  },
  renderItem: {
    flex: 1,
    width: '100%',
    backgroundColor: 'lightblue',
    height: 360,
    margin: '2%',
  },
  itemContainer: {
    flex: 1,
    width: '100%',
    height: 48,
    borderColor: 'grey',
  },

  itemTextContainer: {
    padding: 5,
    flex: 1,
    justifyContent: 'center',
  },
  itemTitle: {
    fontSize: 14,
    fontFamily: FONTS.MontserratSemiBold,
    color: 'black',
    textAlign: 'left',
    paddingVertical: 4,
  },
  itemYear: {
    fontSize: 14,
    fontFamily: FONTS.MontserratSemiBold,
    color: BLUE,
    textAlign: 'left',
    paddingVertical: 4,
  },
  itemSubTitle: {
    fontSize: 14,
    fontFamily: FONTS.MontserratRegular,
    color: 'black',
  },

  header: {
    width: '100%',
    justifyContent: 'center',
  },

  headerImage: {
    marginVertical: '5%',
    paddingVertical: '12%',
  },

  welcomeTitle: {
    padding: 8,
  },

  welcomeSubTitle: {
    padding: 8,
  },

  flatlistContainer: {
    height: 340,
    padding: 4,
    width: '100%',
  },

  mainItemContainer: {
    height: '100%',
    marginRight: 16,
    width: 180,
  },
  img: {
    width: '100%',
    height: '84%',
  },

  textinput: {
    marginLeft: 8,
    fontSize: 18,
    fontFamily: FONTS.MontserratMedium,
    color: 'white',
  },

  searchContainer: {
    flex: 1,
    marginTop: 20,
    marginBottom: 8,
    marginHorizontal: 8,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  searchView: {
    width: '76%',
    height: '100%',
    borderColor: 'white',
    borderWidth: 1,
    paddingLeft: 4,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
  },

  searchCloseIcon: {
    height: 32,
    width: 32,
  },

  searchBtnContainer: {
    height: '100%',
    width: 80,
    borderRadius: 12,
    backgroundColor: '#0184ba',
    justifyContent: 'center',
  },

  searchBtnText: {
    alignSelf: 'center',
  },
});

export default HomeTab;
