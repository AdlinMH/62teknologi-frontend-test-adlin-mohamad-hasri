import React, { useCallback, useRef, useState } from 'react'
import { ActivityIndicator, FlatList, View, Text } from 'react-native'
import { Button } from '@rneui/themed'

import { useTheme } from '@/hooks'
import { useGetBusinessesSearchQuery } from '@/apis/businesses'
import { Business } from '@/apis/businesses/_types'

import BusinessItem from '../_components/businessItem'
import BusinessListPagination from '../_components/businessListPagination'
import BusinessSearchNFilterPanel from '../_components/businessSearchNFilterPanel'

function BusinessList() {
  // theming/styling
  const { Layout, Gutters, Fonts } = useTheme()

  // flatlist ref
  const flatlistRef = useRef<FlatList<Business> | null>()

  /**
   * LOCAL STATES
   */
  const [limit] = useState<number>(5) // return 5 data by default
  const [offset, setOffset] = useState<number>(0) // 0 is page 1
  const [term, setTerm] = useState<string | undefined>()
  const [selectedAttributes, setSelectedAttributes] = useState<string[]>([])

  /**
   * API: get business search
   * */
  const { isLoading, isFetching, data, error, refetch } = useGetBusinessesSearchQuery({ location: 'NYC', limit, offset, term, attributes: selectedAttributes || [] })
  const { status: errStatus, data: errData } = (error || {}) as any

  /**
   * RENDER ITEMS
   */
  const renderItem = useCallback(({ item }: { item: Business }) => {
    return <BusinessItem item={item} />
  }, [])


  /**
   * VIEWS
   */
  return (
    <View style={[Layout.fullHeight]}>
      {/* Search and Filter Panel */}
      <BusinessSearchNFilterPanel
        term={term}
        setTerm={setTerm}
        selectedAttributes={selectedAttributes}
        setSelectedAttributes={setSelectedAttributes}
      />

      <View style={[Layout.fill, Layout.positionRelative]}>
        {/* Display Lists */}
        <FlatList
          ref={(e) => { flatlistRef.current = e }}
          data={data?.businesses || []}
          renderItem={renderItem}
          keyExtractor={(item) => `business-${item.id}`}
          showsVerticalScrollIndicator={false}
          style={[Layout.fill]}
          contentContainerStyle={[Gutters.marginTopSmallMin]}
        />

        {/* Pagination */}
        <BusinessListPagination
          offset={offset}
          limit={limit}
          total={data?.total || 0}
          setOffset={setOffset}
        />

        {/* Display Loading */}
        {(isLoading || isFetching) && (
          <View style={[Layout.fullHeight, Layout.fullWidth, Layout.positionAbsolute, Layout.center, Layout.backgroundWhite, Layout.opacity5, { zIndex: 10 }]}>
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

export default BusinessList
