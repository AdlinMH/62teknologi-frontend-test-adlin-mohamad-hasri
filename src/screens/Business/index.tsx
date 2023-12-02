import React from 'react'
import { View } from 'react-native'

import { useTheme } from '@/hooks'

import BusinessList from './_components/businessList'
import HomeBottomSheet from './_components/homeBottomSheet'

const LazyMapViewComponent = React.lazy(() => import('@/components/MapCustom'))

function BusinessScreen() {
  const { Layout } = useTheme()

  return (
    <View style={[Layout.fill]}>
      {/* Map Component */}
      <LazyMapViewComponent />

    <HomeBottomSheet
      isVisible={true}
      panelStyle={[Layout.backgroundWhite, Layout.fullHeight, { zIndex: 1 }]}
    >
      {/* Display List */}
      <BusinessList />
    </HomeBottomSheet>
    </View>
  )
}

export default BusinessScreen
