import React, { Component } from "react";
import {
  ActivityIndicator,
  Button,
  Clipboard,
  Image,
  Share,
  StatusBar,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
  FlatList,
  TextInput,
  Alert,
  TouchableHighlight
} from "react-native";
import styles from './styles';
import { Constants } from "expo";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import Card from '../../components/Card';
import Colors from '../../constants/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CheckBox } from 'react-native-elements';
import Textarea from 'react-native-textarea';

export default class App extends Component {
  state = {
    image: null,
    uploading: false,
    checked: false,
    title: '',
    caption: '',
    instructions: '',
    time: '',
    categoryId: '',
    name: '',
    amt: '',
    metric: '',
    addedIngredients: [],
    ingredients: [
      {
        key: 1,
        name: '',
        amount: '',
        metrick: ''
      }
    ],
    categories: [
      {
        id: 1,
        name: 'Low\nFat',
        color: 'skyblue',
      },
      {
        id: 2,
        name: 'Sugar\nFree',
        color: 'skyblue'
      },
      {
        id: 3,
        name: 'Lactose\nFree',
        color: 'skyblue'
      },
      {
        id: 4,
        name: 'Gulten\nFree',
        color: 'skyblue'
      },
      {
        id: 5,
        name: 'Fish\nFree',
        color: 'skyblue'
      }
    ],
  };

  onSubmit() {
    const { title, caption, instructions, time } = this.state;
    Alert.alert('Your Recipe has been Submitted...!!!');
    //Alert.alert('Title', `${title}` + 'Caption' + `${caption}` + 'Instruction' + `${instructions}` + 'Time' + `${time}`);
  }

  renderCategories = (item) => {
    return (
      <TouchableOpacity style={{
        height: 80, width: 80, padding: 5,
        borderRadius: 80 / 2, backgroundColor: item.item.color,
        justifyContent: 'center', marginLeft: 5
      }} onPress={() => this.showCategory(item.item.id)}>
        <Text style={{ textAlign: 'center' }}>{item.item.name}</Text></TouchableOpacity>
    )
  }
  showCategory = (selectedId) => {
    const data = this.state.categories

    const selItem = data.findIndex((obj => obj.id == selectedId))
    if (data[selItem].color === 'red') {
      data[selItem].color = 'skyblue'
    } else {
      data[selItem].color = 'red'
    }
    this.setState({ categories: data })
  }


  _renderRow = () => {
    return (
      <View style={{ flex: 1, flexDirection: 'row', }}>
        <View style={{ width: '45%', height: 50, paddingRight: 5 }}>
          <TextInput
            value={this.state.name}
            onChangeText={(name) => this.setState({ name })}
            containerStyle={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}
            style={{
              width: '100%', borderColor: 'gray', borderWidth: 1, height: 50, textAlignVertical: 'top',
              borderRadius: 5, backgroundColor: '#FFFFFF'
            }}
            placeholder="Name"
          />
        </View>
        <View style={{ width: '20%', height: 50, paddingRight: 5 }}>
          <TextInput
            value={this.state.amt}
            onChangeText={(amt) => this.setState({ amt })}
            containerStyle={{ width: '100%', flexDirection: 'row', backgroundColor: 'FFFFFF' }}
            style={{
              width: '100%', borderColor: 'gray', borderWidth: 1, height: 50, textAlignVertical: 'top',
              borderRadius: 5, backgroundColor: '#FFFFFF'
            }}
            placeholder="Amt"
          />
        </View>
        <View style={{ width: '20%', height: 50, }}>
          <TextInput
            value={this.state.metric}
            onChangeText={(metric) => this.setState({ metric })}
            containerStyle={{ width: '100%', flexDirection: 'row' }}
            style={{ width: '100%', borderColor: 'gray', borderWidth: 1, height: 50, textAlignVertical: 'top', borderRadius: 5, backgroundColor: '#FFFFFF' }}
            placeholder="Metric"
          />
        </View>
        <View style={{ width: '15%', height: 50, justifyContent: 'center', alignItems: 'center' }}>
          <Icon name="plus" size={30} color="#900" onPress={() => this._addRow(this)} />
        </View>
      </View>
    )
  }
  _addRow = (item) => {
    let dataArray = this.state.ingredients;
    const lastItem = dataArray.slice(-1).pop()
    const newKey = lastItem.key++
    const newItem = {
      key: newKey,
      name: '',
      amount: '',
      metrick: ''
    }
    dataArray.push(newItem);
    this.setState({ ingredients: dataArray });
  }

