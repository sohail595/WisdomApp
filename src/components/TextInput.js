import React from 'react'
import { View, StyleSheet, Text,ic } from 'react-native'
import { TextInput as Input } from 'react-native-paper'
import { theme } from '../core/theme'
import Icon from 'react-native-vector-icons/FontAwesome' 
export default function TextInput({ errorText, description,IconName, ...props}) {
  return (
    <View style={styles.container}>
  <View style={styles.iconContainer}>
    <Icon name={IconName} size={20} color={"brown"} />
  </View>
  <Input
    style={styles.input}
    selectionColor={theme.colors.primary}
    underlineColor="transparent"
    mode="outlined"
    {...props}
  />
  {description && !errorText ? (
    <Text style={styles.description}>{description}</Text>
  ) : null}
  {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
</View>

  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 10,
  },
  input: {
    backgroundColor: theme.colors.surface,
    paddingLeft:25
  },
  description: {
    fontSize: 13,
    color: theme.colors.secondary,
    paddingTop: 8,
  },
  error: {
    fontSize: 13,
    color: theme.colors.error,
    paddingTop: 8,
  },
  iconContainer: {
    position: 'absolute',
    top: 20,
    left: 10,
    zIndex:1
  },
  
})
