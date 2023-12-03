import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { responsiveWidth } from 'react-native-responsive-dimensions'
import FastImage from 'react-native-fast-image'
import { Card } from '@rneui/themed'

import { useTheme } from '@/hooks'
import { navigate } from '@/navigators/utils'
import { Business } from '@/apis/businesses/_types'


const BusinessItem = ({ item }: { item: Business }) =>{
  const { Layout, Gutters } = useTheme()

  return (
    <Card containerStyle={[Gutters.radiusTiny, Gutters.marginHorizontalTiny]}>
      <Pressable style={[Layout.row]} onPress={() => { 
        navigate('BusinessDetail', {
          business_id_or_alias: item.id,
          coordinate: item.coordinates,
        })
      }}>
        {/* left side - image content */}
        <FastImage
          style={[
            Gutters.radiusTiny, Gutters.marginRightTiny,
            { width: responsiveWidth(30), height: responsiveWidth(30)}
          ]}
          source={{
              uri: item.image_url,
              priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />

        {/* right side - info content */}
        <View>
          <Card.Title>{item.name}</Card.Title>
          <Card.Divider />
          <View>
            <Text>{item.name}</Text>
          </View>
        </View>
      </Pressable>
    </Card>
)};

export default BusinessItem
