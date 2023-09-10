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
  authenticateUser,
  clearSession,
  getSessionId,
  getToken,
} from '../services/api';

const Login = ({route, navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    console.log('[Login] >>> [init]');
    const response = await getToken();
    console.log('[Login] >>> [init] response:', response);
    const token = response.request_token;
    setToken(token);
    console.log('[Login] >>> [init] response:', token);
  };

  const onHandleLogin = async () => {
    console.log('[Login] >>> [onHandleLogin]');
    //setItemWatchlist(!isItemWatchlist);
    //make an api call to add to watchlist
    const response = await authenticateUser(username, password, token);
    console.log('[Login] >>> [init] response:', response);

    //const response = await clearSession(token);
    const response1 = await getSessionId(token);
    console.log('[Login] >>> [init] response1:', response1);
    if (response1?.success) {
      const session_id = response1?.session_id;
      console.log('[Login] >>> [init] session_id:', session_id);
      navigation.canGoBack() && navigation.goBack();
    } else {
      //"Invalid username and/or password"
    }
  };

  const onHandleClose = () => {
    console.log('[Login] >>> [onHandleLogin11]');
    //setItemWatchlist(!isItemWatchlist);
    //make an api call to add to watchlist
    navigation.canGoBack() && navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <View style={styles.mainHeader}>
            <Image
              style={styles.logo}
              source={require('../assets/images/tmdb.png')}
            />
            <TouchableOpacity onPress={() => onHandleClose()}>
              <Image
                style={styles.close}
                source={require('../assets/images/close.png')}
              />
            </TouchableOpacity>
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
                placeholder="Username"
                placeholderTextColor="#003f5c"
                onChangeText={username => setUsername(username)}
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholder="Password."
                placeholderTextColor="#003f5c"
                secureTextEntry={true}
                onChangeText={password => setPassword(password)}
              />
            </View>
            <TouchableOpacity style={styles.loginBtn} onPress={onHandleLogin}>
              <Text style={styles.loginText}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={[styles.reset, styles.vspacer]}>Reset Password</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

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
