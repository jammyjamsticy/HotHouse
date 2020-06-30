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
  });
  export default styles;
