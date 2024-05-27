import React, {useEffect, useState} from 'react';
import {Button, SafeAreaView, StyleSheet, Dimensions, View} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDecay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const AnimationTwo = () => {
  const translateY = useSharedValue<number>(0);
  const offset = useSharedValue<number>(0);
  const width = useSharedValue<number>(0);
  const SIZE = 120;

  const animation = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withRepeat(
            withTiming(translateY.value, {duration: 1500}),
            -1,
            true,
          ),
        },
      ],
    };
  });
  // withRepeat(withSpring(translateY.value))
  useEffect(() => {
    onPress();
  }, []);

  const onPress = () => {
    if (translateY.value < Dimensions.get('window').height - 100) {
      translateY.value = Dimensions.get('window').height - 200;
    } else {
      translateY.value = 0;
    }
  };

  const pan = Gesture.Pan()
    .onChange(event => {
      offset.value += event.changeX;
    })
    .onFinalize(event => {
      offset.value = withDecay({
        velocity: event.velocityX,
        rubberBandEffect: true,
        clamp: [-(width.value / 2) + SIZE / 2, width.value / 2 - SIZE / 2],
      });
    });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{translateX: offset.value}],
  }));

  return (
    <SafeAreaView style={{flex: 1}}>
      <GestureHandlerRootView style={{flex: 1}}>
        <Animated.View style={[styles.view, animation]} />
        <GestureDetector gesture={pan}>
          <Animated.View style={[styles.box,animatedStyles] } />
        </GestureDetector>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  view: {
    height: 50,
    width: 50,
    backgroundColor: 'orange',
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginTop: 20,
  },
  box: {
    height: 20,
    width: 80,
    backgroundColor: 'red',
    borderRadius: 10,
    position: 'absolute',
    bottom: 1,
    alignSelf: 'center',
    marginBottom: 60,
  },
});

export default AnimationTwo;
