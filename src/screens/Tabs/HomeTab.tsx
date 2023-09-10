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
import {BLUE, MEDIUM_GREY, GREY_GHOST} from '../../styles/colors';
import {FONTS} from '../../styles/fonts';
import {getTerndingMovieList} from '../../services/api';
import {BASE_IMAGE_URL} from '../../utils/constants';
import {SEARCH_TYPE} from '../../utils/data';
import {useSelector, useDispatch} from 'react-redux';
import {logout} from '../../reduxStore/slice/UserSlice';

const HomeTab = ({navigation}) => {
  const [movieList, setMovieList] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [text, onChangeText] = React.useState('');

  const dispatch = useDispatch();
  const userName = useSelector(state => state.user.userName);
  const user = useSelector(state => state.user);
  console.log('[HomeTab] >>> [init] user:', user);

  const isUserLoggedIn = userName === '' ? false : true;

  const loginImg = require('../../assets/images/login.png');
  const logoutImg = require('../../assets/images/logout.png');

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    console.log('[HomeTab] >>> [init] isUserLoggedIn:', isUserLoggedIn);
    console.log('[HomeTab] >>> [init] userName:', userName);
    const response = await getTerndingMovieList();
    const data = movieList ? [...movieList, ...response] : response;
    setMovieList(data);
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => onItemPress(item, index)}
        style={styles.mainItemContainer}>
        <View style={styles.itemContainer}>
          <Image
            style={styles.img}
            source={{uri: `${BASE_IMAGE_URL}${item.poster_path}`}}
          />
          <Text style={styles.itemTitle}>{item.name || item.title}</Text>
          <Text style={styles.itemYear}>
            {item.release_date || item.first_air_date}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const keyExtractor = (item, index) => {
    return `${item.id}${index}`;
  };

  const onItemPress = item => {
    console.log('[HomeTab] >>> [onItemPress]', item);
    navigation.navigate('DetailScreen', {item});
    //navigation.navigate('HomeStack', {screen: 'DetailScreen'});
  };

  const handleClearSearch = () => {
    console.log('[HomeTab] >>> [handleClearSearch]');
    onChangeText('');
  };

  const handleSearch = () => {
    console.log('[HomeTab] >>> [handleSearch]');
    //make an api call to get search result
    //navigation.navigate('MoviesListScreen', {item: text});
    navigation.navigate('MoviesListScreen', {
      type: SEARCH_TYPE,
      searchText: 'Villan',
    });
  };

  const onHandleLogout = () => {
    console.log('[DetailScreen] >>> [onHandleLogin11]');
    dispatch(logout());
    console.log('[HomeTab] >>> [onHandleLogout] user:', user);
    navigation.navigate('LoginScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.mainHeader}>
          <Image
            style={styles.logo}
            source={require('../../assets/images/tmdb.png')}
          />
          <TouchableOpacity onPress={() => onHandleLogout()}>
            <Image
              style={styles.loginImg}
              source={isUserLoggedIn ? loginImg : logoutImg}
            />
          </TouchableOpacity>
        </View>

        <ImageBackground
          source={{
            uri: 'https://www.themoviedb.org/t/p/w880_and_h600_multi_faces_filter(duotone,00192f,00baff)/tfw5LKySp7uEYJ3CUuD4TKx3s8y.jpg',
          }}
          style={styles.headerImage}>
          <View style={styles.header}>
            <Text style={styles.welcomeTitle}>Welcome.</Text>
            <Text style={styles.welcomeSubTitle}>
              Millions of movies, TV shows and people to discover. Explore now.
            </Text>

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
                  placeholder="Search movies"
                  placeholderTextColor={GREY_GHOST}
                />
                <TouchableOpacity
                  onPress={handleClearSearch}
                  style={styles.searchInputCloseBtn}>
                  <Image
                    style={styles.searchCloseIcon}
                    source={require('../../assets/images/close.png')}
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                onPress={handleSearch}
                style={styles.searchBtnContainer}>
                <Text style={styles.searchBtnText}>Search</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>

        <Text style={styles.mainHeading}>Trending</Text>

        {/* List display */}

        <FlatList
          style={styles.flatlistContainer}
          data={movieList}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          horizontal={true}
        />
      </ScrollView>
    </SafeAreaView>
  );
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
    width: 28,
    height: 28,
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
    fontSize: 36,
    fontFamily: FONTS.MontserratBold,
    color: 'white',
    textAlign: 'left',
    padding: 8,
  },

  welcomeSubTitle: {
    fontSize: 24,
    fontFamily: FONTS.MontserratSemiBold,
    color: 'white',
    textAlign: 'left',
    padding: 8,
  },

  flatlistContainer: {
    height: 320,
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
    marginTop: 18,
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
    borderWidth: 2,
    paddingLeft: 4,
    borderRadius: 12,
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
    fontSize: 18,
    fontFamily: FONTS.MontserratMedium,
    color: 'white',
    alignSelf: 'center',
  },
});

export default HomeTab;
