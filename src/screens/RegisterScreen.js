// import React, { useState } from 'react'
// import { View, StyleSheet, TouchableOpacity,ScrollView } from 'react-native'
// import { Text } from 'react-native-paper'
// import Background from '../components/Background'
// import Logo from '../components/Logo'
// import Header from '../components/Header'
// import Button from '../components/Button'
// import TextInput from '../components/TextInput'
// import { theme } from '../core/theme'
// import { emailValidator } from '../helpers/emailValidator'
// import { passwordValidator } from '../helpers/passwordValidator'
// import { nameValidator } from '../helpers/nameValidator'
// import firestore from '@react-native-firebase/firestore';
// import auth from '@react-native-firebase/auth';



// export default function RegisterScreen({ navigation }) {
//   const [name, setName] = useState({ value: '', error: '' })
//   const [email, setEmail] = useState({ value: '', error: '' })
//   const [password, setPassword] = useState({ value: '', error: '' })

//   const signup = async () => {
//     if (email && password) {
//         try {
//             const userCredential = await auth().createUserWithEmailAndPassword(email, password);
//             const user = userCredential.user; // Get the user object from userCredential

//             console.log('uid----------->>>>>>>>>>>>>', user.uid);

//             // Rest of your code
//             firestore().collection('user').doc(user.uid).set({
//                 email,
//                 fullname,
//                 uid: user.uid, // Set the UID from the user object
//                 password
//             });
//             navigation.replace("LoginScreen")
//             // Rest of your code
//         } catch (error) {
//             if (error.code === 'auth/email-already-in-use') {
//                 console.log('That email address is already in use!');
//             } else if (error.code === 'auth/invalid-email') {
//                 console.log('That email address is invalid!');
//             }
//             console.error(error);
//         }
//     }
// }
//   // const onSignUpPressed = () => {
//   //   const nameError = nameValidator(name.value)
//   //   const emailError = emailValidator(email.value)
//   //   const passwordError = passwordValidator(password.value)

//   //   if (emailError || passwordError || nameError) {
     
//   //     setName({ ...name, error: nameError })
//   //     setEmail({ ...email, error: emailError })
//   //     setPassword({ ...password, error: passwordError })
//   //     return
        
//       // }
//     //   signup()
//     //   navigation.reset({
//     //   index: 0,
//     //   routes: [{ name: 'Dashboard' }],

//     // })
//   // }

//   return (
   
//     <Background>
//       <Logo />
      
//       <Header>Create Account</Header>
//       <TextInput
//         label="Name"
//         returnKeyType="next"
//         value={name}
//         onChangeText={(text) => setName({ value: text, error: '' })}
//         error={!!name.error}
//         errorText={name.error}
//         keyboardAvoidingView={true}
//       />
//       <TextInput
//         label="Email"
//         returnKeyType="next"
//         value={email}
//         onChangeText={(text) => setEmail({ value: text, error: '' })}
//         error={!!email.error}
//         errorText={email.error}
//         autoCapitalize="none"
//         autoCompleteType="email"
//         textContentType="emailAddress"
//         keyboardType="email-address"
//       />
//       <TextInput
//         label="Password"
//         returnKeyType="done"
//         value={password}
//         onChangeText={(text) => setPassword({ value: text, error: '' })}
//         error={!!password.error}
//         errorText={password.error}
//         secureTextEntry
//       />
//       <Button
//         mode="contained"
//         onPress={signup}
//         style={{ marginTop: 24 }}
//       >
//         Sign Up
//       </Button>
//       <View style={styles.row}>
//         <Text>Already have an account? </Text>
//         <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
//           <Text style={styles.link}>Login</Text>
//         </TouchableOpacity>
//       </View>
//     </Background>
   
//   )
// }

// const styles = StyleSheet.create({
//   row: {
//     flexDirection: 'row',
//     marginTop: 4,
//   },
//   link: {
//     fontWeight: 'bold',
//     color: theme.colors.primary,
//   },
// })


import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity,Alert } from 'react-native';
import { Text } from 'react-native-paper';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import { theme } from '../core/theme';
import { emailValidator } from '../helpers/emailValidator';
import { passwordValidator } from '../helpers/passwordValidator';
import { nameValidator } from '../helpers/nameValidator';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });

  const signup = async () => {
    if (!name.value || !email.value || !password.value) {
      setName({ ...name, error: 'Name is required' });
      setEmail({ ...email, error: 'Email is required' });
      setPassword({ ...password, error: 'Password is required' });
      return;
    }

    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email.value, password.value);
      const user = userCredential.user;

      // console.log('uid----------->>>>>>>>>>>>>', user.uid);
    
      firestore().collection('user').doc(user.uid).set({
        email: email.value,
        fullname: name.value,
        uid: user.uid,
        password: password.value,
      });
      Alert.alert('user successfully registered')

      navigation.replace('LoginScreen');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setEmail({ ...email, error: 'That email address is already in use!' });
      } else if (error.code === 'auth/invalid-email') {
        setEmail({ ...email, error: 'That email address is invalid!' });
      } else {
        console.error(error);
      }
    }
  };

  
  return (
    <Background>
      <Logo />
      <Header>Create Account</Header>
      <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
        keyboardAvoidingView={true}
        IconName="keyboard-o"
      />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        IconName="heart"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
        IconName="unlock-alt"
      />
      <Button mode="contained" onPress={signup} style={{ marginTop: 24 }}>
        Sign Up
      </Button>

      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});
