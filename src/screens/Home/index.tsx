import React, { useEffect } from 'react'
import { View } from 'react-native'
import { useTheme } from '@/hooks'
import { useLazyGetBusinessesSearchQuery } from '@/apis/businesses'

const LazyMapViewComponent = React.lazy(() => import('@/components/MapCustom'))

function Home() {
  const { Layout } = useTheme()

  const [getBusinessesSearch, { data }] = useLazyGetBusinessesSearchQuery()

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
    <View style={[Layout.fill, { backgroundColor: 'red' }]}>
      <LazyMapViewComponent />
    </View>
  )
}

export default Home
