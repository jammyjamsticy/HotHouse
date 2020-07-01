import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
    width:'100%',
        padding:20,
      flex: 1
    },
    exampleText: {
      fontSize: 20,
      marginBottom: 10,
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
      width: 100,
      borderWidth: 1
    },
    buttonContainer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 15,
      marginTop: 10,
      backgroundColor:'#FFFFFF'
      
    },
    viewTextContainer: {
      width: '75%',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    viewTextContainer1: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    inputContainer: {
        height: 200,
      width: '100%',
      //maxWidth: '80%',
      //alignItems: 'center',
      marginTop: 20,
      backgroundColor: '#FFFFFF',
      borderRadius:5

    },
    textContainer: {
      //height: 10,
      //padding: 5,
      //backgroundColor: '#F5FCFF',
    },
    text: {
      textAlignVertical: 'top',  // hack android
      height: 45,
      fontSize: 14,
      borderColor: 'gray',
      width: "100%",
      borderWidth: 1,
      marginBottom: 10,
      padding: 10,
     borderRadius:5,
     marginTop: -40,
     backgroundColor:'#FFFFFF'
    },
    text2: {
        textAlignVertical: 'top',  // hack android
        height: 45,
        fontSize: 14,
        borderColor: 'gray',
        width: "100%",
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
        marginTop:10,
        borderRadius: 5,
        backgroundColor:'#FFFFFF'
       // marginTop: -40,
      },
    textNameContainer: {
      //height: 10,
      //padding: 5,
      //backgroundColor: '#F5FCFF',
    },
    textName: {
      //textAlignVertical: 'top',  // hack android
      height: 40,
      fontSize: 14,
      borderColor: 'gray',
      width: "50%",
      borderWidth: 1,
      marginBottom: 10,
      padding: 10,
      margin: 8,
    },
    textAmtContainer: {
      height: 10,
      //padding: 5,
      //backgroundColor: '#F5FCFF',
    },
    textAmt: {
      textAlignVertical: 'top',  // hack android
      height: 40,
      fontSize: 14,
      borderColor: 'gray',
      width: "25%",
      borderWidth: 1,
      marginBottom: 10,
      margin: 8,
    },
    textMetContainer: {
      height: 10,
      //padding: 5,
      //backgroundColor: '#F5FCFF',
    },
    textMet: {
      textAlignVertical: 'top',  // hack android
      height: 40,
      fontSize: 14,
      borderColor: 'gray',
      width: "25%",
      borderWidth: 1,
      marginBottom: 10,
      margin: 8,
  
    },
    textareaContainer: {
      // height: 180,
      // padding: 5,
      alignItems: 'center',
      //backgroundColor: '#F5FCFF',
    },
    textarea: {
      textAlignVertical: 'top',  // hack android
      height: 100,
      fontSize: 14,
      borderColor: 'gray',
      width: "100%",
      borderWidth: 1,
      marginBottom: 10,
      padding: 10,
      margin: 8,
      borderRadius:5,
      backgroundColor:'#FFFFFF'
    },
    exampleText1: {
      textAlignVertical: 'top',
      marginBottom: 50,
      //marginHorizontal: 15,
      //margin: 8,
      //borderWidth: 1,
      width: '25%',
    },
    inputContainer1: {
      textAlignVertical: 'top',
      //alignItems: 'center',
      width: '100%',
      marginTop: 10,
      marginBottom: 10,
      backgroundColor:'#FFFFFF'
    },
    checkContainer: {
      //flex: 1,
 
      //justifyContent: 'center',
      //paddingTop: Constants.statusBarHeight,
      //backgroundColor: 'gray',
      //borderWidth:1,
      width: '100%',
      marginBottom: 10,
    },
    checkbox: {
      //textAlignVertical: 'top',  // hack android
      //height: 150,
      fontSize: 14,
      //borderColor: 'gray',
      width: "100%",
      //borderWidth: 1,
      marginBottom: 10,
      padding: 10,
      margin: 8,
    }
  });

  export default styles;