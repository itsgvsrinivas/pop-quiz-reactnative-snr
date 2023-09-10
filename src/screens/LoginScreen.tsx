import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';
import {MEDIUM_GREY} from '../styles/colors';
import {FONTS} from '../styles/fonts';
import {
  addRating,
  addToWatchList,
  authenticateUser,
  deleteRating,
  getFavoriteMovies,
  getReview,
  getSessionId,
  getToken,
  getUserInfo,
  getWatchListMovies,
} from '../services/api';
import {useDispatch} from 'react-redux';
import {login} from '../reduxStore/slice/UserSlice';
import {
  PASSWORD_PLACEHOLDER,
  RESET_PASSWORD,
  USERNAME_PLACEHOLDER,
} from '../utils/strings';

const LoginScreen = ({route, navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    console.log('[LoginScreen] >>> [init]');
    const response = await getToken();
    const userToken = response.request_token;
    setToken(userToken);
    console.log('[LoginScreen] >>> [init] response:', token);
  };

  const onHandleLogin = async () => {
    console.log('[LoginScreen] >>> [onHandleLogin]');

    const userResponse = await authenticateUser(username, password, token);
    console.log('[LoginScreen] >>> [init] response:', userResponse);
    const sessionResponse = await getSessionId(token);
    console.log('[LoginScreen] >>> [init] sessionResponse:', sessionResponse);
    if (sessionResponse?.success) {
      const sessionId = sessionResponse?.session_id;
      console.log('[LoginScreen] >>> [init] sessionId:', sessionId);
      const userInfoResponse = await getUserInfo(sessionId);
      const accountId = userInfoResponse?.id;
      const userName = userInfoResponse?.username;
      console.log(
        '[LoginScreen] >>> [init] userInfoResponse:',
        userInfoResponse,
      );
      const userInfo = {
        userName: userName,
        token: token,
        sessionId: sessionId,
        accountId: accountId,
      };
      dispatch(login(userInfo));

      //navigate to dashboard
      navigation.navigate('Tabs', {
        screen: 'Dashboard',
      });
    } else {
      //"Invalid username and/or password"
      onHandleFailure('');
    }
  };

  function onHandleFailure(info: string) {
    console.log('[LoginScreen] >>> [onHandleFailure]', info);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <View style={styles.mainHeader}>
            <Image
              style={styles.logo}
              source={require('../assets/images/tmdb.png')}
            />
          </View>

          <View style={styles.wrapper}>
            <Text style={[styles.loginTitle, styles.vspacer]}>
              Login to your account
            </Text>
            <Text style={[styles.desc, styles.vspacer]}>
              In order to use the editing and rating capabilities of TMDB, as
              well as get personal recommendations you will need to login to
              your account. If you do not have an account, registering for an
              account is free and simple.
            </Text>
            <View style={[styles.inputView, styles.vspacer]}>
              <TextInput
                style={styles.TextInput}
                placeholder={USERNAME_PLACEHOLDER}
                placeholderTextColor="#003f5c"
                onChangeText={inputUsername => setUsername(inputUsername)}
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholder={PASSWORD_PLACEHOLDER}
                placeholderTextColor="#003f5c"
                secureTextEntry={true}
                onChangeText={inputPassword => setPassword(inputPassword)}
              />
            </View>
            <TouchableOpacity style={styles.loginBtn} onPress={onHandleLogin}>
              <Text style={styles.loginText}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={[styles.reset, styles.vspacer]}>
                {RESET_PASSWORD}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;

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
    height: '12%',
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
  loginTitle: {
    fontSize: 24,
    fontFamily: FONTS.MontserratBold,
    color: 'black',
    textAlign: 'left',
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
    fontFamily: FONTS.MontserratSemiBold,
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
});
