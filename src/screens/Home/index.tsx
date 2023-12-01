import React, { useState } from 'react'
import { Text, View, ActivityIndicator } from 'react-native'

import { useTheme } from '@/hooks'
import { BottomSheetCustom } from '@/components'
import { useGetBusinessesSearchQuery } from '@/apis/businesses'
import { Button } from '@rneui/themed'

import BusinessList from './_components/businessList'

const LazyMapViewComponent = React.lazy(() => import('@/components/MapCustom'))

function Home() {
  const { Layout, Fonts, Gutters } = useTheme()

  const [limit] = useState<number>(5) // return 5 data by default
  const [offset, setOffset] = useState<number>(0) // 0 is page 1

  const { isLoading, isFetching, data, error } = useGetBusinessesSearchQuery({ location: 'NYC', limit, offset })
  const { status: errStatus, data: errData } = (error || {}) as any

  return (
    <View style={[Layout.fill, { backgroundColor: 'red' }]}>
      {/* Map Component */}
      <LazyMapViewComponent />

      {/* Display Loading */}
      {(isLoading || isFetching) && (
        <View style={[Layout.fullHeight, Layout.fullWidth, Layout.positionAbsolute, Layout.center, Layout.backgroundWhite, Layout.opacity5, { zIndex: 10 }]}>
          <ActivityIndicator size="large"/>
        </View>
      )}

      {/* Display List */}
      <BusinessList
        data={data}
        limit={limit}
        offset={offset}
        setOffset={setOffset}
      />

      {/* Display Error */}
      {(errStatus !== undefined || errData !== undefined) && (
        <BottomSheetCustom isVisible={true} withBackdrop={false} panelStyle={{ zIndex: 2 }} containerStyle={[Gutters.paddingSmall, Layout.center]}>
          <Text style={[Fonts.colorError500]}>
            {errStatus || ''} {errData?.description || 'No Connection Established'}
          </Text>

          <Button size="sm">
            reload
          </Button>
        </BottomSheetCustom>
      )}
    </View>
  )
}

export default Home
