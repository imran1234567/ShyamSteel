import React, { useState, useEffect } from 'react'
import {
  View,
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
} from 'react-native'
import { useTheme } from '@/Hooks'
import axios from 'axios'

const ExampleContainer = () => {
  const { Gutters, Layout } = useTheme()
  const [photoList, setPhotoList] = useState([])

  useEffect(() => {
    getPhotoList()
  }, [])

  const getPhotoList = () => {
    axios({
      method: 'GET',
      url: `https://picsum.photos/v2/list?page=2&limit=20`,
    })
      .then(response => {
        if (response?.data) {
          setPhotoList(response?.data)
        }
      })
      .catch(error => {
        console.log('Error', error)
      })
  }

  const renderItem = data => {
    return (
      <View
        style={{
          height: 200,
          width: '92%',
          backgroundColor: 'white',
          borderRadius: 15,
          marginBottom: 15,
          marginLeft: 15,
        }}
      >
        <Image
          source={{ uri: data?.download_url }}
          style={{ width: '100%', height: '100%' }}
        />
      </View>
    )
  }

  return (
    <View>
      <FlatList data={photoList} renderItem={item => renderItem(item.item)} />
    </View>
  )
}

export default ExampleContainer
