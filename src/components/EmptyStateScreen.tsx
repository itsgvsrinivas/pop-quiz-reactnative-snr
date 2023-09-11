import React from 'react';
import {View, StyleSheet} from 'react-native';
import {EMPTY_TEXT} from '../utils/strings';
import TextLabel from './TextLabel';

const EmptyStateScreen = () => {
  return (
    <View style={styles.emptyStateContainer}>
      <TextLabel
        fontSize={16}
        lineHeight={23}
        fontWeight="400"
        textAlign="center"
        text={EMPTY_TEXT}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  emptyStateContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
});

export default EmptyStateScreen;
