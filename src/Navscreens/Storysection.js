// import React, { useState, useEffect } from 'react';
// import { StyleSheet, Text, View, TextInput, Alert, FlatList, ScrollView, TouchableOpacity } from 'react-native';
// import firestore from '@react-native-firebase/firestore';
// import { Appearance } from 'react-native';
// import Clipboard from '@react-native-community/clipboard';

// const Storysection= ({ navigation, route }) => {
  
//   const { category } = route.params;
//   const [count, setCount] = useState(0);
//   const [data, setdata] = useState([]);
//   const [inputdata, setinputdata] = useState('');

//   useEffect(() => {
//     displayStory();
//   }, []);

  
  
//   const displayStory = async () => {
//     try {
//       const storyRef = firestore().collection(category);
//       const querySnapshot = await storyRef.get();

//       const stories = [];
//       querySnapshot.forEach((doc) => {
//         const { content } = doc.data();
//         stories.push({ key: doc.id, content });
//       });
//       setdata(stories);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       Alert.alert('Error', 'An error occurred while fetching data.');
//     }
//   };




//   const addStory = async () => {
//     if (inputdata) {
//       try {
//         const storyData = {
//           content: inputdata,
//         };
//         const desiredId = count.toString();

//         const storyRef = firestore().collection(category).doc(desiredId);

//         await storyRef.set(storyData);

//         setCount(count + 1);
//         setinputdata('');
//         Alert.alert('Story added successfully.');
//       } catch (error) {
//         console.error('Error adding story:', error);
//       }
//     } else {
//       Alert.alert('Write something about your story');
//     }
//   };






//   const copyToClipboard = (Text) => {
//     Clipboard.setString(Text);
//   };

//   return (
//     <ScrollView style={[styles.main, { backgroundColor: isDarkMode ? 'black' : '#66B032' }]}>
//       <Text style={[styles.headerText, { color: isDarkMode ? 'darkblue' : 'black' }]}>{category}</Text>
//       <View style={styles.input}>
//         <TextInput
//           placeholder="Enter content"
//           value={inputdata}
//           onChangeText={(text) => setinputdata(text)}
//           multiline
//           numberOfLines={20}
//           style={[styles.storyInput, { color: isDarkMode ? 'darkblue' : 'black' }]}
//         />
//       </View>

//       <TouchableOpacity onPress={addStory} style={styles.addBtn}>
//         <Text style={{ textAlign: 'center', fontSize: 15, fontWeight: 'bold', color: isDarkMode ? 'darkblue' : 'black' }}>Add Story</Text>
//       </TouchableOpacity>

//       <FlatList
//         data={data}
//         horizontal={true}
//         renderItem={({ item }) => (
//           <View style={styles.flaty}>
//             <Text style={{ color: isDarkMode ? 'darkblue' : 'black' }}>{item.content}</Text>
//             <TouchableOpacity onPress={() => copyToClipboard(item.content)} style={styles.copyBtn}>
//               <Text>Copy</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//         keyExtractor={(item) => item.key}
//       />
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   headerText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   storyInput: {
//     height: 300,
//     width: 330,
//     borderColor: 'black',
//     borderWidth: 2,
//     margin: 20,
//     flex: 1,
//     borderRadius: 10,
//     backgroundColor: '#EAFFDC',
//     padding: 10,
//   },
//   main: {
//     flex: 1,
//   },
//   addBtn: {
//     borderColor: 'black',
//     borderWidth: 2,
//     width: 200,
//     height: 30,
//     marginHorizontal: 90,
//     backgroundColor: '#EAFFDC',
//     borderRadius: 20,
//   },
//   flaty: {
//     backgroundColor: '#EAFFDC',
//     width: 320,
//     height: 500,
//     margin: 10,
//     borderColor: 'black',
//     borderWidth: 2,
//     borderRadius: 10,
//     padding: 10,
//   },
//   copyBtn: {
//     alignSelf: 'flex-end', // Align the "Copy" button to the end of the view
//   },
// });

// export default Storysection;


import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Appearance } from 'react-native';
import Clipboard from '@react-native-community/clipboard';

const Storysection = ({ navigation, route }) => {
  const colorScheme = Appearance.getColorScheme();
  const { category } = route.params;
  const [count, setCount] = useState(0);
  const [data, setdata] = useState([]);
  const [inputdata, setinputdata] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');

  useEffect(() => {
    displayStory();
  }, []);

  useEffect(() => {
    const colorSchemeChangeHandler = ({ colorScheme }) => {
      setIsDarkMode(colorScheme === 'dark');
    };

    const subscription = Appearance.addChangeListener(colorSchemeChangeHandler);

    return () => {
      subscription.remove();
    };
  }, []);




  
  const displayStory = async () => {
    try {
      const storyRef = firestore().collection(category);
      const querySnapshot = await storyRef.get();

      const stories = [];
      querySnapshot.forEach((doc) => {
        const { content } = doc.data();
        stories.push({ key: doc.id, content });
      });
      setdata(stories);
    } catch (error) {
      console.error('Error fetching data:', error);
      Alert.alert('Error', 'An error occurred while fetching data.');
    }
  };




  const addStory = async () => {
    if (inputdata) {
      try {
        const storyData = {
          content: inputdata,
        };

        const storyRef = firestore().collection(category).doc();

        await storyRef.set(storyData);

        setinputdata('');
        Alert.alert('Story added successfully.');
      } catch (error) {
        console.error('Error adding story:', error);
      }
    } else {
      Alert.alert('Write something about your story');
    }
  };






  const copyToClipboard = (Text) => {
    Clipboard.setString(Text);
  };

  return (
    <ScrollView style={[styles.main, { backgroundColor: isDarkMode ? 'grey' : 'lightblue' }]} >
      <Text style={[styles.headerText, { color: isDarkMode ? 'black' : 'black' }]}>{category}</Text>
      <View style={styles.input}>
        <TextInput
          placeholder="Enter content"
          value={inputdata}
          onChangeText={(text) => setinputdata(text)}
          multiline
          numberOfLines={10}
          style={[styles.storyInput, { color: isDarkMode ? 'black' : 'black' }]}
        />
      </View>

      <TouchableOpacity onPress={addStory} style={styles.addBtn}>
        <Text style={{ textAlign: 'center', fontSize: 15, fontWeight: 'bold', color: isDarkMode ? 'black' : 'black' }}>Add Story</Text>
      </TouchableOpacity>

      <FlatList
        data={data}
        vertical={true}
        renderItem={({ item }) => (
          <View style={styles.flaty}>
            <Text style={{ color: isDarkMode ? 'brown' : 'black' }}>{item.content}</Text>
            <TouchableOpacity onPress={() => copyToClipboard(item.content)} style={styles.copyBtn}>
              <Text style={{color:"red"}}>Copy</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.key}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  storyInput: {
    height:100,
    width: 330,
    margin: 20,
    flex: 1,
    borderRadius: 10,
    backgroundColor: 'black',
    padding: 10,
    elevation:20,
  },
  main: {
    flex: 1,
  },
  addBtn: {
    width:130,
    marginHorizontal: 120,
    backgroundColor: 'yellowgreen',
    borderRadius: 15,
    padding:15,
    elevation:20
  },
  flaty: {
    backgroundColor: '#EAFFDC',
    width: 320,
    height: 'auto',
    margin: 20,
    borderRadius: 10,
    padding: 10,
    elevation:10
  },
  copyBtn: {
    alignSelf: 'flex-end', // Align the "Copy" button to the end of the view
    marginBottom:30,
    paddingRight:10
  },
});

export default Storysection;