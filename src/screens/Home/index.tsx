import React, { useCallback, useEffect } from 'react'
import { FlatList, Text, View } from 'react-native'
import { Card } from '@rneui/themed'

import { useTheme } from '@/hooks'
import { useGetBusinessesSearchQuery } from '@/apis/businesses'
import { BottomSheetCustom } from '@/components'
import { BusinessesGetSearchRes_Business } from '@/apis/businesses/_types'

const LazyMapViewComponent = React.lazy(() => import('@/components/MapCustom'))

function Home() {
  const { Layout, Fonts, Gutters } = useTheme()

  const { data, error } = useGetBusinessesSearchQuery({ location: 'NYC' })

  const { status: errStatus, data: errData } = (error || {}) as any

  const renderItem = useCallback(({ item }: { item: BusinessesGetSearchRes_Business }) => (
    <Card>
      <Card.Title>{item.name}</Card.Title>
      <Card.Divider />
      <View>
        {/* <Image
          style={styles.image}
          resizeMode="cover"
          source={{ uri: u.avatar }}
        /> */}
        <Text>
          {item.name}
        </Text>
      </View>
    </Card>
  ), []);

  useEffect(() => {
    console.tron('data', data)
  }, [data])

  useEffect(() => {
    console.tron('error', error)
  }, [error])

  return (
    <View style={[Layout.fill, { backgroundColor: 'red' }]}>
      <LazyMapViewComponent />

      <BottomSheetCustom isVisible={true} withBackdrop={false} panelStyle={[Layout.backgroundTransparent]}>
        {data && (
          <FlatList horizontal data={data.businesses} renderItem={renderItem} showsHorizontalScrollIndicator={false} />
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
