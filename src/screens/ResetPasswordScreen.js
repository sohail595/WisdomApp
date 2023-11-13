// import React, { useState } from 'react'
// import Background from '../components/Background'
// import BackButton from '../components/BackButton'
// import Logo from '../components/Logo'
// import Header from '../components/Header'
// import TextInput from '../components/TextInput'
// import Button from '../components/Button'
// import { emailValidator } from '../helpers/emailValidator'

// export default function ResetPasswordScreen({ navigation }) {
//   const [email, setEmail] = useState({ value: '', error: '' })

//   const sendResetPasswordEmail = () => {
//     const emailError = emailValidator(email.value)
//     if (emailError) {
//       setEmail({ ...email, error: emailError })
//       return
//     }
//     navigation.navigate('LoginScreen')
//   }

//   return (
//     <Background>
//       <BackButton goBack={navigation.goBack} />
//       <Logo />
//       <Header>Restore Password</Header>
//       <TextInput
//         label="E-mail address"
//         returnKeyType="done"
//         value={email.value}
//         onChangeText={(text) => setEmail({ value: text, error: '' })}
//         error={!!email.error}
//         errorText={email.error}
//         autoCapitalize="none"
//         autoCompleteType="email"
//         textContentType="emailAddress"
//         keyboardType="email-address"
//         description="You will receive email with password reset link."
        
//       />
//       <Button
//         mode="contained"
//         onPress={sendResetPasswordEmail}
//         style={{ marginTop: 16 }}
//       >
//         Send Instructions
//       </Button>
//     </Background>
//   )
// }


import React, { useState } from 'react';
import { View, Text, TouchableOpacity,StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth'; // Assuming you are using Firebase Authentication
import Background from '../components/Background';
import BackButton from '../components/BackButton';
import Logo from '../components/Logo';
import Header from '../components/Header';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import { emailValidator } from '../helpers/emailValidator';

export default function ResetPasswordScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [resetSent, setResetSent] = useState(false);

  const handleResetPassword = async () => {
    const emailError = emailValidator(email.value);

    if (emailError) {
      setEmail({ ...email, error: emailError });
      return;
    }

    try {
      await auth().sendPasswordResetEmail(email.value);
      setResetSent(true);
    } catch (error) {
      console.error('Error sending password reset email:', error);
    }
  };

  return (
    <Background>
      <Logo />
      <Header>Restore Password</Header>
      <TextInput
        label="E-mail address"
        returnKeyType="done"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        description="You will receive an email with a password reset link."
        IconName="envelope"
      />
      <Button
        mode="contained"
        onPress={handleResetPassword}
        style={{ marginTop: 16 }}
      >
        Send Instructions
      </Button>

      {resetSent && (
        <View style={styles.login_wrapper}>
          <View style={styles.form}>
            <Text>{'Password reset email sent!'}</Text>
          </View>
        </View>
      )}
    </Background>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    marginVertical: 10,
  },
  button: {
    marginTop: 16,
  },
  successMessage: {
    marginTop: 20,
    color: 'green',
    fontWeight: 'bold',
  },
});