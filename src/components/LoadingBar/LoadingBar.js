import React from 'react'
import { Modal, View, Text, ActivityIndicator } from 'react-native'
import styles from './style'
import { STRING } from '../../constant/Strings'

const LoadingBar = () => {
    return (
      
    <Modal visible={true} transparent={true}>
            <View style={styles.container}>
              <View style={styles.box}>
            <Text style={styles.txtDesign}>{STRING.LOADING_BAR_MSG }</Text>
                <ActivityIndicator size={'large'} />
                </View>
            </View>
          </Modal>
  )
}

export default LoadingBar