import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

const AvatarCircle = ({onPress, source}) => {
  return (
    <TouchableWithoutFeedback style={styles.avatarLayout} onPress={onPress}>
      <Image style={styles.avatar} source={source} />
    </TouchableWithoutFeedback>
  );
};

const styles = {
  avatarLayout: {
    width: 80,
    height: 80,
    flexDirection: 'column',
    borderRadius: 100 / 2,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
  },
};
export {AvatarCircle};
