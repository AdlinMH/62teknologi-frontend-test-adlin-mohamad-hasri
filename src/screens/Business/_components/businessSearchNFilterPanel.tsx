import React, { useMemo, useRef, useState } from 'react'
import { Animated, FlatList, Text, View } from 'react-native'
import Collapsible from 'react-native-collapsible'
import FeatherIcons from 'react-native-vector-icons/Feather'
import { useDebouncedCallback } from 'use-debounce'
import { Button, Card, Input } from '@rneui/themed'

import { useTheme } from '@/hooks'
import { Colors } from '@/theme/variables/Colors'
import ToggleButton from '@/theme/components/ToggleButton'
// import { useGetCategoriesQuery } from '@/apis/categories'

interface Props {
  term: string | undefined
  setTerm: React.Dispatch<React.SetStateAction<string | undefined>>
  selectedCategories: string[]
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>
}

const categories = [
  { alias: 'korean', title: 'Korean' },
  { alias: 'tapasmallplates', title: 'Tapas/Small Plates' },
  { alias: 'bbq', title: 'Barbeque' },
  { alias: 'newamerican', title: 'New American' },
  { alias: 'pizza', title: 'Pizza' },
  { alias: 'seafood', title: 'Seafood' },
  { alias: 'thai', title: 'Thai' },
  { alias: 'french', title: 'French' },
  { alias: 'cocktailbars', title: 'Cocktail Bars' },
  { alias: 'noodles', title: 'Noodles' },
  { alias: 'asianfusion', title: 'Asian Fusion' },
  { alias: 'steak', title: 'Steakhouses' },
  { alias: 'ramen', title: 'Ramen' },
  { alias: 'chicken_wings', title: 'Chicken Wings' },
]

const BusinessSearchNFilterPanel = ({ term, setTerm, selectedCategories, setSelectedCategories }: Props) =>{
  const { Layout, Gutters, Fonts } = useTheme()

  const [showFilter, setShowFilter] = useState<boolean>(false)

  const debouncedSetTerm = useDebouncedCallback((value) => { setTerm(value) }, 800)

  const filterIsAny = useMemo(() => (selectedCategories?.length || 0) > 0, [selectedCategories])

  const offset = useRef(new Animated.Value(0)).current

  const sectionTitleHeight = offset.interpolate({
    inputRange: [0, 50, 150],
    outputRange: [0, -20, -50],
    extrapolate: 'clamp',
  })

  /**
   * API: get categories
   * */
  // const { isLoading, isFetching, data, error, refetch } = useGetCategoriesQuery({})
  // const { categories } = data || []
  // const { status: errStatus, data: errData } = (error || {}) as any

  return (
    <View style={[Layout.borderBottomColorBlack200, { borderBottomWidth: 1 }]}>
      <Card containerStyle={[Gutters.radiusTiny, Gutters.marginHorizontalTiny, Gutters.paddingTopNone, Gutters.paddingBottomNone, Gutters.marginBottomTiny, Layout.borderBottomColorBlack200, { borderBottomWidth: 2 }]}>
        <Input
          defaultValue={term}
          placeholder='Search'
          leftIcon={<FeatherIcons name="search" size={20} />}
          rightIcon={(
            <Button type={showFilter ? (filterIsAny ? 'solid' : 'outline') : 'clear'} onPress={() => {
              if ((selectedCategories?.length || 0) === 0) setShowFilter((prev) => !prev)
            }}>
              <FeatherIcons name="filter" size={20} color={showFilter ? (filterIsAny ? 'white' : Colors.information600) : 'black'} />
            </Button>
          )}
          underlineColorAndroid="transparent"
          errorStyle={[Layout.hidden]}
          style={[Layout.fullWidth, { backgroundColor: 'transparent'} ]}
          inputStyle={[{ backgroundColor: 'transparent' }]}
          containerStyle={[{ backgroundColor: 'transparent' }]}
          inputContainerStyle={[Layout.borderColorTransparent]}
          rightIconContainerStyle={[Gutters.marginRightRegularMin]}
          onChangeText={(value) => { debouncedSetTerm(value) }}
        />
      </Card>

      <Collapsible collapsed={!showFilter}>
        {categories && (
          <View style={[Layout.fullWidth]}>
            <Animated.View style={[{ marginTop: sectionTitleHeight }, Layout.rowHCenter, Layout.justifyContentBetween, Layout.fullWidth, Gutters.paddingBottomSmall, Gutters.paddingTopSmall, Gutters.paddingHorizontalRegular]}>
              <Text style={[Fonts.sizeMedium, Fonts.familyBold, Fonts.weight600, Fonts.colorBlack500]}>
                Filter
              </Text>
              {!!selectedCategories.length && (
                <Text style={[Fonts.sizeRegular, Fonts.familyRegular, Fonts.colorBlack500]}>
                  {`${selectedCategories.length}/${categories.length} selected`}
                </Text>
              )}
            </Animated.View>
            <FlatList
              data={categories}
              horizontal
              renderItem={(({ item }) => (
                <ToggleButton
                  title={item.title}
                  onChange={(isToggled) => {
                    setSelectedCategories((prev) => {
                      if (isToggled) return [...prev, item.alias]
                      return prev.filter((f) => f !== item.alias)
                    })
                  }}
                />
              ))}
              keyExtractor={(__, index) => `item-${index}`}
              // refreshing={isLoading || featureIsLoading}
              style={[Gutters.marginLeftRegular]}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={[Gutters.paddingRightRegular, { paddingBottom: 5 }]}
            />
          </View>
        )}
      </Collapsible>
    </View>
)};

export default BusinessSearchNFilterPanel
