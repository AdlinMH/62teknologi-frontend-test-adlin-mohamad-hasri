import React, { useCallback, useRef } from 'react'
import { FlatList } from 'react-native'

import { useTheme } from '@/hooks'
import { BottomSheetCustom } from '@/components'
import { BusinessesGetSearchRes, BusinessesGetSearchRes_Business } from '@/apis/businesses/_types'

import BusinessItem from './businessItem'
import BusinessPrevNextButton from './businessPrevNextButton'

interface Props {
  data: BusinessesGetSearchRes | undefined
  isPrevAny: boolean
  setToPrevPage(): void
  isNextAny: boolean
  setToNextPage(): void
}

function BusinessList({ data, isPrevAny, setToPrevPage, isNextAny, setToNextPage }: Props) {
  const { Layout } = useTheme()

  const flatlistRef = useRef<FlatList<BusinessesGetSearchRes_Business> | null>()

  const renderItem = useCallback(({ item }: { item: BusinessesGetSearchRes_Business }) => {
    return <BusinessItem item={item} />
  }, [])

  return (
    <>
      {data ? (
        <BottomSheetCustom
          isVisible={true}
          withBackdrop={false}
          panelStyle={[Layout.backgroundTransparent, { zIndex: 2 }]}
        >
          <FlatList
            ref={(e) => { flatlistRef.current = e }}
            data={data.businesses}
            renderItem={renderItem}
            keyExtractor={(item) => `business-${item.id}`}
            showsHorizontalScrollIndicator={false}
            horizontal
            ListHeaderComponent={(
              isPrevAny ? (
                <BusinessPrevNextButton
                  title={'Previous'}
                  onPress={() => {
                    setToPrevPage()
                  }}
                />
              ) : null
            )}
            ListFooterComponent={(
              isNextAny ? (
                <BusinessPrevNextButton
                  title={'Next'}
                  onPress={() => {
                    setToNextPage()
                    flatlistRef.current?.scrollToOffset({ animated: true, offset: 0 }) }}
                  />
              ) : null
            )}
          />
        </BottomSheetCustom>
      ) : null}
    </>
  )
}

export default BusinessList
