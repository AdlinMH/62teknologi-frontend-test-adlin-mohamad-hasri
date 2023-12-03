import React from 'react'
import { View, Text } from 'react-native'
import { Header } from '@rneui/themed'

// import { useTheme } from '@/hooks'
import { navigateBack } from '@/navigators/utils'

function BusinessDetail() {
  // theming/styling
  // const { Layout } = useTheme()

  /**
   * LOCAL STATES
   */
  // ......

  /**
   * API: get business detail
   * */
  // const { isLoading, isFetching, data, error } = useGetBusinessesSearchQuery({ location: 'NYC', limit, offset, term, attributes: selectedAttributes || [] })
  // const { status: errStatus, data: errData } = (error || {}) as any


  /**
   * VIEWS
   */
  return (
    <View>
      <Header
        leftComponent={{ icon: "arrow-left", type: "feather", onPress: () => { navigateBack() } }}
        centerComponent={{ text: "Title" }}
        backgroundColor="white"
        placement="center"
        edges={[]}
      />

      <Text>content</Text>
    </View>
  )
}

export default BusinessDetail
