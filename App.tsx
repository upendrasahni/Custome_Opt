/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useRef} from 'react';
import {
  Dimensions,
  Image,
  NativeSyntheticEvent,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TextInputKeyPressEventData,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import image from './Images';

function App(): React.JSX.Element {
  const [state, setState] = useState<string[]>(Array(4).fill(''));
  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const inputs: React.RefObject<TextInput>[] = Array.from({length: 4}, () =>
    useRef<TextInput>(null),
  );
  const backgroundStyle = {
    backgroundColor: 'white',
  };

  const borderColor = (index: number) => {
    return index === focusedIndex ? '#1E7895' : '#ECECEC';
  };

  const handleFocus = (index: number) => {
    setFocusedIndex(index);
    inputs[index].current?.focus();
  };

  const handleInputChange = (index: number) => (text: string) => {
    const {values} = state;
    if (text.length === 1 && index < inputs.length) {
      updateValue(index, text);
      if (index === 3) {
        inputs[index].current?.focus();
        setFocusedIndex(index);
      } else {
        inputs[index + 1].current?.focus();
        setFocusedIndex(index + 1);
        // setState(prevState => ({...prevState, focusedIndex: index + 1}));
      }
    }
  };

  const handleKeyPress =
    (index: number) =>
    (event: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
      const {key} = event.nativeEvent;

      if (!isNaN(Number(key)) && index >= 0 && index < inputs.length) {
        if (state[index].length === 1) {
          if (index === 3) {
            inputs[index].current?.focus();
            updateValue(index, key);
            setFocusedIndex(index);
          } else {
            inputs[index + 1].current?.focus();
            updateValue(index, key);
            setFocusedIndex(index + 1);
          }
        }
      }

      if (key === 'Backspace' && index >= 0) {
        updateValue(index, '');
        if (index === 0) {
          inputs[index].current?.focus();
          setFocusedIndex(index);
        } else {
          setFocusedIndex(index - 1);
          inputs[index - 1].current?.focus();
        }
      }
    };

  const updateValue = (index: number, value: string) => {
    setState(prevState => prevState.map((v, i) => (i === index ? value : v)));
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <Image source={image.imageOne} style={styles.imageStyle} />
      <Text style={styles.verficationCodeStyle}>Verification code</Text>
      <Text style={styles.subHead}>
        Please enter the verfication code sent{'\n'} to your mobile number.
      </Text>
      <View style={styles.parentContainer}>
        <Text style={styles.numberTextStyle}>+91 98765 43210</Text>
        <Image source={image.imageTwo} style={styles.imageTwoStyle} />
      </View>
      <View style={styles.box}>
        {inputs.map((input, index) => (
          <TouchableOpacity
            activeOpacity={1}
            style={[styles.inputContainer, {borderColor: borderColor(index)}]}
            key={index}>
            <TextInput
              style={styles.input}
              maxLength={1}
              ref={input}
              caretHidden
              onPressIn={() => handleFocus(index)}
              value={state[index]}
              keyboardType="numeric"
              onChangeText={handleInputChange(index)}
              onKeyPress={handleKeyPress(index)}
            />
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.resendparent} activeOpacity={0.6}>
        <Text style={styles.resenText}>Resend</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.resendparent,{marginTop:20,backgroundColor:'#1E7895'}]} activeOpacity={0.6}>
        <Text style={[styles.resenText,{color:'white'}]}>Submit</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  imageStyle: {
    height: Dimensions.get('window').height * 0.25,
    width: Dimensions.get('window').width * 0.5,
    resizeMode: 'cover',
    alignSelf: 'center',
    marginTop: 60,
  },
  verficationCodeStyle: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  subHead: {
    alignSelf: 'center',
    textAlign: 'center',
    marginHorizontal: 50,
    marginTop: 15,
    fontSize: 16,
    color: '#C7C9D0',
  },
  parentContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    alignSelf: 'center',
    marginTop: 15,
  },
  imageTwoStyle: {
    height: 15,
    width: 15,
    tintColor: '#247B98',
    marginStart: 10,
  },
  numberTextStyle: {
    fontSize: 15,
    color: 'black',
    fontWeight: '500',
  },
  inputContainer: {
    borderWidth: 2,
    height: 40,
    width: 40,
    borderColor: Colors.grey,
    borderRadius: 8,
  },
  box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '60%',
    marginTop: 30,
    alignSelf: 'center',
  },
  input: {
    flex: 1,
    color: 'black',
    textAlign: 'center',
  },
  resendparent: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ECECEC',
    alignSelf: 'center',
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 35,
  },
  resenText: {
    color: '#ABAFBA',
    fontSize: 16,
    marginVertical: 12,
    fontWeight: '500',
  },
});

export default App;
