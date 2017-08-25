/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

/**
 * This enables Strict Mode, which adds improved error handling and disable some less-than-ideal JavaScript language features.
 * In simple terms, it makes JavaScript better!
 */
'use strict';

import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
} from 'react-native';

import SearchPage from './SearchPage';

/* No need anymore. The above line import the SearchPage

// Components contain immutable properties, mutable state variables and expose a method for rendering.
export default class SearchPage extends Component {
  render() {
    //return React.createElement(Text, {style: styles.description}, "Search for houses to buy!");

    // Use JSX format
    return <Text style={styles.description}>Search for houses to buy!</Text>;
  }
}
*/

class PropertyFinder extends Component {
  render() {
    return (
      <NavigatorIOS 
        style={styles.container}
        initialRoute={{
          title: 'Property Finder',
          component: SearchPage,
        }}
      />
    );
  }
}

// Still need this. This is use only for this file.
const styles = StyleSheet.create({
  description: {
    fontSize: 18,
    textAlign: 'center',
    color: '#656565',
    marginTop: 65,
  },
  container: {
    flex: 1,
  },
  
});

AppRegistry.registerComponent('PropertyFinder', () => PropertyFinder);
