import React, { useCallback, useMemo } from 'react'
import { View } from 'react-native'

import { useTheme } from '@/hooks'

import { Button } from '@rneui/themed'

interface Props { 
  offset: number
  limit: number
  total: number
  setOffset: React.Dispatch<React.SetStateAction<number>>
}

function BusinessListPagination({ offset, limit, total, setOffset }: Props) {
  // theming/styling
  const { Layout, Gutters, Fonts } = useTheme()

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
    if (nextOffset >= (total || 0)) {
      return false
    }
    return true
  }, [offset, limit, total])


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
   * VIEWS
   */
  return (
    <View style={[Layout.fullWidth, Layout.row, Layout.justifyContentBetween, Gutters.paddingHorizontalSmall, Gutters.paddingVerticalSmall, Layout.borderTopColorBlack200, { borderTopWidth: 1 }]}>
      <Button
        type="solid"
        title="Prev"
        icon={{
          name: 'chevron-left',
          type: 'feather',
          size: 25,
          color: 'black',
        }}
        size="sm"
        onPress={() => {
          setToPrevPage()
        }}
        titleStyle={[Fonts.colorBlack500, Fonts.sizeSmall]}
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
        size="sm"
        iconPosition="right"
        onPress={() => {
          setToNextPage()
        }}
        titleStyle={[Fonts.colorBlack500, Fonts.sizeSmall]}
        buttonStyle={[Layout.backgroundBlack100, Gutters.radiusHuge]}
        disabledStyle={[Layout.opacity5]}
        disabled={!isNextAny}
      />
    </View>
  )
}

export default BusinessListPagination
