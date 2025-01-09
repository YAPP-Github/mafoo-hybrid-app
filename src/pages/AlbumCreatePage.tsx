import React from 'react';
import {View, Button, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const AlbumCreatePage = ({navigation}: any) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>AlbumCreatePage</Text>
      <Button
        title="Go to Home"
        onPress={() => {
          navigation.navigate('HomeScreens');
        }}
      />
    </View>
  );
};

export default AlbumCreatePage;
