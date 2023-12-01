import React from 'react'
import { Pressable, Text } from 'react-native'
import { responsiveWidth } from 'react-native-responsive-dimensions'
import { Card } from '@rneui/themed'

import { useTheme } from '@/hooks'

const BusinessPrevNextButton = ({ title, onPress }: { title: string, onPress(): void }) =>{
  const { Gutters } = useTheme()

  return (
    <Pressable onPress={onPress}>
      <Card containerStyle={[Gutters.radiusTiny, Gutters.marginHorizontalTiny, { width: responsiveWidth(80) }]}>
        <Card.Title>
          {title}
        </Card.Title>
        <Text>{'>'}</Text>
      </Card>
    </Pressable>
)};

export default BusinessPrevNextButton
