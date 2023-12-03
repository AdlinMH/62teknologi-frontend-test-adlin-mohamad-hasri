import React from 'react'
import { Text, View } from 'react-native'
import { AirbnbRating } from '@rneui/themed'

import { useTheme } from '@/hooks'
import { Business } from '@/apis/businesses/_types'
import { FontSize } from '@/theme/variables/FontSize'

interface Props {
  item: Pick<Business, 'rating' | 'review_count'>
  size: 'sm' | 'md'
  onFinishRating?: () => void
}

const sizeConst = {
  'sm': {
    ratingStar: 15,
    ratingNum: FontSize.small,
    reviewCount: FontSize.small,
  },
  'md': {
    ratingStar: 20,
    ratingNum: FontSize.medium,
    reviewCount: FontSize.regular,
  }
}

const RatingDisplay = ({ item, size, onFinishRating }: Props) =>{
  const { Layout, Fonts } = useTheme()

  return (
    <View style={[Layout.rowHCenter]}>
      {item?.rating ? (
        <>
        <AirbnbRating showRating={false} defaultRating={item.rating} size={sizeConst[size].ratingStar} isDisabled={!onFinishRating} ratingContainerStyle={{ marginTop: -1 }} onFinishRating={onFinishRating} />
        <Text style={[Fonts.familyMedium, Fonts.colorWarning500, Fonts.textBold, { marginLeft: 5, fontSize: sizeConst[size].ratingNum }]}>
          {item?.rating?.toFixed(1)}
        </Text>
        </>
      ) : null}
      {item.review_count ? (
        <Text style={[Fonts.familyMedium, Fonts.colorInformation500, { marginLeft: 5, fontSize: sizeConst[size].reviewCount }]}>
          {`(${item.review_count} reviews)`}
        </Text>
      ) : null}
    </View>
)};

export default RatingDisplay
