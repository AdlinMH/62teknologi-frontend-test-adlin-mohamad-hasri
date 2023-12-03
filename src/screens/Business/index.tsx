import React from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { createStackNavigator } from '@react-navigation/stack'

import { useTheme } from '@/hooks'

import HomeBottomSheet from './_components/homeBottomSheet'

import BusinessList from './BusinessList'
import BusinessDetail from './BusinessDetail'

const Stack = createStackNavigator()

const LazyMapViewComponent = React.lazy(() => import('@/components/MapCustom'))

function BusinessScreen() {
  const { Layout } = useTheme()

  return (
    <View style={[Layout.fill]}>
      {/* Map Component */}
      <LazyMapViewComponent />

      <HomeBottomSheet
        isVisible={true}
        panelStyle={[Layout.fullHeight, { zIndex: 1 }]}
      >
        <SafeAreaView style={[Layout.fullHeight]}>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="BusinessList" component={BusinessList} />
            <Stack.Screen name="BusinessDetail" component={BusinessDetail} />
          </Stack.Navigator>
        </SafeAreaView>
      </HomeBottomSheet>
    </View>
  )
}

export default BusinessScreen
