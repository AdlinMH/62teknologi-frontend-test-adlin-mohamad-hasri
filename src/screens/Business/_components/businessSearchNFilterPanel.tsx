import React, { useMemo, useRef, useState } from 'react'
import { Animated, FlatList, Text, View } from 'react-native'
import Collapsible from 'react-native-collapsible'
import FeatherIcons from 'react-native-vector-icons/Feather'
import { useDebouncedCallback } from 'use-debounce'
import { Button, Card, Input } from '@rneui/themed'

import { useTheme } from '@/hooks'
import ToggleButton from '@/theme/components/ToggleButton'
import { titleCase } from '@/utils/functions/strings'
import { Colors } from '@/theme/variables/Colors'

interface Props {
  term: string | undefined
  setTerm: React.Dispatch<React.SetStateAction<string | undefined>>
  selectedAttributes: string[]
  setSelectedAttributes: React.Dispatch<React.SetStateAction<string[]>>
}

const attributes = [
  'hot_and_new',
  'request_a_quote',
  'reservation',
  'waitlist_reservation',
  'deals',
  'gender_neutral_restrooms',
  'open_to_all',
  'wheelchair_accessible',
  'outdoor_seating',
  'parking_garage',
  'parking_lot',
  'parking_street',
  'parking_valet',
  'parking_validated',
  'parking_bike',
  'restaurants_delivery',
  'restaurants_takeout',
  'wifi_free',
  'wifi_paid',
]

const BusinessSearchNFilterPanel = ({ term, setTerm, selectedAttributes, setSelectedAttributes }: Props) =>{
  const { Layout, Gutters, Fonts } = useTheme()

  const [showFilter, setShowFilter] = useState<boolean>(false)

  const debouncedSetTerm = useDebouncedCallback((value) => { setTerm(value) }, 800)

  const filterIsAny = useMemo(() => (selectedAttributes?.length || 0) > 0, [selectedAttributes])

  const offset = useRef(new Animated.Value(0)).current

  const sectionTitleHeight = offset.interpolate({
    inputRange: [0, 50, 150],
    outputRange: [0, -20, -50],
    extrapolate: 'clamp',
  })

  return (
    <View style={[Layout.borderBottomColorBlack200, { borderBottomWidth: 1 }]}>
      <Card containerStyle={[Gutters.radiusTiny, Gutters.marginHorizontalTiny, Gutters.paddingTopNone, Gutters.paddingBottomNone, Gutters.marginBottomTiny, Layout.borderBottomColorBlack200, { borderBottomWidth: 2 }]}>
        <Input
          defaultValue={term}
          placeholder='Search'
          leftIcon={<FeatherIcons name="search" size={20} />}
          rightIcon={(
            <Button type={showFilter ? (filterIsAny ? 'solid' : 'outline') : 'clear'} onPress={() => {
              if ((selectedAttributes?.length || 0) === 0) setShowFilter((prev) => !prev)
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
        {attributes && (
          <View style={[Layout.fullWidth]}>
            <Animated.View style={[{ marginTop: sectionTitleHeight }, Layout.rowHCenter, Layout.justifyContentBetween, Layout.fullWidth, Gutters.paddingBottomSmall, Gutters.paddingTopSmall, Gutters.paddingHorizontalRegular]}>
              <Text style={[Fonts.sizeMedium, Fonts.familyBold, Fonts.weight600, Fonts.colorBlack500]}>
                Filter
              </Text>
              {!!selectedAttributes.length && (
                <Text style={[Fonts.sizeRegular, Fonts.familyRegular, Fonts.colorBlack500]}>
                  {`${selectedAttributes.length}/${attributes.length} selected`}
                </Text>
              )}
            </Animated.View>
            <FlatList
              data={attributes.map((s) => titleCase(s.replace(/\_/gm, ' ')))}
              horizontal
              renderItem={(({ item }) => (
                <ToggleButton
                  title={item}
                  onChange={(isToggled) => {
                    setSelectedAttributes((prev) => {
                      if (isToggled) return [...prev, item]
                      return prev.filter((f) => f !== item)
                    })
                  }}
                />
              ))}
              keyExtractor={(__, index) => `mitracucifeatureitem-${index}`}
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
