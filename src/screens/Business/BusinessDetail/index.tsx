import React, { useEffect, useRef } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import {LinearGradient} from 'react-native-linear-gradient'
import { SliderBox } from 'react-native-image-slider-box'
import { Route } from '@react-navigation/native'
import FastImage from 'react-native-fast-image'
import Toast from 'react-native-toast-message'
import { Chip } from '@rneui/themed'
import { Button } from '@rneui/themed'

import { useTheme } from '@/hooks'
import { Colors } from '@/theme/variables'
import { animateToPoint } from '@/utils/functions/map'
import { Business_Coordinate } from '@/apis/businesses/_types'
import { useGetBusinessesDetailQuery } from '@/apis/businesses'
import MapViewMarkersComponents from '@/components/MapCustom/_components/mapViewMarkersComponent'
import { useMapViewStore } from '@/components/MapCustom/_store/mapViewStore'

import BusinessDetailReviewList from '../_components/reviewList'
import RatingDisplay from '../_components/ratingDisplay'
import { MapMarker } from 'react-native-maps'

interface Props {
  business_id_or_alias: number
  business_name: string
  coordinate: Business_Coordinate
}

function BusinessDetail({ route } : { route?: Route<'BusinessDetail', Props> }) {
  // theming/styling
  const { Layout, Gutters, Fonts } = useTheme()

  // params
  const { business_id_or_alias, business_name, coordinate } = route?.params || {}

  const markerRef = useRef<MapMarker>(null)

  /**
   * API: get business detail
   * */
  const { isLoading, isFetching, data, error, refetch } = useGetBusinessesDetailQuery({ business_id_or_alias })
  const { status: errStatus, data: errData } = (error || {}) as any

  useEffect(() => {
    if (coordinate?.latitude && coordinate.longitude) {
      useMapViewStore.setState({
        mapChildren: (
          <MapViewMarkersComponents
            point={{ latitude: coordinate.latitude, longitude: coordinate.longitude}}
            title={business_name}
            markerRef={markerRef}
          />
        ),
        mapOnRegionChangeComplete: () => {
          if (markerRef && markerRef.current && markerRef.current.showCallout) {
            console.log('Vddvdvdf', markerRef?.current)
            markerRef?.current?.showCallout()
          }
        }
      })
      animateToPoint(useMapViewStore.getState().mapRefCurrent, coordinate)
    }

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
          <LinearGradient colors={[Colors.black500, Colors.transparent]} style={[Layout.positionAbsolute, Layout.top0, Layout.fullWidth, Layout.opacity4, { zIndex: 20, height: 20 }]} />
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
                <RatingDisplay item={{ rating: data.rating }} size="md" onFinishRating={() => {
                    Toast.show({
                      type: 'success',
                      text1: 'Thanks for the stars :)',
                    })
                  }}  />
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

      <BusinessDetailReviewList business_id_or_alias={business_id_or_alias} />

     {/* Body */}
      <View style={[Gutters.paddingHorizontalSmall]}>
        {/* Display Loading */}
        {(isLoading || isFetching) && (
          <View style={[Layout.fullWidth, Layout.positionAbsolute, Layout.center, Gutters.paddingLarge, { zIndex: 10 }]}>
            <ActivityIndicator size="large" />
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

