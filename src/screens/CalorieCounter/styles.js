import { StyleSheet } from 'react-native';


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
      color:'#f70000',
      fontWeight:'bold'
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
      width: 300,
      alignItems: "center",
      justifyContent: "center",
    },
    maybeRenderImageContainer: {
      borderTopLeftRadius: 3,
      borderTopRightRadius: 3,
      overflow: "hidden",
      marginTop: 30,
      alignItems: "center",
      justifyContent: "center",
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
      justifyContent: 'space-evenly',
      paddingHorizontal: 15,
      marginTop: 20
  
    },
    inputContainer: {
      width: 400,
      maxWidth: '80%',
      alignItems: 'center',
      marginTop: 20,
      backgroundColor:"#ffffff"
    },
    modalView: {
      margin: 20,
       backgroundColor: "white",
      borderRadius: 20,
       padding: 35,
       alignItems: "center",
       shadowColor: "#000",
       justifyContent:"center",
       shadowOffset: {
         width: 0,
         height: 2
       },
       shadowOpacity: 0.25,
       shadowRadius: 3.84,
       elevation: 5
    },
    openButton: {
      backgroundColor: "#F194FF",
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center",
      marginTop:15
    },
    gridText:{
      color: "black",
      fontWeight: "bold",
      textAlign: "center",
      fontSize:20
    }
  });
  export default styles;
