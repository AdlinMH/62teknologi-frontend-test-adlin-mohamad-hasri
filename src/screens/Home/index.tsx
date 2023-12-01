import React, { useCallback } from 'react'
import { FlatList, Text, View, ActivityIndicator } from 'react-native'
import { responsiveWidth } from 'react-native-responsive-dimensions'
import FastImage from 'react-native-fast-image'
import { Card } from '@rneui/themed'

import { useTheme } from '@/hooks'
import { BottomSheetCustom } from '@/components'
import { useGetBusinessesSearchQuery } from '@/apis/businesses'
import { BusinessesGetSearchRes_Business } from '@/apis/businesses/_types'

const LazyMapViewComponent = React.lazy(() => import('@/components/MapCustom'))

function Home() {
  const { Layout, Fonts, Gutters } = useTheme()

  const { isLoading, data, error } = useGetBusinessesSearchQuery({ location: 'NYC' })

  const { status: errStatus, data: errData } = (error || {}) as any

  const renderItem = useCallback(({ item }: { item: BusinessesGetSearchRes_Business }) => (
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
  ), []);

  return (
    <View style={[Layout.fill, { backgroundColor: 'red' }]}>
      {/* Map */}
      <LazyMapViewComponent />

      {/* Display Loading */}
      {isLoading && (
        <View style={[Layout.fullHeight, Layout.fullWidth, Layout.positionAbsolute, Layout.center, Layout.backgroundWhite, Layout.opacity5, { zIndex: 10 }]}>
          <ActivityIndicator size="large"/>
        </View>
      )}

      {/* Display List */}
      <BottomSheetCustom isVisible={true} withBackdrop={false} panelStyle={[Layout.backgroundTransparent]}>
        {data && (
          <FlatList
            horizontal
            data={data.businesses}
            renderItem={renderItem}
            showsHorizontalScrollIndicator={false}
          />
        )}
      </BottomSheetCustom>

      {/* Display Error */}
      {(errStatus || errData) && (
        <BottomSheetCustom isVisible={true} withBackdrop={false} containerStyle={[Gutters.paddingSmall]}>
          <Text style={[Fonts.colorError500]}>
            {errStatus} {errData?.description}
          </Text>
        </BottomSheetCustom>
      )}
    </View>
  )
}

export default Home
