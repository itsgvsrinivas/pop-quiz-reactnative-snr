import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity, Text} from 'react-native';
import {SHADOW_LIGHT} from '../styles/colors';
import {FONTS} from '../styles/fonts';
import PropTypes from "prop-types";

const RectTile = ({imageSource, text, onPress}): React.JSX.Element => {
  function handlePress() {
    onPress(text);
  }

  return (
    <TouchableOpacity style={styles.tile} onPress={handlePress}>
      <View style={styles.tileWrapper}>
        <Image style={styles.tileLogo} source={imageSource} />
        <Text style={[styles.tileTitle]}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const Memoiz = React.memo(RectTile);

export default Memoiz;

const styles = StyleSheet.create({
  tile: {
    width: 110,
    height: 75,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
    backgroundColor: '#fff',
    shadowColor: SHADOW_LIGHT,
    shadowOpacity: 10,
    margin: 8,
  },
  tileWrapper: {
    flex: 1,
  },
  tileLogo: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    alignSelf: 'center',
    flex: 1,
  },
  tileTitle: {
    fontSize: 14,
    fontFamily: FONTS.MontserratRegular,
    alignSelf: 'center',
    flex: 1,
  },
});
