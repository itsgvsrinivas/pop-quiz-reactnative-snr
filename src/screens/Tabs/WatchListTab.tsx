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
import {DETAILS_SCREEN} from '../../navigation/NavigationConstant';
import {getWatchListMovies} from '../../services/api';
import {MEDIUM_GREY, BLUE} from '../../styles/colors';
import {FONTS} from '../../styles/fonts';
import {BASE_IMAGE_URL} from '../../utils/constants';

const WatchListTab = ({route, navigation}) => {
  const [movieList, setMovieList] = useState([]);

  const accountId = useSelector(state => state.user.accountId);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    console.log('[WatchListTab] >>> [init]');
    //Make an api call to get the watchlist
    const response = await getWatchListMovies(accountId);
    setMovieList(response);
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
    navigation.navigate(DETAILS_SCREEN, {item});
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headingTitle}>My Watchlist</Text>
        </View>

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
    width: '100%',
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

export default WatchListTab;
