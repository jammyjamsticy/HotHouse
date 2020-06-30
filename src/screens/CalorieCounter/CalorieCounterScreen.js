import React, { Component } from "react";
import {
  ActivityIndicator,
  Button,
  Clipboard,
  Image,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
  FlatList,

} from "react-native";
import styles from './styles';
import { Constants } from "expo";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

import Card from '../../components/Card';
import Colors from '../../constants/colors';
export default class CalorieCounterScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title')
    };
  };
  state = {
    image: null,
    uploading: false,
    rdata: null
  };

  render() {
    let { image } = this.state;
    let { rdata } = this.state;
    return (
      <ScrollView>
        <View style={styles.container}>
          {/* <Header title="My Calorie Counter" /> */}
          <StatusBar barStyle="default" />

          <Card style={styles.inputContainer}>
            <Text style={styles.exampleText}>
              Upload Your Food
        </Text>
            <View style={styles.buttonContainer}>
              <View style={styles.button}>
                <Button
                  onPress={this._pickImage}
                  title="Gallery"
                  color={Colors.primary}
                /></View>
              <View style={styles.button}>
                <Button onPress={this._takePhoto} title="Camera" color={Colors.success} />
              </View>
            </View>
          </Card>

          {this._maybeRenderImage()}
          {this._maybeRenderUploadingOverlay()}
          {/* {this._showNutrition()} */}

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

      this.uploadImageAsync(pickerResult.uri);
      console.log(pickerResult.uri);
    }
  };
  _renderItem = element => {
    <TouchableOpacity>
      <Text>Test</Text>
    </TouchableOpacity>

    console.log("item is :: " + element.name);
  };
  _displayDetails =() =>{
    console.log("modal");
  }
  _showNutrition = () => {

    if (this.state.rdata == null) {
      return;
    }
    //  this.state.rdata.forEach((element) => {
    //     console.log("=========================="+element.name);
    //     console.log("test we are here");

    return (
      <ScrollView >

         {this.state.rdata.map(element => <Card><Text  onLongPress={this._displayDetails}>{element.name}</Text></Card>)} 



        {/* <FlatList
          data={this.state.rdata}
          renderItem={ this._renderItem}
         
        /> */}
      </ScrollView>
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

  uploadImageAsync(pictureuri) {
    let apiUrl =
      "https://api-2445582032290.production.gw.apicast.io/v1/foodrecognition/full?user_key=ccec5d0dc8ac602942036a6ffbb86d77";
    var data = new FormData();
    data.append("file", {
      uri: pictureuri,
      name: "file",
      type: "image/jpeg",
    });

    fetch(apiUrl, {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      //.then( commits => alert(commits[0].author.login));
      .then((commits) => {
        console.log("success");
        let rdata1 = commits.results[0].items;
        this.setState({ rdata: rdata1 });
        rdata1.forEach((element) => {

        });
      })
      .catch((err) => {
        console.log("err ");
        console.log(err);
      });
  }
}