  render() {
    let { image } = this.state;

    return (
      <ScrollView>
          <View style={styles.container}>
            <StatusBar barStyle="default" />
            <Card style={styles.inputContainer}>
              <Text style={styles.exampleText}>
                Upload Your Food
              </Text>
              <View style={styles.buttonContainer}>
              <View style={{ width: '50%', backgroundColor: '#FFFFFF',alignItems:'flex-end' }}>
                <TouchableHighlight onPress={this._pickImage}>
                  <Image source={require('../../../assets/GalleryIcon.png')} style={styles.categoriesPhoto} />
                </TouchableHighlight>
              </View>
              <View style={{width:30}}></View>
              <View style={{ width: '50%',marginRight:15,marginTop:5,marginRight:20 }}>
                <TouchableHighlight onPress={this._takePhoto}>
                  <Image source={require('../../../assets/CameraIcon.png')} style={styles.categoriesPhoto} />
                </TouchableHighlight>
              </View>
            </View>
            </Card>

            {this._maybeRenderImage()}
            {this._maybeRenderUploadingOverlay()}
            {/* {this._showNutrition()} */}

            <TextInput
              value={this.state.title}
              onChangeText={(title) => this.setState({ title })}
              containerStyle={styles.textContainer}
              style={styles.text2}
              placeholder="Title"
            />
            <Textarea
              value={this.state.caption}
              onChangeText={(caption) => this.setState({ caption })}
              containerStyle={styles.textareaContainer}
              style={styles.textarea}
              placeholder="Caption"
            />

            <View style={{ width: '100%', height: 300, borderWidth: 1, borderColor: 'grey', flex: 1, 
            flexDirection: 'column', marginTop: -40, marginBottom: 10,borderRadius:5 }}>
              <View style={{ width: '100%', height: '30%' }}>
                <View style={{ flex: 1, flexDirection: 'row', height: '20%' }}>
                  <View style={{ width: '50%', height: 60, justifyContent: 'center', paddingLeft: 15 }}>
                    <Text style={{ fontSize: 20 }}>Ingredients</Text>
                  </View>
                  <View style={{ width: '50%', height: 60, justifyContent: 'center', padding: 8 }}>
                    <TextInput
                      containerStyle={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}
                      style={{ width: '100%', borderColor: 'gray', borderWidth: 1, height: 45, textAlignVertical: 'top', borderRadius: 5, backgroundColor: '#FFFFFF' }}
                      placeholder="Serving"
                    />
                  </View>
                </View>
              </View>
              <View style={{ width: '100%', height: '70%', paddingLeft: 10, paddingRight: 10, marginTop: 5 }}>
                <FlatList
                  data={this.state.ingredients}
                  renderItem={this._renderRow}
                  keyExtractor={(item, index) => index.toString()}
                  extraData={this.state}
                />
              </View>
            </View>

            <Textarea
              value={this.state.instructions}
              onChangeText={(instructions) => this.setState({ instructions })}
              containerStyle={styles.textareaContainer}
              style={styles.textarea}
              placeholder="Instructions"
            />

            <TextInput
              value={this.state.time}
              onChangeText={(time) => this.setState({ time })}
              containerStyle={styles.textContainer}
              style={styles.text}
              placeholder="Time"
            />

            <Card style={styles.inputContainer1}>
              <FlatList
                placeholder="CategoryId"
                value={this.state.categoryId}
                onChangeText={(categoryId) => this.setState({ categoryId })}
                data={this.state.categories}
                renderItem={(item) => this.renderCategories(item)}
                keyExtractor={(item, index) => index.toString()}
                extraData={this.state}
                horizontal={true}
              />
            </Card>


            <View style={styles.checkContainer}>
              <CheckBox
                title="I agree to allow Pluse to share and xxxxxxxxxx"
                checked={this.state.checked}
                onPress={() => this.setState({ checked: !this.state.checked })}
                style={styles.checkbox}
              />
            </View>

            <Button
              title="SUBMIT"
              //onPress={() => Alert.alert('Simple Button pressed')}
              onPress={this.onSubmit.bind(this)}
            />

          </View>
      </ScrollView  >
    );
  }

  _maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
        <View style={[StyleSheet.absoluteFill, styles.maybeRenderUploading]}>
          <ActivityIndicator color="#fff" size="large" />
        </View>
      );
    }
  };

  _maybeRenderImage = () => {
    let { image } = this.state;

    if (!image) {
      return;
    }

    return (
      <Card >
        <View style={styles.maybeRenderImageContainer}>
          <Image source={{ uri: image }} style={styles.maybeRenderImage} />
        </View>

        <Text
          onPress={this._copyToClipboard}
          onLongPress={this._share}
          style={styles.maybeRenderImageText}
        >
        </Text>
        {this._showNutrition()}
      </Card>
    );
  };

  _share = () => {
    Share.share({
      message: this.state.image,
      title: "Check out this photo",
      url: this.state.image,
    });
  };

  _copyToClipboard = () => {
    Clipboard.setString(this.state.image);
    alert("Copied image URL to clipboard");
  };

  _takePhoto = async () => {
    const { status: cameraPerm } = await Permissions.askAsync(
      Permissions.CAMERA
    );

    const { status: cameraRollPerm } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );

    // only if user allows permission to camera AND camera roll
    if (cameraPerm === "granted" && cameraRollPerm === "granted") {
      let pickerResult = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });

      if (!pickerResult.cancelled) {
        this.setState({ image: pickerResult.uri });
      }

      this.uploadImageAsync(pickerResult.uri);
    }
  };

  _pickImage = async () => {
    const { status: cameraRollPerm } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );

    // only if user allows permission to camera roll
    if (cameraRollPerm === "granted") {
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        base64: true,
        aspect: [4, 3],
      });

      if (!pickerResult.cancelled) {
        this.setState({ image: pickerResult.uri });
      }

      //this.uploadImageAsync(pickerResult.uri);
      console.log(pickerResult.uri);
    }
  };

  _showNutrition = () => {

    if (this.state.rdata == null) {
      return;
    }
    //  this.state.rdata.forEach((element) => {
    //     console.log("=========================="+element.name);
    //     console.log("test we are here");

    return (
      <View style={styles.container}>

        {this.state.rdata.map(element => <Text>{element.name}</Text>)}
        {/* <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      /> */}
      </View>
    );

    //});

    // data = response.results.items;
    //data=rdata;
    // rdata.forEach(displayNutrition);



  };
  _displayNutrition = (item, index, array) => {
    console.log("Food " + item.name);
    console.log("Serving Size " + item.servingSizes.unit);
    console.log("Food Score " + item.score);
    console.log("Carbs " + item.nutrition.totalCarbs);
    console.log("Fat " + item.nutrition.totalFat);
    console.log("Calcium " + item.nutrition.calcium);
    console.log("Sugar " + item.nutrition.sugars);
  };
}
