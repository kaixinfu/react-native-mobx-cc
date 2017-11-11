/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Realm from 'realm';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component<{}> {
  
  constructor(props) {
      super(props);
      this.state = { realm: null };
  }
  
  componentWillMount() {
      Realm.open({
          schema: [{name: 'Dog', properties: {name: 'string'}}]
      }).then(realm => {
          realm.write(() => {
              realm.create('Dog', {name: 'Rex'});
          });
          this.setState({ realm });
      });
  }
	
	render() {
	  console.log('Realm...', Realm)
        console.log(__DEV__)
    const info = this.state.realm
        ? 'Number of dogs in this Realm: ' + this.state.realm.objects('Dog').length
        : 'Loading...';
	  console.log('this.state.realm', this.state.realm)
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
            {info}
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});
