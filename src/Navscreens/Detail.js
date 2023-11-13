import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, likedStoryCards,Switch } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-picker'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import ProfileInfoComp from '../components/ProfileInfoComp';
// import TouchableText from '../components/TouchableText';
// import SignOutButton from '../components/SignOutButton';
import storage from '@react-native-firebase/storage';
import { useSelector, useDispatch } from 'react-redux'
// actions
import { switchMode } from '../Redux/actions';




const Details = ({ navigation }) => {
  const [profileData, setProfileData] = useState(null);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const theme = useSelector(state => state.theme);
      // initialize action dispatcher
      const dispatch = useDispatch();
      // define a component mode state
      const [mode, setMode] = useState();
      const [isEnabled, setIsEnabled] = useState();
    const toggleSwitch = () =>  {
      const newmode = theme.mode=='dark'?'light':'dark';
      dispatch(switchMode(newmode));
      setMode(newmode)
       setIsEnabled(previousState => !previousState);
    }
  //   dispatch(switchMode(theme.mode === 'light' ? 'dark' : 'light'));;

textstyles = mode ==='light' ?styles.text_light:styles.text_dark
containerstyles = mode ==='light' ? styles.container_light:styles.container_dark

useEffect(() => {
    const userId = auth().currentUser ? auth().currentUser.uid : null;

    if (userId) {
      const unsubscribe = firestore()
        .collection('users')
        .doc(userId)
        .onSnapshot((documentSnapshot) => {
          if (documentSnapshot.exists) {
            const data = documentSnapshot.data();
            setProfileData(data);
          }
        });
      return () => {
        unsubscribe();
      };
    }
  }, []);

  const selectProfilePicture = () => {
    ImagePicker.openImage({
      width: 300,
      height: 300,
      cropping: true,
    })
      .then((image) => {
        console.log('Selected and cropped image:', image);
        const userId = auth().currentUser ? auth().currentUser.uid : null;

        if (userId) {
          const storageRef = storage().ref(profilePictures/${userId});

          storageRef.putFile(image.path)
            .then(() => {
              console.log('Profile picture uploaded successfully');

              storageRef.getDownloadURL()
                .then(downloadURL => {
                  firestore()
                    .collection('users')
                    .doc(userId)
                    .update({
                      profilePictureURL: downloadURL,
                    })
                    .then(() => {
                      console.log('Profile picture URL updated successfully');
                    })
                    .catch((error) => {
                      console.error('Error updating profile picture URL:', error);
                    });
                })
                .catch((error) => {
                  console.error('Error getting download URL:', error);
                });
            })
            .catch((error) => {
              console.error('Error uploading profile picture:', error);
            });
        }
      })
      .catch((error) => {
        console.error('ImagePicker Error:', error);
      });
  };

  const navigateToLoginScreen = () => {
    setIsSigningOut(false);
    navigation.navigate('LoginScreen');
  };

  const SignOut = async () => {
    setIsSigningOut(true);

    setTimeout(async () => {
      try {
        await auth().signOut();
        console.log('User signed out successfully');
      } catch (error) {
        console.error('Error signing out:', error);
      } finally {
        navigateToLoginScreen();
      }
    }, 2000);
  };



  return (
    <View style={[styles.container, { containerstyles }]}>
     
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="back" size={25} color={textstyles} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { textstyles }]}>Settings</Text>
      </View>


      <ProfileInfoComp profileData={profileData} selectProfilePicture={selectProfilePicture} />


      <Text style={[styles.Title, {textstyles }]}>General</Text>
      <View style={styles.General}>
        <View style={styles.textdirection}>
          <Icon name="heart" size={22} color={textstyles} style={styles.backIcon} />
          <TouchableOpacity text="About us" onPress={() => { navigation.navigate('AboutUs') }} style={[styles.SettingOptions, {textstyles }]} />
        </View>
        <View style={styles.textdirection}>
          <Icon name="save" size={22} color={textstyles} style={styles.backIcon} />
          <TouchableOpacity text="Favorite / Library" onPress={() => {
            navigation.navigate('Library', { favoriteStories: likedStoryCards });
          }} 
          style={[styles.SettingOptions, { color: theme.color }]} />
        </View>
        <View style={styles.textdirection}>
          <Icon name="user" size={22} color={textstyles} style={styles.backIcon} />
          <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />

        </View>
        <View style={styles.textdirection}>
          <Icon name="delete" size={22} color={textstyles} style={styles.backIcon} />
          <TouchableOpacity text="Delete Account" onPress={SignOut} />
        </View>
        {isSigningOut && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={textstyles} />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 0,
  },
  backIcon: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  Title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 60,
    marginBottom: 25,
    paddingLeft: 20,
  },
  textdirection: {
    flexDirection: 'row',
    paddingVertical: 15,
  },
  SettingOptions: {
    color: '#F6F5D7',
  },
  General: {
    marginHorizontal: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
   container_light: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
},

container_dark: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
}

,
text_light: {
    marginBottom: 20,
    color: '#000'
}

,
text_dark: {
    marginBottom: 20,
    color: "#fff"
}

});

export default Details;
