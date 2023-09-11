import {Linking} from 'react-native';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

export const openUrl = async (url: string) => {
  const isSupported = await Linking.canOpenURL(url);
  if (isSupported) {
    await Linking.openURL(url);
  }
  return isSupported;
};

export const showToast = (type, title, desc) => {
  Toast.show({
    type: type,
    text1: title,
    text2: desc,
  });
};
