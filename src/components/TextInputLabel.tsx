import PropTypes from 'prop-types';
import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import {GREY} from '../styles/colors';
import {FONTS} from '../styles/fonts';
import TextLabel from './TextLabel';

const TextInputLabel = ({label, ...props}): React.JSX.Element => {
  return (
    <View style={styles.container}>
      <TextLabel
        fontSize={14}
        lineHeight={18}
        fontWeight="400"
        textAlign="left"
        text={label}
      />
      <View style={styles.inputView}>
        <TextInput style={styles.textInput} {...props} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    height: 68,
    justifyContent: 'space-between',
    width: '100%',
  },
  text: {
    borderBottomWidth: 1,
    fontFamily: 'montserrat',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '600',
    height: 48,
    letterSpacing: 0,
    width: '100%',
  },
  inputView: {
    backgroundColor: '#FFF',
    height: 50,
    marginVertical: 6,
    alignItems: 'center',
    borderColor: GREY,
    borderRadius: 25,
    borderStyle: 'solid',
    borderWidth: 1,
    width: '100%',
  },
  textInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 5,
    fontSize: 14,
    fontFamily: FONTS.MontserratRegular,
  },
});

TextInputLabel.propTypes = {
  label: PropTypes.string.isRequired,
};

TextInputLabel.defaultProps = {
  label: '',
};

const Memoiz = React.memo(TextInputLabel);

export default Memoiz;
