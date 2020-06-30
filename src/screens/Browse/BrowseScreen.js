import React from "react";
import { View, ActivityIndicator, FlatList, Text, TouchableOpacity, Image } from "react-native";
import { Icon } from "react-native-elements";
//import { enText } from "../lang/en"
import styles from './styles';

export default class BrowseScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title')
    };
  };
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      dataSource: [],
    };
  }

  componentDidMount() { this.fetchData(); }

  fetchData = () => {
    this.setState({ loading: true });

    fetch("https://jsonplaceholder.typicode.com/photos")
      .then(response => response.json())
      .then(responseJson => {
        responseJson = responseJson.map(item => {
          item.isSelect = false;
          item.selectedClass = styles.list;
          return item;
        });

        this.setState({
          loading: false,
          dataSource: responseJson,
        });
      }).catch(error => {
        this.setState({ loading: false });
      });
  };

  FlatListItemSeparator = () => <View style={styles.line} />;

  selectItem = data => {
    data.item.isSelect = !data.item.isSelect;
    data.item.selectedClass = data.item.isSelect ?
      styles.selected : styles.list;
    const index = this.state.dataSource.findIndex(
      item => data.item.id === item.id
    );
    this.state.dataSource[index] = data.item;
    this.setState({
      dataSource: this.state.dataSource,
    });
  };

  goToStore = () => this.props.navigation.navigate("ShopList");//, {selected: this.state.selected,});

  renderItem = data =>
    <TouchableOpacity
      style={[styles.list, data.item.selectedClass]}
      onPress={() => this.selectItem(data)}
    >
      <Image
        source={{ uri: data.item.thumbnailUrl }}
        style={{ width: 40, height: 40, margin: 6 }}
      />
      <Text style={styles.lightText}>  {data.item.title.charAt(0).toUpperCase() + data.item.title.slice(1)}  </Text>
    </TouchableOpacity>

  render() {
    const itemNumber = this.state.dataSource.filter(item => item.isSelect).length;


    const { activeSlide } = this.state;
    const { navigation } = this.props;
    const item = navigation.getParam('item');
  

    if (this.state.loading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="purple" />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Products Available</Text>
        <FlatList
          data={this.state.dataSource}
          ItemSeparatorComponent={this.FlatListItemSeparator}
          renderItem={item => this.renderItem(item)}
          keyExtractor={item => item.id.toString()}
          extraData={this.state}
        />
        <View style={styles.numberBox}>
          <Text style={styles.number}>{itemNumber}</Text>
        </View>
        <TouchableOpacity style={styles.icon}>
          <View>
            <Icon
              raised
              name="shopping-cart"
              type="font-awesome"
              color="#e3e3e3"
              size={30}
              onPress={() => this.goToStore()}
              containerStyle={{ backgroundColor: "#FA7B5F" }}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
