import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import MenuButton from '../../components/MenuButton/MenuButton';

export default class DrawerContainer extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.content}>
        <View style={styles.container}>
          <MenuButton
            title="HOME"
            source={require('../../../assets/icons/home.png')}
            onPress={() => {
              navigation.navigate('Home');
              navigation.closeDrawer();
            }}
          />
          <MenuButton
            title="CATEGORIES"
            source={require('../../../assets/icons/category.png')}
            onPress={() => {
              navigation.navigate('Categories');
              navigation.closeDrawer();
            }}
          />
          <MenuButton
            title="SEARCH"
            source={require('../../../assets/icons/search.png')}
            onPress={() => {
              navigation.navigate('Search');
              navigation.closeDrawer();
            }}
          />
               <MenuButton
            title="Stats"
            source={require('../../../assets/icons/upload.png')}
            onPress={() => {
              navigation.navigate('Stats');
              navigation.closeDrawer();
            }}
          />
          {/* <MenuButton
            title="SUBMIT RECIPES"
            source={require('../../../assets/icons/upload.png')}
            onPress={() => {
              navigation.navigate('Submit');
              navigation.closeDrawer();
            }}
          /> */}
       
        </View>
      </View>
    );
  }
}

DrawerContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  })
};
