import React, { useCallback, useMemo, useRef, useState } from 'react'
import { ActivityIndicator, FlatList, View, Text } from 'react-native'

import { useTheme } from '@/hooks'
import { BusinessesGetSearchRes_Business } from '@/apis/businesses/_types'

import BusinessItem from './businessItem'
import { Button } from '@rneui/themed'

import { useGetBusinessesSearchQuery } from '@/apis/businesses'

function BusinessList() {
  // theming/styling
  const { Layout, Gutters, Fonts } = useTheme()

  // flatlist ref
  const flatlistRef = useRef<FlatList<BusinessesGetSearchRes_Business> | null>()

  /**
   * LOCAL STATES
   */
  const [limit] = useState<number>(5) // return 5 data by default
  const [offset, setOffset] = useState<number>(0) // 0 is page 1

  /**
   * API: get business search
   * */
  const { isLoading, isFetching, data, error } = useGetBusinessesSearchQuery({ location: 'NYC', limit, offset })
  const { status: errStatus, data: errData } = (error || {}) as any

  /**
   * MEMOIZE OBJECTS
   */
  const isPrevAny = useMemo(() => {
    const prevOffset = offset - limit
    if (prevOffset < 0) {
      return false
    }
    return true
  }, [offset, limit])
  
  const isNextAny = useMemo(() => {
    const nextOffset = offset + limit
    if (nextOffset >= (data?.total || 0)) {
      return false
    }
    return true
  }, [offset, limit, data?.total])


  /**
   * EVENT CALLBACKS
   */
  const setToPrevPage = useCallback(() => {
    setOffset((prev) => {
      if (isPrevAny) {
        return prev - limit
      }
      return prev
    })
  }, [isPrevAny, limit])

  const setToNextPage = useCallback(() => {
    setOffset((prev) => {
      if (isNextAny) {
        return prev + limit
      }
      return prev
    })
  }, [isNextAny, limit])


  /**
   * RENDER ITEMS
   */
  const renderItem = useCallback(({ item }: { item: BusinessesGetSearchRes_Business }) => {
    return <BusinessItem item={item} />
  }, [])


  /**
   * VIEWS
   */
  return (
    <View>
      {/* Display Loading */}
      {(isLoading || isFetching) && (
        <View style={[Layout.fullHeight, Layout.fullWidth, Layout.positionAbsolute, Layout.center, Layout.backgroundWhite, Layout.opacity5, { zIndex: 10 }]}>
          <ActivityIndicator size="large"/>
        </View>
      )}

      {/* Display Error */}
      {(errStatus !== undefined || errData !== undefined) && (
        <View style={[Gutters.paddingSmall, Layout.center]}>
          <Text style={[Fonts.colorError500]}>
            {errStatus || ''} {errData?.description || 'No Connection Established'}
          </Text>

          <Button size="sm">
            reload
          </Button>
        </View>
      )}

      {/* Display Lists */}
      <FlatList
        ref={(e) => { flatlistRef.current = e }}
        data={data?.businesses || []}
        renderItem={renderItem}
        keyExtractor={(item) => `business-${item.id}`}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={(
          <View style={[Layout.fullWidth, Layout.row, Layout.justifyContentBetween, Gutters.paddingHorizontalTiny, Gutters.paddingVerticalSmall]}>
            <Button
              type="solid"
              title="Prev"
              icon={{
                name: 'chevron-left',
                type: 'feather',
                size: 25,
                color: 'black',
              }}
              onPress={() => {
                setToPrevPage()
              }}
              titleStyle={[Fonts.colorBlack500]}
              buttonStyle={[Layout.backgroundBlack100, Gutters.radiusHuge]}
              disabledStyle={[Layout.opacity5]}
              disabled={!isPrevAny}
            />

            <Button
              type="solid"
              title="Next"
              icon={{
                name: 'chevron-right',
                type: 'feather',
                size: 25,
                color: 'black',
              }}
              iconPosition="right"
              onPress={() => {
                setToNextPage()
                flatlistRef.current?.scrollToOffset({ animated: true, offset: 0 })
              }}
              titleStyle={[Fonts.colorBlack500]}
              buttonStyle={[Layout.backgroundBlack100, Gutters.radiusHuge]}
              disabledStyle={[Layout.opacity5]}
              disabled={!isNextAny}
            />
          </View>
        )}
      />
    </View>
  )
}

export default BusinessList
