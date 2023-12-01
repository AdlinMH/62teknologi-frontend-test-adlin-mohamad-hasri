import React from 'react'
import { Text, View } from 'react-native'
import { responsiveWidth } from 'react-native-responsive-dimensions'
import FastImage from 'react-native-fast-image'
import { Card } from '@rneui/themed'

import { useTheme } from '@/hooks'
import { BusinessesGetSearchRes_Business } from '@/apis/businesses/_types'


const BusinessItem = ({ item }: { item: BusinessesGetSearchRes_Business }) =>{
  const { Layout, Gutters } = useTheme()

  return (
    <Card containerStyle={[Gutters.radiusTiny, Gutters.marginHorizontalTiny, { width: responsiveWidth(80) }]}>
      <View style={[Layout.row]}>
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
        <View >
          <Card.Title>{item.name}</Card.Title>
          <Card.Divider />
          <View>
            <Text>
              {item.name}
            </Text>
          </View>
        </View>
      </View>
    </Card>
)};

export default BusinessItem
