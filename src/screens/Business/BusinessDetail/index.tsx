import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { Route } from '@react-navigation/native'
import { Button, Header } from '@rneui/themed'

import { useTheme } from '@/hooks'
import { navigateBack } from '@/navigators/utils'
import { useGetBusinessesDetailQuery } from '@/apis/businesses'

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
      {/* Header */}
      <Header
        leftComponent={{ icon: "arrow-left", type: "feather", onPress: () => { navigateBack() } }}
        backgroundColor="white"
        placement="center"
        edges={[]}
      />

     {/* Body */}
      <View style={[Gutters.paddingHorizontalSmall]}>
        {data && (
          <>
            {/* Title */}
            <Text style={[Fonts.h1, Fonts.colorBlack900, Fonts.textBold]}>
              {data?.name}
            </Text>

            <Text style={[Fonts.sizeRegular, Fonts.colorBlack900]}>
              {data?.display_phone}
            </Text>
          </>
        )}

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
