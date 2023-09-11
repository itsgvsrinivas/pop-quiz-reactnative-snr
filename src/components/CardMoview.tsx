import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

import TextLabel from '../components/TextLabel';

import {GREY} from '../styles/colors';
import {BASE_IMAGE_URL} from '../utils/constants';

const CardMoview = ({item, index, onPress}): React.JSX.Element => {
  function handlePress() {
    onPress(item, index);
  }

  return (
    <TouchableOpacity onPress={handlePress} style={styles.mainItemContainer}>
      <View style={styles.itemContainer}>
        <Image
          style={styles.img}
          source={{uri: `${BASE_IMAGE_URL}${item.poster_path}`}}
        />
        <TextLabel
          fontSize={14}
          lineHeight={23}
          fontWeight="400"
          textAlign="left"
          text={item.name || item.title}
        />
        <TextLabel
          fontSize={14}
          lineHeight={23}
          fontWeight="400"
          textAlign="left"
          text={item.release_date || item.first_air_date}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainItemContainer: {
    height: '100%',
    marginRight: 16,
    width: 180,
  },
  itemContainer: {
    flex: 1,
    width: '100%',
    height: 48,
    borderColor: GREY,
  },
  img: {
    width: '100%',
    height: '80%',
  },
});

CardMoview.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number,
  onPress: PropTypes.func,
};

CardMoview.defaultProps = {
  onPress: () => {},
};

const Memoiz = React.memo(CardMoview);

export default Memoiz;
