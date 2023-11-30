import React, { useEffect } from 'react'
import {
  View, Text, TouchableOpacity,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import i18next from 'i18next'

import { useTheme } from '@/hooks'
import { ThemeState, changeTheme } from '@/store/theme'
import { useLazyGetBusinessesSearchQuery } from '@/apis/businesses'
import { Brand } from '@/components'

function Dashboard() {
  const { t } = useTranslation(['example', 'welcome'])

  const {
    Common, Fonts, Gutters, Layout, darkMode: isDark,
  } = useTheme()

  const dispatch = useDispatch()

  const [getBusinessesSearch, { data }] = useLazyGetBusinessesSearchQuery()

  const onChangeTheme = ({ theme, darkMode }: Partial<ThemeState>) => {
    dispatch(changeTheme({ theme, darkMode }))
  }

  const onChangeLanguage = (lang: 'fr' | 'en') => {
    i18next.changeLanguage(lang)
  }

  const onGetSearch = () => {
    console.log('clicked')
    getBusinessesSearch({ location: 'NYC' })
    .unwrap()
    .then((res) => {
      console.tron('re', res)
    })
    .catch((err) => {
      console.tron('er', err)
    })
  }

  useEffect(() => {
    console.tron('data', data)
  }, [data])

  return (
    <SafeAreaView style={[Layout.fullHeight, Layout.fullWidth]}>
      {/* Brand Logo */}
      <View style={[Layout.fullHeight, Layout.fullWidth, Layout.positionAbsolute, Layout.justifyContentCenter, Layout.itemsCenter, { zIndex: -2 }]}>
        {/* <View style={[Layout.positionAbsolute, Layout.center, {
            height: 250,
            width: 250,
            backgroundColor: isDark ? '#000000' : '#DFDFDF',
            borderRadius: 140,
          },
        ]}
        /> */}
        <View style={[Layout.positionAbsolute, Layout.center, {
            transform: [{ translateY: 40 }],
          },
        ]}
        >
          <Brand />
        </View>
      </View>

      {/* Paragraph Contents */}
      <View style={[Layout.fill, Layout.justifyContentBetween, Layout.itemsStart, Layout.fullWidth, Gutters.paddingHorizontalRegular]}>
        <View>
          <Text style={[Fonts.h2]}>
            {t('welcome:title')}
          </Text>
          <Text style={[Fonts.textBold, Fonts.sizeRegular, Gutters.marginBottomRegular]}>
            {t('welcome:subtitle')}
            ${data ? JSON.stringify(data) : '-'}
          </Text>
        </View>

        <View style={[Layout.row, Layout.justifyContentBetween, Layout.fullWidth, Gutters.marginTopSmall]}>
          <TouchableOpacity
            style={[Common.button.circle, Gutters.marginBottomRegular]}
            onPress={() => onChangeTheme({ darkMode: !isDark })}
          >
            <Text style={[Common.button.title]}>
              Theme
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[Common.button.circle, Gutters.marginBottomRegular, { zIndex: 999 }]}
            onPress={onGetSearch}
          >
            <Text style={[Common.button.title]}>
              GET
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[Common.button.circle, Gutters.marginBottomRegular]}
            onPress={() => onChangeLanguage(i18next.language === 'fr' ? 'en' : 'fr')}
          >
            <Text style={[Common.button.title]}>
              Language
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Dashboard
