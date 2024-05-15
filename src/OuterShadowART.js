import React from 'react';
import { ShadowARTType } from './types';
import { StyleSheet } from 'react-native';
// import { Surface, Shape, Group } from '@react-native-community/art';
import Svg,{ Path, G } from 'react-native-svg';
import { getPathWithRadius, transformShadowPropsForAndroid } from './helpers';

export default class OuterShadowART extends React.PureComponent {
  render() {
    const {
      width = 0,
      height = 0,
      borderRadius,
      radius,
      shadowOffset,
      opacity,
      color,
      backgroundColor,
    } = this.props;

    const shadowProps = transformShadowPropsForAndroid({
      opacity,
      shadowOffset,
      radius,
      color,
    });

    const path = getPathWithRadius(width, height, borderRadius);
    const absOffsetX = Math.abs(shadowOffset.x);
    const absOffsetY = Math.abs(shadowOffset.y);

    return (
      <Svg
        height={height + shadowRadius * 2 + absOffsetY * 2}
        width={width + shadowRadius * 2 + absOffsetX * 2}
        style={[
          styles.surface,
          { top: -shadowRadius - absOffsetY, left: -shadowRadius - absOffsetX },
        ]}>
        <G x={shadowRadius + absOffsetX} y={shadowRadius + absOffsetY}>
          <Path d={path} fill={backgroundColor} {...shadowProps} />
        </G>
      </Svg>
    );
  }
}

const styles = StyleSheet.create({
  surface: {
    backgroundColor: 'transparent',
    position: 'absolute',
  },
});

OuterShadowART.propTypes = ShadowARTType;
