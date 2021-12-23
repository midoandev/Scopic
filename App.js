
import { Root } from 'native-base';
import React from 'react';
import {  View, LogBox } from 'react-native';

import Zite from './src/Zite'
LogBox.ignoreLogs([ 'Non-serializable values were found in the navigation state', ]);

export default class App extends React.Component {
  render() {
    return ( 
    <Root>
      <Zite/>
    </Root>

    );
  }
} 

