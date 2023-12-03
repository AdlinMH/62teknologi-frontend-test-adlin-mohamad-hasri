import React from 'react'
import { View } from 'react-native'
import { responsiveScreenHeight } from 'react-native-responsive-dimensions'
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack'
import { SafeAreaView } from 'react-native-safe-area-context'
import FeatherIcons from 'react-native-vector-icons/Feather'
import { Button } from '@rneui/base'

import { useTheme } from '@/hooks'
import { getCurrentScreenName, navigateBack } from '@/navigators/utils'

import HomeBottomSheet from './_components/homeBottomSheet'

import BusinessList from './BusinessList'
import BusinessDetail from './BusinessDetail'

const Stack = createStackNavigator()

const LazyMapViewComponent = React.lazy(() => import('@/components/MapCustom'))

function BusinessScreen() {
  const { Layout, Gutters, Common } = useTheme()

  const currScreenIsDetail = getCurrentScreenName() === 'BusinessDetail'

  return (
    <View style={[Layout.fill]}>
      {/* Map Component */}
      <LazyMapViewComponent />

     {/* Back Button */}
      <View style={[Layout.positionAbsolute, Layout.backgroundWhite, Gutters.topLarge, Gutters.leftSmall, Gutters.radiusLarge, Common.buttonShadow, { zIndex: 1 }]}>
        <Button type="clear" onPress={() => { navigateBack() }}>
          <FeatherIcons name="arrow-left" size={20} color={'black'} />
        </Button>
      </View>

      {/* Custom BottomSheet */}
      <HomeBottomSheet
        collapsed={currScreenIsDetail}
        collapsedHeight={responsiveScreenHeight(75)}
        panelStyle={[Layout.fullHeight, { zIndex: 1 }]}
      >
        <SafeAreaView style={[Layout.fullHeight, Layout.borderColorBlack300, Layout.borderWidth0_5, Common.buttonShadow]} edges={currScreenIsDetail ? [] : ['top', 'bottom']}>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="BusinessList" component={BusinessList} />
            <Stack.Screen name="BusinessDetail" component={BusinessDetail} options={{
              title: 'Profile',
              cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
            }} />
          </Stack.Navigator>
        </SafeAreaView>
      </HomeBottomSheet>
    </View>
  )
}

export default BusinessScreen
