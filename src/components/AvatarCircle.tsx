import React from 'react';
import {Text, View} from 'react-native';
import {FONTS} from '../styles/fonts';
import PropTypes from 'prop-types';

const AvatarCircle = ({name}) => {
  const firstChar = name.substring(0, 1).toUpperCase();
  return (
    <View style={styles.avatarLayout}>
      <Text style={styles.logoTitle}>{firstChar}</Text>
    </View>
  );
};

const styles = {
  avatarLayout: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid',
    justifyContent: 'center',
    backgroundColor: 'pink',
  },
  logoTitle: {
    fontSize: 36,
    fontFamily: FONTS.MontserratBold,
    textAlign: 'center',
  },
};

AvatarCircle.propTypes = {
  name: PropTypes.string,
};

AvatarCircle.defaultProps = {
  name: '',
};
export {AvatarCircle};
