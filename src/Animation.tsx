import React from 'react';
import {Button, SafeAreaView, StyleSheet, Dimensions} from 'react-native';
import Animated, {useSharedValue, withSpring} from 'react-native-reanimated';

const Animation = () => {
  const width = useSharedValue<number>(10);
  const height = useSharedValue<number>(10);
  const onPress = () => {
    width.value = width.value<=Dimensions.get('window').width-100? withSpring(width.value + 50):withSpring(50);
    height.value =height.value< Dimensions.get('window').width-100? withSpring(height.value + 50):withSpring(50);
  };
  return (
    <SafeAreaView>
      <Animated.View style={[style.view, {width, height}]}></Animated.View>
      <Button title="Click Me" onPress={onPress} />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  view: {
    height: 10,
    width: 10,
    backgroundColor: 'orange',
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20,
  },
});

export default Animation;
