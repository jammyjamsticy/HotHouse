import React from 'react';
import {
  FlatList,
  Text,
  View,
  TouchableHighlight,
  Image
} from 'react-native';
import styles from './styles';
import { getRecipes, getCategoryName } from '../../data/MockDataAPI';
import Icon from 'react-native-vector-icons/FontAwesome';
export default class RecipesListScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title')
     
    };
  };

  constructor(props) {
    super(props);
  }

  onPressRecipe = item => {
    this.props.navigation.navigate('Recipe', { item });
  };

  renderRecipes = ({ item }) => (
    <TouchableHighlight  onPress={() => this.onPressRecipe(item)}>
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: item.photo_url }} />
        <Text style={styles.title}>{item.title}</Text>
        </View>
    </TouchableHighlight>
    
  );
_submitPage = ()=>{
  this.props.navigation.navigate('Submit');
}
  render() {
    const { navigation } = this.props;
    const item = navigation.getParam('category');
    const recipesArray = getRecipes(item.id);
    return (
      <View>
        <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={recipesArray}
          renderItem={this.renderRecipes}
          keyExtractor={item => `${item.recipeId}`}
        />
        <View style={{height:250,justifyContent:'center',alignItems:'center'}}>
        <TouchableHighlight  onPress={() => this._submitPage()}>
          <View style={{height:100, width:100,backgroundColor:'#802dc4',borderRadius:100/2,alignItems:'center',justifyContent:'center'}}>
          <Icon name="plus" size={50} color="#FFFFFF"  /> 
          </View>
       </TouchableHighlight>
        </View>
      </View>
    );
  }
}
