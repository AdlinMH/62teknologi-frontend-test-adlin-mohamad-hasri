import React, { useCallback, useMemo, useRef } from 'react'
import { FlatList } from 'react-native'

import { useTheme } from '@/hooks'
import { BottomSheetCustom } from '@/components'
import { BusinessesGetSearchRes, BusinessesGetSearchRes_Business } from '@/apis/businesses/_types'

import BusinessItem from './businessItem'
import BusinessPrevNextButton from './businessPrevNextButton'

interface Props {
  data: BusinessesGetSearchRes | undefined
  limit: number
  offset: number
  setOffset: React.Dispatch<React.SetStateAction<number>>
}

function BusinessList({ data, limit, offset, setOffset }: Props) {
  const { Layout } = useTheme()

  const flatlistRef = useRef<FlatList<BusinessesGetSearchRes_Business> | null>()

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
