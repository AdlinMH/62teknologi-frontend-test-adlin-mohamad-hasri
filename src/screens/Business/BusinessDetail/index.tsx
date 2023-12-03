import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { AirbnbRating, Chip } from '@rneui/themed'
import { SliderBox } from 'react-native-image-slider-box'
import Toast from 'react-native-toast-message'
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

  // params
  const { business_id_or_alias } = route?.params || {}

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
              <LinearGradient colors={[Colors.transparent, Colors.black400]} style={[Gutters.paddingSmall, Layout.col, Layout.itemsStart]}>
                <Text style={[Fonts.h1, Fonts.colorWhite, Fonts.textBold, Gutters.marginBottomTiny]}>
                  {data?.name}
                </Text>
                <View style={[Layout.fullWidth, Layout.row, Layout.justifyContentBetween]}>
                  <AirbnbRating showRating={false} size={15} onFinishRating={() => {
                      Toast.show({
                        type: 'success',
                        text1: 'Thanks for the stars :)',
                      })
                    }} />
                  <Chip
                    title={data?.is_closed ? 'Closed' : 'Open'}
                    color={data?.is_closed ? Colors.error500 : Colors.success600}
                    buttonStyle={[{ paddingVertical: 4 }]} titleStyle={[Fonts.familySemiBold]}
                  />
                </View>
                
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
