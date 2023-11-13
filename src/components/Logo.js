import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function Logo() {
  return <Image  
  // source={require("../assets/library.png")}
  source={{uri:"https://play-lh.googleusercontent.com/Sm1DxxVQpsMGankADgsbl-5VQuLu9mpSiiMAYtC0bhGmP5kia5dnx6GqW1FHMtOTUU4=w240-h480-rw"}} 
     style={styles.image} />
}

const styles = StyleSheet.create({
  image: {
    width: 110,
    height: 110,
    marginBottom: 8,
    borderRadius:20,
  },
})
