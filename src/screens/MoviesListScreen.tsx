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
import {
  getFavoriteMovies,
  getRatedMovies,
  getSearchReultsList,
} from '../services/api';
import {MEDIUM_GREY, BLUE} from '../styles/colors';
import {FONTS} from '../styles/fonts';
import {BASE_IMAGE_URL} from '../utils/constants';
import {FAVOURITES_TYPE, RATINGS_TYPE, SEARCH_TYPE} from '../utils/data';

const MoviesListScreen = ({route, navigation}) => {
  const [searchCountInfo, setSearchCountInfo] = useState('');
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    console.log('[MoviesListScreen] >>> [init] route: ', route.params?.item);
    const type = route.params?.type;
    let response = '';
    if (type === SEARCH_TYPE) {
      const searchText = route.params?.searchText;
      response = await getSearchReultsList(searchText);
      setSearchCountInfo(`${response.length} movies with "${searchText}"`);
    } else if (type === FAVOURITES_TYPE) {
      const accountId = '';
      response = await getFavoriteMovies(accountId);
    } else if (type === RATINGS_TYPE) {
      const accountId = '';
      response = await getRatedMovies(accountId);
    }
    setMovieList(response);
  };

  const onPressBack = () => {
    navigation.goBack();
    console.log(`[MoviesListScreen] >>> [onPressBack`);
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

  const keyExtractor = (item, index) => {
    return `${item.id}${index}`;
  };

  const onItemPress = item => {
    console.log('[Dashboard] >>> [onItemPress]', item);
    navigation.navigate('DetailScreen', {item});
    //navigation.navigate('HomeStack', {screen: 'DetailScreen'});
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => onPressBack()}>
            <Image
              style={styles.backButton}
              source={require('../assets/images/back.png')}
            />
          </TouchableOpacity>
          <Text style={styles.headingTitle}>Movie Search</Text>
        </View>

        <Text style={styles.subHeadingTitle}>{searchCountInfo}</Text>

        <View style={styles.mainContainer}>
          {/* List display */}
          <FlatList
            style={styles.flatlistContainer}
            data={movieList}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
          />
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
