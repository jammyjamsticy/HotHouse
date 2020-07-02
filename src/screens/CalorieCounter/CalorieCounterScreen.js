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
  Modal,
  TouchableHighlight

} from "react-native";
import styles from './styles';
import { Constants } from "expo";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

import Card from '../../components/Card';
import Colors from '../../constants/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Col, Row, Grid } from "react-native-easy-grid";
export default class CalorieCounterScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title')
    };
  };
  state = {
    image: null,
    uploading: false,
    rdata: null,
    modalVisible: false,
    modalData: {}
  };

  render() {
    let { image } = this.state;
    let { rdata } = this.state;
    return (
      <ScrollView sytle={{ backgroundColor: "#ffffff" }}>
        <View style={styles.container}>
          {/* <Header title="My Calorie Counter" /> */}
          <StatusBar barStyle="default" />

          <Card style={styles.inputContainer} >
            <Text style={styles.exampleText}>
              Know Your Food
        </Text>
            <View style={styles.buttonContainer}>
              <View style={styles.button}>
                {/* <Button
                  onPress={this._pickImage}
                  title="Gallery"
                  color={Colors.primary}
                /> */}
                <TouchableOpacity onPress={this._pickImage} >
                  <Image style={{
                    width: 106, height: 106, borderRadius: 106 / 2, shadowColor: '#202020',
                    shadowOffset: { width: 0, height: 0 },
                    shadowRadius: 5,
                  }} source={require('../../../assets/GalleryIcon.png')} />
                </TouchableOpacity>
              </View>
              <View style={styles.button}>
                {/* <Button onPress={this._takePhoto} title="Camera" color={Colors.success} /> */}
                <TouchableOpacity onPress={this._takePhoto} >
                  <Image style={{
                    marginTop: 5, width: 100, height: 100, borderRadius: 100 / 2, shadowColor: 'black',
                    shadowOffset: { width: 7, height: 7 },
                    shadowRadius: 5,shadowOpacity: 0.26,
                    borderColor: 'black',
                    elevation:1,
                  }} source={require('../../../assets/CameraIcon.png')} />
                </TouchableOpacity>
              </View>

            </View>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              {this._maybeRenderImage()}
              {this._maybeRenderUploadingOverlay()}
              {/* {this._showNutrition()} */}
              {this._diaplayModal()}
            </View>
          </Card>



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
      <View>
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
      </View>

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
  // _renderItem = element => {
  //   console.log("item is :: " + element.name);
  //   return (
  //     <TouchableOpacity>
  //       <Text>Test</Text>
  //     </TouchableOpacity>
  //   )

  // };
  _diaplayModal = () => {
    console.log("Display Modal");

    console.log("this.state.modalData " + this.state.modalData);
    if (this.state.modalData.hasOwnProperty('servingSizes')) {
      console.log(`comes inside`)
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

              <Grid style={{color:'black'}}>
                  <Row>
                    <Col>
                   <Text style={{color:'red'}}>Calorie</Text>
                   </Col>
                   <Col>
                   <Text>{this.state.modalData.nutrition.calories}</Text>
                   </Col>
                  </Row>
                  </Grid>

                <Text  >Calorie      : {this.state.modalData.nutrition.calories}  </Text>
                <Text  >Total Carbs : {this.state.modalData.nutrition.totalCarbs}  </Text>
                <Text  >Calcium      : {this.state.modalData.nutrition.calcium}  </Text>
                <Text  >Sugar        : {this.state.modalData.nutrition.sugars}  </Text>
                <Text  >VitaminC     : {this.state.modalData.nutrition.vitaminC}  </Text>
                <Text  >SaturatedFat : {this.state.modalData.nutrition.saturatedFat}  </Text>
                <Text  >Sodium       : {this.state.modalData.nutrition.sodium}  </Text>
                <Text  >dietaryFiber : {this.state.modalData.nutrition.dietaryFiber}  </Text>

                <Text  >Protien      : {this.state.modalData.nutrition.protien}  </Text>
                <Text  >Cholesterol  : {this.state.modalData.nutrition.cholesterol}  </Text>
                <Text  >Iron         : {this.state.modalData.nutrition.iron}  </Text>
                <Text  >VitaminA     : {this.state.modalData.nutrition.vitaminA}  </Text>


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
        </View>
      )
    }

  }
  _displayDetails = (item) => {
    console.log(JSON.stringify(item));
    this.setState({
      modalData: item,
      modalVisible: true
    });
    // this._diaplayModal(item);
    // this._setModalVisible(true);

  }
  _setModalVisible = (val) => {
    this.setState({
      modalVisible: val
    });
  };
  renderItem = data => {
    // console.log("Test ::"+JSON.stringify(data));
    return (
      
        <Card style={{ justifyContent: 'center', alignItems: 'center' ,padding:20}}>
          <TouchableHighlight

            onPress={() => {
              this._displayDetails(data.item);
            }}>

            <Text >{data.item.name}  </Text>
          </TouchableHighlight>
        </Card>
      
    )
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
        <FlatList
          data={this.state.rdata}
          ItemSeparatorComponent={this.FlatListItemSeparator}
          renderItem={item => this.renderItem(item)}
          keyExtractor={item => item.name}
          extraData={this.state}
        />

        {/* {this.state.rdata.map(element => 
         
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
             
             <Text  >Calorie : {element.nutrition.calories}  </Text>
             <Text  >Total Carbs : {element.nutrition.totalCarbs}  </Text>
             <Text  >Calcium : {element.nutrition.calcium}  </Text>
             <Text  >sugars : {element.nutrition.sugars}  </Text>
             <Text  >vitaminC : {element.nutrition.vitaminC}  </Text>
             <Text  >saturatedFat : {element.nutrition.saturatedFat}  </Text>
             <Text  >sodium : {element.nutrition.sodium}  </Text>
             <Text  >dietaryFiber : {element.nutrition.dietaryFiber}  </Text>

             <Text  >protien : {element.nutrition.protien}  </Text>
             <Text  >cholesterol : {element.nutrition.cholesterol}  </Text>
             <Text  >iron : {element.nutrition.iron}  </Text>
             <Text  >vitaminA : {element.nutrition.vitaminA}  </Text>


               <TouchableHighlight
                 style={{ ...styles.openButton, backgroundColor: "#2196F3",marginTop:10 }}
                 onPress={() => {
                   this._setModalVisible(!this.state.modalVisible);
                 }}
               >
                 <Text style={styles.textStyle}>Close</Text>
               </TouchableHighlight>
             </View>
           </View>
         </Modal>

        
          <Card>
          <TouchableHighlight

onPress={() => {
  this._setModalVisible(true);
}}>
  <View>
           <Text  onLongPress={this._displayDetails}>Name : {element.name}  </Text>
           <Text  >Calorie : {element.nutrition.calories}  </Text>
           </View>
           </TouchableHighlight>
           
         </Card>


         
        
       </View>
         )
         }  */}




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
