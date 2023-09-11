import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';
import {BLUE_BERLIN, BLUE_BRIGHT, GREY, MEDIUM_GREY} from '../styles/colors';
import {FONTS} from '../styles/fonts';
import {
  authenticateUser,
  getSessionId,
  getToken,
  getUserInfo,
} from '../services/api';
import {useDispatch} from 'react-redux';
import {login} from '../reduxStore/slice/UserSlice';
import {
  COMMON_ERROR_MSG,
  LOGIN_SUB_TITLE,
  LOGIN_TITLE,
  NETWORK_CONNECTION_ERROR,
  PASSWORD_PLACEHOLDER,
  RESET_PASSWORD,
  SIGN_UP,
  USERNAME_PLACEHOLDER,
  USER_DETAILS_EMPTY_ERROR,
} from '../utils/strings';
import {RESET_PASSWORD_URL, SIGNUP_URL} from '../utils/url';
import {
  isEmpty,
  isNetworkAvailable,
  openUrl,
  showToast,
} from '../utils/utility';
import {HOME_TAB, TAB} from '../navigation/NavigationConstant';
TextLabel;
import TextLabel from '../components/TextLabel';
import TextInputLabel from '../components/TextInputLabel';
import imageAssets from '../assets/images';

const LoginScreen = ({route, navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      init();
    });
    return unsubscribe;
  }, [navigation]);

  const init = async () => {
    getRequestToken();
  };

  const getRequestToken = async () => {
    try {
      //make an api call to get token
      const response = await getToken();
      if (response.success) {
        const requestToken = response.request_token;
        setToken(requestToken);
        console.log('[LoginScreen] >>> [getRequestToken]:', requestToken);
      }
    } catch (e) {
      console.log('[LoginScreen] >>> [getRequestToken] [error]: ', e);
    }
  };

  /* Handle user login */
  const onHandleLogin = async () => {
    console.log('[LoginScreen] >>> [onHandleLogin]');
    try {
      if (isEmpty(username) || isEmpty(password)) {
        showToast('error', '', USER_DETAILS_EMPTY_ERROR);
        return;
      }

      const isConnected = await isNetworkAvailable();
      if (!isConnected) {
        showToast('error', '', NETWORK_CONNECTION_ERROR);
        return;
      }
      //check if token is not empty
      if (token === '') {
        await getRequestToken();
      }

      const userResponse = await authenticateUser(username, password, token);
      if (!userResponse?.success) {
        showToast('error', '', COMMON_ERROR_MSG);
        return;
      }

      const sessionResponse = await getSessionId(token);
      if (sessionResponse?.success) {
        const sessionId = sessionResponse?.session_id;
        const userInfoResponse = await getUserInfo(sessionId);
        if (userInfoResponse?.id) {
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
          //navigate to HomeTab - dashboard
          navigation.navigate(TAB, {
            screen: HOME_TAB,
          });
        } else {
          showToast('error', '', COMMON_ERROR_MSG);
        }
      } else {
        //"Invalid username and/or password"
        showToast('error', '', 'Invalid username and/or password');
      }
    } catch (e) {
      showToast('error', '', COMMON_ERROR_MSG);
      console.log('[LoginScreen] >>> [onHandleLogout] [error]: ', e);
    }
  };

  const onHandleReset = async () => {
    console.log('[LoginScreen] >>> [onHandleReset]');
    const url = RESET_PASSWORD_URL;
    const isSupported = openUrl(url);
    if (!isSupported) {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };

  const onHandleSignup = async () => {
    console.log('[LoginScreen] >>> [onHandleSignup]');
    const url = SIGNUP_URL;
    const isSupported = openUrl(url);
    if (!isSupported) {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          {/* Header */}
          <View style={styles.mainHeader}>
            <Image style={styles.logo} source={imageAssets.tmdb} />
          </View>

          {/* Title */}
          <View style={styles.wrapper}>
            <TextLabel
              fontSize={24}
              lineHeight={23}
              fontWeight="700"
              textAlign="left"
              text={LOGIN_TITLE}
            />
            <View style={styles.vspacer} />

            {/* SubTitle */}
            <TextLabel
              fontSize={14}
              lineHeight={23}
              fontWeight="400"
              textAlign="left"
              text={LOGIN_SUB_TITLE}
            />

            <View style={styles.vspacer} />

            {/* User name textinput field */}
            <TextInputLabel
              style={styles.TextInput}
              placeholder={USERNAME_PLACEHOLDER}
              placeholderTextColor={GREY}
              onChangeText={inputUsername => setUsername(inputUsername)}
              label="Username"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <View style={styles.vspacer} />

            {/* Pasword textinput field */}

            <TextInputLabel
              style={styles.TextInput}
              placeholder={PASSWORD_PLACEHOLDER}
              placeholderTextColor={GREY}
              onChangeText={inputPassword => setPassword(inputPassword)}
              label="Password"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={true}
            />

            <View style={styles.vspacer} />

            <View style={styles.bottomContainer}>
              {/* Login button */}
              <TouchableOpacity style={styles.loginBtn} onPress={onHandleLogin}>
                <TextLabel
                  fontSize={14}
                  lineHeight={23}
                  fontWeight="600"
                  textAlign="left"
                  text="LOGIN"
                />
              </TouchableOpacity>

              {/* Reset button */}
              <TouchableOpacity onPress={onHandleReset}>
                <TextLabel
                  fontSize={14}
                  lineHeight={23}
                  fontWeight="600"
                  text={RESET_PASSWORD}
                  color={BLUE_BRIGHT}
                  style={styles.vspacer}
                />
              </TouchableOpacity>

              {/* Signup button */}
              <TouchableOpacity onPress={onHandleSignup}>
                <TextLabel
                  fontSize={14}
                  lineHeight={23}
                  fontWeight="600"
                  text={SIGN_UP}
                  color={BLUE_BRIGHT}
                  style={styles.vspacer}
                />
              </TouchableOpacity>
            </View>
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
    backgroundColor: BLUE_BERLIN,
    height: '12%',
  },
  logo: {
    width: 60,
    height: 48,
    resizeMode: 'contain',
    alignSelf: 'center',
    flex: 1,
  },
  vspacer: {
    marginVertical: 8,
  },
  wrapper: {
    padding: 24,
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 5,
    fontSize: 14,
    fontFamily: FONTS.MontserratRegular,
  },

  loginBtn: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
    backgroundColor: BLUE_BRIGHT,
  },

  bottomContainer: {alignItems: 'center', justifyContent: 'center'},
});
