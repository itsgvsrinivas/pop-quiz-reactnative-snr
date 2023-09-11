import {Linking} from 'react-native';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import NetInfo from '@react-native-community/netinfo';

export const openUrl = async (url: string) => {
  const isSupported = await Linking.canOpenURL(url);
  if (isSupported) {
    await Linking.openURL(url);
  }
  return isSupported;
};

export const showToast = (type: string, title: string, desc: string) => {
  Toast.show({
    type: type,
    text1: title,
    text2: desc,
  });
};

export const isNetworkAvailable = async () => {
  const response = await NetInfo.fetch();
  return response.isConnected;
};

export const isEmpty = (value: string) => !value || (value && value === '');
