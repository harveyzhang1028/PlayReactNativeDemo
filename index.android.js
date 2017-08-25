/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
} from 'react-native';

/*
var API_KEY = '7waqfqbprs7pajbz28mqf6vz';
var API_URL = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json';
var PAGE_SIZE = 25;
var PARAMS = '?apikey=' + API_KEY + '&page_limit=' + PAGE_SIZE;
var REQUEST_URL = API_URL + PARAMS;
*/

var MOCKED_MOVIES_DATA = [
  {title: 'Title', year: '2017', posters: {thumbnail: 'http://i.imgur.com/UePbdph.jpg'} },
];

var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';

export default class PropertyFinder extends Component {

  // Add some initial state to our app so that we can check this.state.movies === null
  // to determine whether the movies data has been loaded or not.
  constructor(props) {
    super(props);
    this.state = {
      //movies: null,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  }

  // This is a function of React components that React will call exactlly once, just after the component has been loaded.
  componentDidMount() {
    this._fetchData();
  }

  // Promise chain
  _fetchData() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          //movies: responseData.movies,
          dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
          loaded: true,
        });
      })
      .done();
  }

  _renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>Loading movies...</Text>
      </View>
    );
  }

  _renderMovie(aMovie) {
    //var aMovie = MOCKED_MOVIES_DATA[0];
    return (
      /*
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native! {'\n'}
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
      </View>
      */

        <View style={styles.container}>

          <Image style={styles.thumbnail} source={{uri: aMovie.posters.thumbnail}} />

          <View style={styles.rightContainer}>
            <Text style={styles.title}>Title: {aMovie.title}</Text>
            <Text style={styles.year}>Year: {aMovie.year}</Text>
          </View>

        </View>
    );
  }

  render() {
    /*
    if (!this.state.movies) {
      return this._renderLoadingView();
    }
    var movie = this.state.movies[0];
    return this._renderMovie(movie);
    */

    if (!this.state.loaded) {
      return this._renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this._renderMovie}
        style={styles.listView}
      />
    );

  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',       /* make children layed out horizontally instead of vertically */
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF'
  },

});

AppRegistry.registerComponent('PropertyFinder', () => PropertyFinder);
