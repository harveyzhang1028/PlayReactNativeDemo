'use strict';

import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	TextInput,
	View,
	Button,
	ActivityIndicator,
	Image,
} from 'react-native';

import SearchResults from './SearchResults';

function urlForQueryAndPage(key, value, pageNumber)
{
	const data = {
		country: 'uk',
		pretty: '1',
		encoding: 'json',
		listing_type: 'buy',
		action: 'search_listings',
		page: pageNumber,
	};
	data[key] = value;

	const queryString = Object.keys(data).map( key => key + '=' + encodeURIComponent(data[key]) ).join('&');

	// https://www.nestoria.co.uk/help/api
	// https://api.nestoria.co.uk/api?country=uk&pretty=1&encoding=json&listing_type=buy&action=search_listings&page=1&place_name=london
	return 'https://api.nestoria.co.uk/api?' + queryString;
}

// Here use `export default` because this class will be imported to index.ios.js file
export default class SearchPage extends Component {

	constructor(props) {
		super(props);

		this.state = {
			searchString: 'London',
			isLoading: false,
			message: '',
		};
	}

	_onSearchTextChanged = (event) => {
		console.log('_onSearchTextChanged');
		this.setState({searchString: event.nativeEvent.text });
		console.log('Current: ' + this.state.searchString + ', Next: ' + event.nativeEvent.text);
	};

	_executeQuery = (query) => {
		console.log(query);
		this.setState({ isLoading: true });

		// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
		// The asynchronous response is returned as a Promise. https://developers.google.com/web/fundamentals/getting-started/primers/promises
		fetch(query)
			.then(response => response.json())
			.then(json => this._handleResponse(json.response))
			.catch(error => this.setState({
				isLoading: false,
				message: 'Something bad happened: ' + error
			}));
	};

	_handleResponse = (response) => {
		this.setState({ isLoading: false, message: '' });

		if (response.application_response_code.substr(0, 1) === '1') {
			console.log('Properties found: ' + response.listings.length);	// the default result size is 20

			// This navi you to SearchResults component and passes in the listings from the API request
			this.props.navigator.push({
				title: 'Results',
				component: SearchResults,
				passProps: {listings: response.listings}
			});

		}
		else {
			this.setState({ message: 'Location not recognized; please try again.' });
		}
	};

	_onSearchPressed = () => {
		const query = urlForQueryAndPage('place_name', this.state.searchString, 1);
		this._executeQuery(query);
	};

	render() {
		console.log('SearchPage.render');
		const spinner = this.state.isLoading ? <ActivityIndicator size='large' /> : null;

		return (
			<View style={styles.container}>
				<Text style={styles.description}>Saerch for houses to buy!</Text>
				<Text style={styles.description}>Saerch by place-name or postcode.</Text>
				<View style={styles.flowRight}>
					<TextInput
						style={styles.searchInput}
						value={this.state.searchString}
						onChange={this._onSearchTextChanged}
						placeholder='Search via name or postcode'/>
					<Button
						onPress={this._onSearchPressed}
						color='#48BBEC'
						title='Go'
					/>
				</View>

				<Image source={require('./Resources/house.png')} style={styles.image} />
				{spinner}
				<Text style={styles.description}>{this.state.message}</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	description: {
		marginBottom: 20,
		fontSize: 18,
		textAlign: 'center',
		color: '#656565'
	},
	container: {
		padding: 30,
		marginTop: 65,
		alignItems: 'center'
	},
	flowRight: {
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'stretch',
	},
	searchInput: {
		height: 36,
		padding: 4,
		marginRight: 5,
		flexGrow: 1,
		fontSize: 18,
		borderWidth: 1,
		borderColor: '#48BBEC',
		borderRadius: 8,
		color: '#48BBEC',
	},
	image: {
		width: 217,
		height: 138,
	}

});
