import Proptypes from 'prop-types';
import React from 'react';
import {Text as NativeText} from 'react-native';
import {BLACK} from '../styles/colors';

const fontFamilyWeight = {
  100: '-Thin',
  200: '-ExtraLight',
  300: '-Light',
  400: '-Regular',
  500: '-Medium',
  600: '-SemiBold',
  700: '-Bold',
  800: '-ExtraBold',
  900: '-Black',
  normal: '-Regular',
  'semi-bold': '-SemiBold',
  bold: '-Bold',
};

const TextLabel = ({
  fontSize,
  fontWeight,
  fontStyle,
  lineHeight,
  letterSpacing,
  textAlign,
  color,
  backgroundColor,
  children,
  text,
  style,
  onPressText,
  ...props
}): React.JSX.Element => {
  return (
    <NativeText
      allowFontScaling={false}
      onPress={onPressText}
      style={[
        {
          fontFamily: `Montserrat${fontFamilyWeight[fontWeight]}`,
        },
        {
          fontSize,
          lineHeight,
          letterSpacing,
          textAlign,
          color,
          backgroundColor,
        },
        style,
      ]}
      {...props}>
      {children || text}
    </NativeText>
  );
};

TextLabel.propTypes = {
  fontSize: Proptypes.number,
  fontWeight: Proptypes.string,
  fontStyle: Proptypes.string,
  lineHeight: Proptypes.number,
  letterSpacing: Proptypes.number,
  textAlign: Proptypes.string,
  color: Proptypes.string,
  backgroundColor: Proptypes.string,
  children: Proptypes.any,
  text: Proptypes.string,
  style: NativeText.propTypes.style,
  onPressText: Proptypes.func,
};

TextLabel.defaultProps = {
  fontSize: 14,
  fontWeight: 'normal',
  fontStyle: 'normal',
  lineHeight: 18,
  letterSpacing: 0,
  textAlign: 'center',
  color: BLACK,
};

export default TextLabel;
