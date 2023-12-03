import React, { useCallback, useRef, useState } from 'react'
import { ActivityIndicator, FlatList, View, Text } from 'react-native'
import { AirbnbRating, Button } from '@rneui/themed'
import moment from 'moment'

import { useTheme } from '@/hooks'
import { useGetBusinessesReviewQuery } from '@/apis/businesses'
import { Business_Review } from '@/apis/businesses/_types'

import BusinessListPagination from '../_components/businessListPagination'
import { Avatar } from '@rneui/base'

interface Props {
  business_id_or_alias: number | undefined
}

function BusinessDetailReviews({ business_id_or_alias }: Props) {
  // theming/styling
  const { Layout, Gutters, Fonts } = useTheme()

  // flatlist ref
  const flatlistRef = useRef<FlatList<Business_Review> | null>()

  /**
   * LOCAL STATES
   */
  const [limit] = useState<number>(5) // return 5 data by default
  const [offset, setOffset] = useState<number>(0) // 0 is page 1\

  /**
   * API: get business search
   * */
  const { isLoading, isFetching, data, error, refetch } = useGetBusinessesReviewQuery({ business_id_or_alias, limit, offset })
  const { status: errStatus, data: errData } = (error || {}) as any

  /**
   * RENDER ITEMS
   */
  const renderItem = useCallback(({ item }: { item: Business_Review }) => {
    return (
      <View style={[Gutters.paddingBottomTiny, Gutters.marginBottomSmall, Layout.borderBottomColorBlack200, { borderBottomWidth: 1 }]}>
        {/* profile */}
        <View style={[Layout.row]}>
          <Avatar size={48} rounded source={{ uri: item.user.image_url || undefined }} />
          <View style={[Layout.justifyContentCenter, Layout.fill, Gutters.leftTiny]}>
            <Text>{item.user.name}</Text>
            <View style={[Layout.rowHCenter, Layout.justifyContentBetween, { width: '95%' }]}>
              <View style={[Layout.rowHCenter, { }]}>
                <AirbnbRating showRating={false} defaultRating={item.rating} size={15} isDisabled />
                <Text style={[Fonts.sizeRegular, Fonts.colorWarning500, Fonts.familyMedium, Gutters.leftTiny]}>{item?.rating?.toFixed(1)}</Text>
              </View>
              <Text style={[Fonts.sizeSmall, Fonts.colorBlack500]}>{moment(item.time_created).fromNow()}</Text>
            </View>
          </View>
        </View>

        {/* text */}
        <View style={[Gutters.paddingTiny]}>
          <Text>{item.text}</Text>
        </View>
      </View>
    )
  }, [])


  /**
   * VIEWS
   */
  return (
    <View style={[Layout.fill, Gutters.paddingSmall]}>
      {/* title */}
      <Text style={[Fonts.h2, Gutters.marginBottomSmall]}>
        Reviews
      </Text>

      {/* Display Lists */}
      <FlatList
        ref={(e) => { flatlistRef.current = e }}
        data={data?.reviews || []}
        renderItem={renderItem}
        keyExtractor={(item) => `businessreview-${item.id}`}
        showsVerticalScrollIndicator={false}
        style={[Layout.fill]}
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
  )
}

export default BusinessDetailReviews
