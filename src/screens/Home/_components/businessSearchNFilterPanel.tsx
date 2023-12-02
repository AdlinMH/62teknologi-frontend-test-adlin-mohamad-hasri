import React from 'react'
import { View } from 'react-native'
import FeatherIcons from 'react-native-vector-icons/Feather'
import { useDebouncedCallback } from 'use-debounce'
import { Card, Input } from '@rneui/themed'

import { useTheme } from '@/hooks'

interface Props {
  term: string | undefined
  setTerm: React.Dispatch<React.SetStateAction<string | undefined>>
}

const BusinessSearchNFilterPanel = ({ term, setTerm }: Props) =>{
  const { Layout, Gutters } = useTheme()

  const debouncedSetTerm = useDebouncedCallback((value) => { setTerm(value) }, 800)

  return (
    <View style={[Layout.borderBottomColorBlack200, { borderBottomWidth: 1 }]}>
      <Card containerStyle={[Gutters.radiusTiny, Gutters.marginHorizontalTiny, Gutters.paddingTopNone, Gutters.paddingBottomNone, Gutters.marginBottomTiny, Layout.borderBottomColorBlack200, { borderBottomWidth: 2 }]}>
        <Input
          defaultValue={term}
          placeholder='Search'
          leftIcon={<FeatherIcons name="search" size={20} />}
          underlineColorAndroid="transparent"
          errorStyle={[Layout.hidden]}
          inputContainerStyle={[Layout.borderColorTransparent]}
          onChangeText={(value) => {
            debouncedSetTerm(value)
          }}
        />
      </Card>
    </View>
)};

export default BusinessSearchNFilterPanel
