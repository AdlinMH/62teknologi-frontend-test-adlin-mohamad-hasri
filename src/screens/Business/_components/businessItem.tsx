import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { responsiveWidth } from 'react-native-responsive-dimensions'
import FastImage from 'react-native-fast-image'
import { Card, Chip } from '@rneui/themed'

import { useTheme } from '@/hooks'
import { navigate } from '@/navigators/utils'
import { Business } from '@/apis/businesses/_types'

import RatingDisplay from './ratingDisplay'
import { Colors } from '@/theme/variables'


const BusinessItem = ({ item }: { item: Business }) =>{
  const { Layout, Gutters, Fonts } = useTheme()

  return (
    <Card containerStyle={[Gutters.radiusTiny, Gutters.marginHorizontalTiny, Gutters.paddingNone]}>
      <Pressable style={[Layout.row]} onPress={() => { 
        navigate('BusinessDetail', {
          business_id_or_alias: item.id,
          coordinate: item.coordinates,
        })
      }}>
        {/* left side - image content */}
        <FastImage
          style={[
            Gutters.radiusTopLeftTiny, Gutters.radiusBottomLeftTiny, Gutters.marginRightTiny,
            { width: responsiveWidth(30), height: '100%' }
          ]}
          source={{
              uri: item.image_url,
              priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />

        {/* right side - info content */}
        <View style={[Gutters.paddingTiny, Layout.fill]}>
          <Text style={[Fonts.h3]}>{item.name}</Text>
          <RatingDisplay item={item} size="sm" />
          <View style={[Layout.row, { flexWrap: 'wrap' }]}>
            {item.categories?.map((cat) => (
              <Chip type="solid" color={Colors.primary400} size="sm" title={cat.title} buttonStyle={[Gutters.paddingVerticalNone]} containerStyle={[Gutters.marginRightTiny, { marginTop: 5 }]} />
            ))}
          </View>
        </View>
      </Pressable>
    </Card>
)};

export default BusinessItem
