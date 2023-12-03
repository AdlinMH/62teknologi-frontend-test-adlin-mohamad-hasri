import React, { useEffect } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import {LinearGradient} from 'react-native-linear-gradient'
import { SliderBox } from 'react-native-image-slider-box'
import { Route } from '@react-navigation/native'
import FastImage from 'react-native-fast-image'
import Toast from 'react-native-toast-message'
import { AirbnbRating, Chip } from '@rneui/themed'
import { Button } from '@rneui/themed'

import { useTheme } from '@/hooks'
import { Colors } from '@/theme/variables'
import { useGetBusinessesDetailQuery } from '@/apis/businesses'
import { useMapViewStore } from '@/components/MapCustom/_store/mapViewStore'
import MapViewMarkersComponents from '@/components/MapCustom/_components/mapViewMarkersComponent'
import { Business_Coordinate } from '@/apis/businesses/_types'
import { animateToPoint } from '@/utils/functions/map'

interface Props {
  business_id_or_alias: number
  coordinate: Business_Coordinate
}

function BusinessDetail({ route } : { route?: Route<'BusinessDetail', Props> }) {
  // theming/styling
  const { Layout, Gutters, Fonts } = useTheme()

  // map store
  // const 

  // params
  const { business_id_or_alias, coordinate } = route?.params || {}

  /**
   * API: get business detail
   * */
  const { isLoading, isFetching, data, error, refetch } = useGetBusinessesDetailQuery({ business_id_or_alias })
  const { status: errStatus, data: errData } = (error || {}) as any

  useEffect(() => {
    if (coordinate?.latitude && coordinate.longitude) {
      useMapViewStore.setState({ mapChildren: (
        <MapViewMarkersComponents point={{
          latitude: coordinate.latitude,
          longitude: coordinate.longitude
        }}
        />
      )})
    }

    // useMapViewStore.getState().mapRefCurrent?.animateCamera()
    animateToPoint(useMapViewStore.getState().mapRefCurrent, coordinate)

    return () => {
      useMapViewStore.setState({ mapChildren: undefined })
    }
  }, [coordinate])

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
              <LinearGradient colors={[Colors.transparent, Colors.black500]} style={[Gutters.paddingSmall, Layout.col, Layout.itemsStart]}>
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

