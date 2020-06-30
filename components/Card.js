import React from 'react';
import { View,  StyleSheet } from 'react-native';

const Card = props => {
    return (
        <View style={{...styles.card,...props.style}}>
           {props.children}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        
        shadowColor: '#808080',
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 1,
        shadowOpacity: 0.26,
        borderColor: 'white',
        elevation:1,
        padding:20,
        borderRadius:2

    }
});

export default Card;