'use strict';

import React, { Component } from 'react';
import {
	StyleSheet,
	Image,
	View,
	TouchableHighlight,
	FlatList,
	Text,
} from 'react-native';

const styles = StyleSheet.create({
	thumb: {
		width: 80,
		height: 80,
		marginRight: 10
	},
	textContainer: {
		flex: 1
	},
	separator: {
		height: 1,
		backgroundColor: '#dddddd'
	},
	price: {
		fontSize: 25,
		fontWeight: 'bold',
		color: '#656565'
	},
	title: {
		fontSize: 20,
		color: '#656565'
	},
	rowContainer: {
		flexDirection: 'row',
		padding: 10
	},

});

export default class SearchResults extends Component {

	_keyExtractor = (item, index) => index;

	/* v1
	_renderItem = ({item}) => {
		return (
			<TouchableHighlight underlayColor='#dddddd'>
				<View>
					<Text>{item.title}</Text>
				</View>
			</TouchableHighlight>
		);
	};
	*/

	// v2
	_renderItem = ({item, index}) => (
		<ListItem
			item={item}
			index={index}
			onPressItem={this._onPressItem}
		/>
	);

	// this function is passed into ListItem to handle a row selection. Like a callback.
	_onPressItem = (index) => {
		console.log('Pressed row: ' + index);
	};

	// FlatList component displays rows of data within a scrolling container, similar to UITableView.
	// Here is the FlatList properties
	render() {
		return(
			<FlatList
				data={this.props.listings}			  // provide the data to display
				keyExtractor={this._keyExtractor} // provide a unique key that React uses for efficient list item management
				renderItem={this._renderItem}     // specify how the UI is rendered for each row
			/>
		);
	};

};

// React re-renders a component if its props or state changes
class ListItem extends React.PureComponent {

	_onPress = () => {
		this.props.onPressItem(this.props.index);
	}

	render() {
		const item = this.props.item;
		const price = item.price_formatted.split(' ')[0];
		return (
			<TouchableHighlight onPress={this._onPress} underlayColor='#dddddd'>
				<View>
					<View style={styles.rowContainer}>
						<Image style={styles.thumb} source={{ uri: item.img_url }} />
						<View style={styles.textContainer}>
							<Text style={styles.price}>{price}</Text>
							<Text style={styles.title} numberOfLines={1}>{item.title}</Text>
						</View>
					</View>
					<View style={styles.separator} />
				</View>
			</TouchableHighlight>
		);
	}

};
