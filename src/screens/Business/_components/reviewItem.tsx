import React from 'react'
import { View, Text } from 'react-native'
import { AirbnbRating } from '@rneui/themed'
import moment from 'moment'

import { useTheme } from '@/hooks'
import { Business_Review } from '@/apis/businesses/_types'

import { Avatar } from '@rneui/base'

interface Props {
  item: Business_Review
}

function BusinessDetailReviewItem({ item }: Props) {
  // theming/styling
  const { Layout, Gutters, Fonts } = useTheme()
  /**
   * VIEWS
   */
  return (
    <View style={[Gutters.paddingBottomTiny, Gutters.marginBottomSmall, Layout.borderBottomColorBlack200, { borderBottomWidth: 1 }]}>
      {/* profile */}
      <View style={[Layout.row]}>
        <Avatar size={48} rounded source={{ uri: item.user.image_url || undefined }} />
        <View style={[Layout.justifyContentCenter, Layout.fill, Gutters.leftTiny]}>
          <Text>{item.user.name}</Text>
          <View style={[Layout.rowHCenter, Layout.justifyContentBetween, { width: '95%' }]}>
            <View style={[Layout.rowHCenter, { }]}>
              <AirbnbRating showRating={false} defaultRating={item.rating} size={15} isDisabled />
              <Text style={[Fonts.sizeRegular, Fonts.colorWarning500, Fonts.familyMedium, Gutters.leftTiny]}>{item?.rating?.toFixed(1)}</Text>
            </View>
            <Text style={[Fonts.sizeSmall, Fonts.colorBlack500]}>{moment(item.time_created).fromNow()}</Text>
          </View>
        </View>
      </View>

      {/* text */}
      <View style={[Gutters.paddingTiny]}>
        <Text>{item.text}</Text>
      </View>
    </View>
  )
}

export default BusinessDetailReviewItem
