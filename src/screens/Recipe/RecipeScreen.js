import React from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  TouchableHighlight,
  Share,
  Alert,
  Modal
} from 'react-native';
import styles from './styles';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { getIngredientName, getCategoryName, getCategoryById, getVegan } from '../../data/MockDataAPI';
import BackButton from '../../components/BackButton/BackButton';
import ViewIngredientsButton from '../../components/ViewIngredientsButton/ViewIngredientsButton';
import { Asset } from 'expo-asset';
import { Video } from 'expo-av';
const { width: viewportWidth } = Dimensions.get('window');

export default class RecipeScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerTransparent: 'true',
      headerLeft: (
        <BackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
      )
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0,
      vegan: null,
      modalVisible: false
    };
  }

  renderImage = ({ item }) => (
    <TouchableHighlight>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: item }} />
      </View>
    </TouchableHighlight>
  );
  _share = () => {
    // Alert.alert(this.state.des);

    Share.share({
      message: this.state.des,
      title: this.state.title,
    });
  };
  onPressIngredient = item => {
    var name = getIngredientName(item);
    let ingredient = item;
    this.props.navigation.navigate('Ingredient', { ingredient, name });
  };
  _setModalVisible = (val) => {
    this.setState({
      modalVisible: val
    });
  };
  _displayVideoIcon = (item) => {
    if (item.video === 'Y') {
      console.log("Yes");

      return (
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Video
                  source={{ uri: item.video_url }}
                  rate={1.0}
                  volume={1.0}
                  isMuted={false}
                  resizeMode="cover"
                  shouldPlay
                  style={{ width: 300, height: 300 }}
                />
                <TouchableHighlight
                  style={{ ...styles.openButton, backgroundColor: "#2196F3", marginTop: 10 }}
                  onPress={() => {
                    this._setModalVisible(!this.state.modalVisible);
                  }}
                >
                  <Text style={styles.textStyle}>Close</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>

          <TouchableHighlight

            onPress={() => {
              this._setModalVisible(true);
            }}>
            <Image style={styles.infoIcon} source={{ uri: item.video_icon }} />
          </TouchableHighlight>
        </View>
      )
    } else {
      console.log("No");
      return null;
    }
  }
  _displayVeganIcon = (item) => {
    if (item.vegan === 'Y') {
      console.log("Yes");

      return (<Image style={styles.infoIcon} source={{ uri: item.icon_vegan }} />

      )
    } else {
      console.log("No");
      return null;
    }
  }
  render() {
    const { activeSlide } = this.state;
    const { navigation } = this.props;
    const item = navigation.getParam('item');
    const category = getCategoryById(item.categoryId);
    const title = getCategoryName(category.id);
    this.state.des = item.description;
    this.state.vegan = item.vegan;
    return (
      <ScrollView style={styles.container}>
        <View style={styles.carouselContainer}>
          <View style={styles.carousel}>
            <Carousel
              ref={c => {
                this.slider1Ref = c;
              }}
              data={item.photosArray}
              renderItem={this.renderImage}
              sliderWidth={viewportWidth}
              itemWidth={viewportWidth}
              inactiveSlideScale={1}
              inactiveSlideOpacity={1}
              firstItem={0}
              loop={false}
              autoplay={false}
              autoplayDelay={500}
              autoplayInterval={3000}
              onSnapToItem={index => this.setState({ activeSlide: index })}
            />
            <Pagination
              dotsLength={item.photosArray.length}
              activeDotIndex={activeSlide}
              containerStyle={styles.paginationContainer}
              dotColor="rgba(255, 255, 255, 0.92)"
              dotStyle={styles.paginationDot}
              inactiveDotColor="white"
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
              carouselRef={this.slider1Ref}
              tappableDots={!!this.slider1Ref}
            />
          </View>
        </View>
        <View style={styles.infoRecipeContainer}>
          <Text style={styles.infoRecipeName}>{item.title}</Text>
          {/* <View style={styles.infoContainer}>
            <TouchableHighlight
              onPress={() => navigation.navigate('RecipesList', { category, title })}
            >
              <Text style={styles.category}>{getCategoryName(item.categoryId).toUpperCase()}</Text>
            </TouchableHighlight>
          </View> */}
          <View style={{ flex: 1, flexDirection: 'row' }}>
            {this._displayVeganIcon(item)}
            {this._displayVideoIcon(item)}
            <TouchableOpacity onPress={() => this._share()} >
              <View  >
                <Image
                  style={styles.infoIcon} source={require('../../../assets/share.png')} />
              </View>
            </TouchableOpacity>
          </View>
          {/* <Text>{this.state.vegan}</Text> */}
          <View style={styles.infoContainer}>
            <Image style={styles.infoPhoto} source={require('../../../assets/icons/time.png')} />
            <Text style={styles.infoRecipe}>{item.time} minutes </Text>
          </View>
          <View style={styles.infoContainer}>
            <ViewIngredientsButton
              onPress={() => {
                let ingredients = item.ingredients;
                let title = 'Ingredients for ' + item.title;
                navigation.navigate('IngredientsDetails', { ingredients, title });
              }}
            />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoDescriptionRecipe}>{item.description}</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}