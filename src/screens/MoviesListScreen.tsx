import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import TextLabel from '../components/TextLabel';
import {DETAILS_SCREEN} from '../navigation/NavigationConstant';
import {
  getFavoriteMovies,
  getRatedMovies,
  getSearchReultsList,
} from '../services/api';
import {MEDIUM_GREY, BLUE} from '../styles/colors';
import {FONTS} from '../styles/fonts';
import {BASE_IMAGE_URL} from '../utils/constants';
import {FAVOURITES_TYPE, RATINGS_TYPE, SEARCH_TYPE} from '../utils/data';
import {
  COMMON_ERROR_MSG,
  MOVIE_SEARCH,
  MY_FAVOURITES,
  MY_RATINGS,
} from '../utils/strings';
import imageAssets from '../assets/images';
import {showToast} from '../utils/utility';
import EmptyStateScreen from '../components/EmptyStateScreen';

const MoviesListScreen = ({route, navigation}) => {
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [searchCountInfo, setSearchCountInfo] = useState('');
  const [movieList, setMovieList] = useState([]);

  const {accountId} = useSelector(state => state.user);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      init();
    });
    return unsubscribe;
  }, [navigation]);

  const init = async () => {
    const type = route.params?.type;
    console.log('[MoviesListScreen] >>> [init] route: ', type);
    let response = '';
    if (type === SEARCH_TYPE) {
      const searchText = route.params?.searchText;
      try {
        response = await getSearchReultsList(searchText);
        setTitle(MOVIE_SEARCH);
        setSearchCountInfo(`${response.length} movies with "${searchText}"`);
      } catch (e) {
        showToast('error', '', COMMON_ERROR_MSG);
        console.log('[LoginScreen] >>> [init] [error]: ', e);
      }
    } else if (type === FAVOURITES_TYPE) {
      try {
        response = await getFavoriteMovies(accountId);
        setTitle(MY_FAVOURITES);
      } catch (e) {
        showToast('error', '', COMMON_ERROR_MSG);
        console.log('[LoginScreen] >>> [init] [error]: ', e);
      }
    } else if (type === RATINGS_TYPE) {
      try {
        response = await getRatedMovies(accountId);
        setTitle(MY_RATINGS);
      } catch (e) {
        showToast('error', '', COMMON_ERROR_MSG);
        console.log('[LoginScreen] >>> [init] [error]: ', e);
      }
    }
    setMovieList(response);
    setLoading(false);
  };

  const onPressBack = () => {
    navigation.goBack();
    console.log('[MoviesListScreen] >>> [onPressBack');
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => onItemPress(item, index)}
        style={styles.mainItemContainer}>
        <View style={styles.leftItemContainer}>
          <Image
            style={styles.img}
            source={{uri: `${BASE_IMAGE_URL}${item.poster_path}`}}
          />

          <View style={styles.rightItemContainer}>
            <Text style={styles.itemTitle} numberOfLines={2}>
              {item.name || item.title}
            </Text>
            <Text style={styles.itemYear}>
              {item.release_date || item.first_air_date}
            </Text>
            <Text style={styles.desc} numberOfLines={4}>
              {item.overview}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const keyExtractor = (item: {id: number}, index: any) => {
    return `${item.id}${index}`;
  };

  const onItemPress = (item: object) => {
    console.log('[Dashboard] >>> [onItemPress]', item);
    navigation.navigate(DETAILS_SCREEN, {item});
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => onPressBack()}>
            <Image style={styles.backButton} source={imageAssets.back} />
          </TouchableOpacity>
          <Text style={styles.headingTitle}>{title}</Text>
        </View>

        <TextLabel
          fontSize={16}
          lineHeight={23}
          fontWeight="500"
          textAlign="left"
          text={searchCountInfo}
        />

        <View style={styles.mainContainer}>
          {!loading && movieList.length <= 0 ? (
            <EmptyStateScreen />
          ) : (
            <FlatList
              style={styles.flatlistContainer}
              data={movieList}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MEDIUM_GREY,
    padding: 8,
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
  headingTitle: {
    fontSize: 20,
    color: 'black',
    fontFamily: FONTS.MontserratBold,
    width: '90%',
    textAlign: 'center',
  },
  subHeadingTitle: {
    fontSize: 14,
    color: 'black',
    fontFamily: FONTS.MontserratSemiBold,
    marginVertical: 8,
  },
  mainContainer: {},

  flatlistContainer: {
    height: '100%',
    width: '100%',
    padding: 4,
  },

  title: {
    fontFamily: FONTS.MontserratSemiBold,
    color: 'black',
    fontSize: 18,
  },

  spacing: {
    marginBottom: 12,
  },

  mainItemContainer: {
    height: 180,
    marginVertical: 8,
    width: '100%',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    shadowColor: '#F5F5F5',
  },
  leftItemContainer: {
    flex: 1,
    width: '100%',
    height: 48,
    borderColor: 'grey',
    flexDirection: 'row',
  },

  rightItemContainer: {
    width: '100%',
    padding: 8,
    justifyContent: 'center',
    flex: 1,
  },

  img: {
    width: 136,
    height: 176,
    resizeMode: 'cover',
    backgroundColor: BLUE,
  },

  itemTitle: {
    fontSize: 14,
    fontFamily: FONTS.MontserratBold,
    color: 'black',
    textAlign: 'left',
    paddingVertical: 4,
  },
  itemYear: {
    fontSize: 12,
    fontFamily: FONTS.MontserratRegular,
    color: 'gray',
    textAlign: 'left',
    paddingVertical: 4,
  },

  desc: {
    fontSize: 12,
    fontFamily: FONTS.MontserratRegular,
    color: 'black',
    textAlign: 'left',
    paddingVertical: 4,
  },
});

export default MoviesListScreen;
