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
import {MEDIUM_GREY} from '../styles/colors';
import {FONTS} from '../styles/fonts';
import {BASE_IMAGE_URL} from '../utils/constants';

const DetailScreen = ({route, navigation}) => {
  const [item, setItem] = useState('');
  const [isItemWatchlist, setItemWatchlist] = useState(false);

  const addWatchlist = require('../assets/images/bookmark.png');
  const removeFromWatchlist = require('../assets/images/unbookmark.png');

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    console.log('[DetailScreen] >>> [init] route: ', route.params?.item);
    const item = route.params?.item;
    setItem(item);
    //make an api call to check if the item is in watchlist
    setItemWatchlist(isItemWatchlist);
    console.log('[DetailScreen] >>> [init] item: ', item);
  };

  const onPressBack = () => {
    console.log('[DetailScreen] >>> [onPressBack]');
    navigation.canGoBack() && navigation.goBack();
    //navigation.navigate('DetailScreen', {item});
    //navigation.navigate('HomeStack', {screen: 'Dashboard'});
    /*  navigation.navigate('HomeStack', {
      screen: 'Dashboard',
      params: {
        service: 'myservice',
        from: 'myfrom',
      },
      initial: false,
    }); */

    /*     navigation.navigate('HomeStack', {
      screen: 'Dashboard',
    }); */
  };

  const onPressLike = () => {
    console.log('[DetailScreen] >>> [onPressLike]', !isItemWatchlist);
    setItemWatchlist(!isItemWatchlist);
    //make an api call to add to watchlist
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => onPressBack()}>
              <Image
                style={styles.backButton}
                source={require('../assets/images/back.png')}
              />
            </TouchableOpacity>

            <Text style={styles.headingTitle}> {item.name || item.title}</Text>

            <TouchableOpacity onPress={() => onPressLike()}>
              <Image
                style={styles.addWatchlist}
                source={isItemWatchlist ? addWatchlist : removeFromWatchlist}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.mainContainer}>
            <Image
              style={[styles.img, styles.spacing]}
              source={{uri: `${BASE_IMAGE_URL}${item?.backdrop_path}`}}
            />
            <Text style={[styles.title, styles.spacing]}>
              {' '}
              {item.name || item.title}
            </Text>

            <Text style={[styles.desc, styles.spacing]}>{`Release date: ${
              item.release_date || item.first_air_date
            }`}</Text>
            <Text
              style={[
                styles.desc,
                styles.spacing,
              ]}>{`User score: ${item.vote_average}/10 (${item.vote_count} votes)`}</Text>
            <Text style={[styles.desc, styles.spacing]}>{item?.overview}</Text>
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
    marginRight: 8,
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
