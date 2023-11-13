import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Appearance,ImageBackground } from 'react-native';

const Home = ({ navigation }) => {

  const isDarkModeInitial = Appearance.getColorScheme() === 'dark';
  const [isDarkMode, setIsDarkMode] = useState(isDarkModeInitial);



  useEffect(() => {
    // Listen for changes to the device theme
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setIsDarkMode(colorScheme === 'dark');
    });

    // Clean up the subscription when the component unmounts
    return () => subscription.remove();
  }, []);


  const themeStyles = {
   
    container: {
      backgroundColor: isDarkMode ? '#232359' : 'grey',
    },
    storyBox: {
      backgroundColor: isDarkMode ? 'grey' : 'lightgrey',
    },
    storyText: {
      color: isDarkMode ? 'white' : 'black',
    },
  };


  const storydisplayhandler = (category) => {
    navigation.navigate('Storysection', { category });
  };


  return (
    <ScrollView style={[styles.container, themeStyles.container]}>
      <Text style={[styles.heading, themeStyles.storyText]}>Catgories</Text>

      <View style={styles.storyRow}>



        <TouchableOpacity onPress={() => storydisplayhandler('Sad Story')}>
          <View style={[styles.storyBox, themeStyles.storyBox]}>
            <Image
              source={{ uri: 'https://w0.peakpx.com/wallpaper/860/265/HD-wallpaper-sad-alone-lonely-sunset-broken-thumbnail.jpg' }}
              style={styles.storyImage}
            />
            <Text style={[styles.storyText, themeStyles.storyText]}>Sad Story</Text>
          </View>
        </TouchableOpacity>





        <TouchableOpacity onPress={() => storydisplayhandler('Happy Story')}>
          <View style={[styles.storyBox, themeStyles.storyBox]}>
            <Image
              source={{ uri: 'https://img.freepik.com/free-photo/front-view-woman-with-copy-space_23-2148483049.jpg?size=626&ext=jpg&ga=GA1.1.1413502914.1697068800&semt=ais' }}
              style={styles.storyImage}
            />
            <Text style={[styles.storyText, themeStyles.storyText]}>Happy Story</Text>
          </View>
        </TouchableOpacity>
      </View>






      <View style={styles.storyRow}>
        <TouchableOpacity onPress={() => storydisplayhandler('Horror Story')}>
          <View style={[styles.storyBox, themeStyles.storyBox]}>
            <Image
              source={{ uri: 'https://cdn.akamai.steamstatic.com/steam/apps/1151250/capsule_616x353.jpg?t=1675863686' }}
              style={styles.storyImage}
            />
            <Text style={[styles.storyText, themeStyles.storyText]}>Horror Story</Text>
          </View>
        </TouchableOpacity>




        <TouchableOpacity onPress={() => storydisplayhandler('Success Story')}>
          <View style={[styles.storyBox, themeStyles.storyBox]}>
            <Image
              source={{ uri: 'https://png.pngtree.com/png-vector/20220526/ourmid/pngtree-megaphone-with-success-stories-png-image_4738040.png' }}
              style={styles.storyImage}
            />
            <Text style={[styles.storyText, themeStyles.storyText]}>Success Story</Text>
          </View>
        </TouchableOpacity>
      </View>







      <View style={styles.storyRow}>
        <TouchableOpacity onPress={() => storydisplayhandler('Failure Story')}>
          <View style={[styles.storyBox, themeStyles.storyBox]}>
            <Image
              source={{ uri: 'https://ied.eu/wp-content/uploads/2018/05/failure.png' }}
              style={styles.storyImage}
            />
            <Text style={[styles.storyText, themeStyles.storyText]}>FailureStory</Text>
          </View>
        </TouchableOpacity>



        <TouchableOpacity onPress={() => storydisplayhandler('Romantic Story')}>
          <View style={[styles.storyBox, themeStyles.storyBox]}>
            <Image
              source={{ uri: 'https://media.istockphoto.com/id/1364024543/photo/happy-young-man-and-woman-in-love-enjoying-drink-from-one-cup-on-a-fun-date-on-st-valentines.jpg?s=612x612&w=0&k=20&c=fpduJ_fu7oAcgqFs030vNnyu1BWYRoJyQR1WEQfGc4o=' }}
              style={styles.storyImage}
            />
            <Text style={[styles.storyText, themeStyles.storyText]}>Romantic Story</Text>
          </View>
        </TouchableOpacity>

      </View>


      <View style={styles.storyRow}>
        <TouchableOpacity onPress={() => storydisplayhandler('Beautiful Story')}>
          <View style={[styles.storyBox, themeStyles.storyBox]}>
            <Image
              source={{ uri: 'https://preview.redd.it/desktop-aesthetic-wallpaper-1920-1080-v0-d2hd73xxwvaa1.jpg?width=640&crop=smart&auto=webp&s=794175e6a3da1493fcbb0b8a730f7b190e70f7a4' }}
              style={styles.storyImage}
            />
            <Text style={[styles.storyText, themeStyles.storyText]}>Beautiful Story</Text>
          </View>
        </TouchableOpacity>



        <TouchableOpacity onPress={() => storydisplayhandler('Mystery Story')}>
          <View style={[styles.storyBox, themeStyles.storyBox]}>
            <Image
              source={{ uri: 'https://celadonbooks.com/wp-content/uploads/2020/03/what-is-a-mystery.jpg' }}
              style={styles.storyImage}
            />
            <Text style={[styles.storyText, themeStyles.storyText]}>Mystery Story</Text>
          </View>
        </TouchableOpacity>

      </View>

      <View style={styles.storyRow}>
        <TouchableOpacity onPress={() => storydisplayhandler('Experince Story')}>
          <View style={[styles.storyBox, themeStyles.storyBox]}>
            <Image
              source={{ uri: 'https://www.shutterstock.com/image-photo/businessman-working-on-laptop-experience-260nw-1612204909.jpg' }}
              style={styles.storyImage}
            />
            <Text style={[styles.storyText, themeStyles.storyText]}>Experince Story</Text>
          </View>
        </TouchableOpacity>



        <TouchableOpacity onPress={() => storydisplayhandler('Accidential Story')}>
          <View style={[styles.storyBox, themeStyles.storyBox]}>
            <Image
              source={{ uri: 'https://sunoforlife.com/wp-content/uploads/2020/06/Accidental-injury-and-hearing-loss.jpg' }}
              style={styles.storyImage}
            />
            <Text style={[styles.storyText, themeStyles.storyText]}>Accidential Story</Text>
          </View>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
};





const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 20,
    marginHorizontal:100,
    backgroundColor:"yellowgreen",
    borderRadius:10,
  },
  storyRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  storyBox: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    height: 'auto',
    width: 150,
  },
  storyImage: {
    width: 130,
    height: 110,
    marginBottom: 10,
    borderRadius: 10
  },
  storyText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default Home;