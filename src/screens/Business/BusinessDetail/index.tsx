import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { SliderBox } from 'react-native-image-slider-box'
import FastImage from 'react-native-fast-image'
import { Route } from '@react-navigation/native'
import { Button } from '@rneui/themed'

import { useTheme } from '@/hooks'
import { useGetBusinessesDetailQuery } from '@/apis/businesses'
import {LinearGradient} from 'react-native-linear-gradient'
import { Colors } from '@/theme/variables'

interface Props {
  business_id_or_alias: number
}

function BusinessDetail({ route } : { route?: Route<'BusinessDetail', Props> }) {
  // theming/styling
  const { Layout, Gutters, Fonts } = useTheme()

  // cno
  const { business_id_or_alias } = route?.params || {}

  /**
   * LOCAL STATES
   */
  // ......

  /**
   * API: get business detail
   * */
  const { isLoading, isFetching, data, error, refetch } = useGetBusinessesDetailQuery({ business_id_or_alias })
  const { status: errStatus, data: errData } = (error || {}) as any

  /**
   * VIEWS
   */
  return (
    <View style={[Layout.backgroundWhite, Layout.fill]}>
      {/* Content Header Container */}
        {data && (
          <View style={[Layout.positionRelative]}>
            <SliderBox
              ImageComponent={FastImage}
              images={data?.photos}
              autoplay
              circleLoop
            />
            <View style={[Layout.positionAbsolute, Gutters.bottomNone, Layout.fullWidth]}>
              <LinearGradient colors={[Colors.transparent, Colors.black400]} style={[Gutters.paddingSmall]}>
              <Text style={[Fonts.h1, Fonts.colorWhite, Fonts.textBold]}>
                {data?.name}
              </Text>
              </LinearGradient>
            </View>
          </View>
        )}

     {/* Body */}
      <View style={[Gutters.paddingHorizontalSmall]}>
        {/* Display Loading */}
        {(isLoading || isFetching) && (
          <View style={[Layout.fullWidth, Layout.positionAbsolute, Layout.center, Gutters.paddingLarge, { zIndex: 10 }]}>
            <ActivityIndicator size="large"/>
          </View>
        )}

        {/* Display Error */}
        {(errStatus !== undefined || errData !== undefined) && (
          <View style={[Gutters.paddingSmall, Layout.center]}>
            <Text style={[Fonts.colorError500, Gutters.marginBottomRegular]}>
              {errStatus || ''} {errData?.description || 'No Connection Established'}
            </Text>

            <Button size="sm" onPress={() => { refetch() }}>
              reload
            </Button>
          </View>
        )}
      </View>
    </View>
  )
}

export default BusinessDetail
