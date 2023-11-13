import * as React from 'react';
import { View, Text } from 'react-native';

export default function Settings({ navigation }) {
    return (
        <View style={{ backgroundColor:'yellowgreen', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text
                onPress={() => navigation.navigate('Home')}
                style={{ fontSize: 26, fontWeight: 'bold' ,color:'blue'}}>Settings Screen</Text>
        </View>
    );
}