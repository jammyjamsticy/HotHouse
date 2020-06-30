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
  TextInput,
  Alert

} from "react-native";
import { Constants } from "expo";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import Card from '../../components/Card';
import Colors from '../../constants/colors';

import { CheckBox } from 'react-native-elements';
import Textarea from 'react-native-textarea';

export default class App extends Component {
  state = {
    image: null,
    uploading: false,
    checked: false,
  };

  render() {
    let { image } = this.state;

    return (
      <ScrollView>
        <View style={styles.container}>

          <StatusBar barStyle="default" />

          <Card style={styles.inputContainer}>
            <Text style={styles.exampleText}>
              Upload Your Recipe
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


          <TextInput
            containerStyle={styles.textContainer}
            style={styles.text}
            placeholder="Title"
          />
          <Textarea
            containerStyle={styles.textareaContainer}
            style={styles.textarea}
            placeholder="Caption"
          />

          <Card style={styles.inputContainer1}>
            <Text style={styles.exampleText1}>ingredients</Text>
          </Card>

          <Textarea
            containerStyle={styles.textareaContainer}
            style={styles.textarea}
            placeholder="Instructions"
          />

          <TextInput
            containerStyle={styles.textContainer}
            style={styles.text}
            placeholder="Time"
          />

          <CheckBox
            title="I agree to allow Pluse to share and xxxxxxxxxx"
            checked={this.state.checked}
            onPress={() => this.setState({ checked: !this.state.checked })}
          />

          <Button
            title="SUBMIT"
            onPress={() => Alert.alert('Simple Button pressed')}
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

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    // justifyContent: "center",
  },
  exampleText: {
    fontSize: 20,
    marginBottom: 20,
    marginHorizontal: 15,
    textAlign: "center",
  },
  maybeRenderUploading: {
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
  },
  maybeRenderContainer: {
    borderRadius: 3,
    elevation: 2,
    marginTop: 30,
    shadowColor: "rgba(0,0,0,1)",
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 4,
      width: 4,
    },
    shadowRadius: 5,
    width: 250,
  },
  maybeRenderImageContainer: {
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    overflow: "hidden",
    marginTop: 30
  },
  maybeRenderImage: {
    height: 250,
    width: 250,
  },
  maybeRenderImageText: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  button: {
    width: 100
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginTop: 20

  },
  inputContainer: {
    width: 300,
    maxWidth: '80%',
    alignItems: 'center',
    marginTop: 20
  },
  textContainer: {
    height: 10,
    padding: 5,
    //backgroundColor: '#F5FCFF',
  },
  text: {
    textAlignVertical: 'top',  // hack android
    height: 40,
    fontSize: 14,
    borderColor: 'gray',
    width: "75%",
    borderWidth: 1,
    marginBottom: 20,
    margin: 8,
  },
  textareaContainer: {
    height: 180,
    padding: 5,
    //backgroundColor: '#F5FCFF',
  },
  textarea: {
    textAlignVertical: 'top',  // hack android
    height: 150,
    fontSize: 14,
    borderColor: 'gray',
    width: "75%",
    borderWidth: 1,
    marginBottom: 20,
    margin: 8,
  },
  exampleText1: {
    textAlignVertical: 'top',
    marginBottom: 20,
    marginHorizontal: 15,
    margin: 8,
  },
  inputContainer1: {
    width: 300,
    maxWidth: '80%',
    // alignItems: 'center',
    marginTop: 20
  },
});