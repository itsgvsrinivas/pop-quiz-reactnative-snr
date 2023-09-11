import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';
import {BLUE_BERLIN, MEDIUM_GREY} from '../../styles/colors';
import {FONTS} from '../../styles/fonts';
import {FAVOURITES_TYPE, RATINGS_TYPE} from '../../utils/data';
import {useSelector} from 'react-redux';
import {MOVIES_LIST_SCREEN} from '../../navigation/NavigationConstant';
import {MY_FAVOURITES, MY_RATINGS} from '../../utils/strings';
import RectTile from '../../components/RectTile';
import {AvatarCircle} from '../../components/AvatarCircle';
import imageAssets from '../../assets/images';

const ProfileTab = ({route, navigation}) => {
  const [name, setName] = useState('');
  const [memberYear, setMemberYear] = useState('');

  const {userName} = useSelector(state => state.user);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    console.log('[ProfileTab] >>> [init]');
    setName(userName ?? '');
    setMemberYear('2023');
  };

  const onPressMyFavourites = () => {
    console.log('[ProfileTab] >>> [onPressMyFavourites]');
    navigation.navigate(MOVIES_LIST_SCREEN, {type: FAVOURITES_TYPE});
  };

  const onPressMyRatings = () => {
    console.log('[ProfileTab] >>> [onPressMyRatings]');
    navigation.navigate(MOVIES_LIST_SCREEN, {type: RATINGS_TYPE});
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <View style={styles.mainHeader}>
            <Image style={styles.logo} source={imageAssets.tmdb} />
          </View>
          <View style={styles.wrapper}>
            <AvatarCircle name={name} />
            <Text style={[styles.username, styles.vspacer]}>{name}</Text>
            <Text style={[styles.tileTitle]}>Member since {memberYear}</Text>

            {/*  tiles */}
            <View style={[styles.tileMainWrapper, styles.vspacer]}>
              {/* My Favourites */}
              <RectTile
                imageSource={imageAssets.defaultLike}
                text={MY_FAVOURITES}
                onPress={onPressMyFavourites}
              />
              {/* My Ratings */}
              <RectTile
                imageSource={imageAssets.starBlack}
                text={MY_RATINGS}
                onPress={onPressMyRatings}
              />
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
    backgroundColor: BLUE_BERLIN,
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
  loginText: {
    fontSize: 14,
    fontFamily: FONTS.MontserratSemiBold,
  },
  tileMainWrapper: {
    flex: 1,
    flexDirection: 'row',
  },
});
