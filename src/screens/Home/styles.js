import { StyleSheet } from 'react-native';
import { RecipeCard } from '../../AppStyles';

const styles = StyleSheet.create({
  container: RecipeCard.container,
  photo: RecipeCard.photo,
  title: RecipeCard.title,
  category: RecipeCard.category,
  photoScreen: {
    width: '100%',
    height: '100%',
    marginTop:10
  },
  containerPhoto:{
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
   
    borderColor: '#cccccc',
  //  borderWidth: 0.5,
  //  borderRadius: 20,
  }
});

export default styles;
