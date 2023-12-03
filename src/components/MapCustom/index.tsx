import React, { useEffect, useRef } from 'react'
import { View } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'

import { useTheme } from '@/hooks'
import { defaultMapPadding, initialRegion } from '@/utils/constants'

import { useMapViewStore, useTrackedMapViewStore } from './_store/mapViewStore'

function MapComponent() {
  const { Layout } = useTheme()

  const mapRef = useRef<MapView>(null)

  const { mapOnRegionChangeComplete, mapOnTouchStart, mapOnPanDrag, mapChildren } = useTrackedMapViewStore()

  useEffect(() => {
    useMapViewStore.setState({ mapRefCurrent: mapRef.current })
  }, [mapRef.current])

  useEffect(() => () => {
    useMapViewStore.setState({ mapRefCurrent: undefined })
  }, [])

  return (
    <View style={[Layout.fill]}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        initialRegion={initialRegion}
        showsMyLocationButton={false}
        zoomEnabled
        showsScale
        showsCompass
        minZoomLevel={10}
        maxZoomLevel={20}
        mapPadding={defaultMapPadding}
        // onMapReady={gotoCurrent}
        onRegionChangeComplete={mapOnRegionChangeComplete}
        onTouchStart={mapOnTouchStart}
        onPanDrag={(e) => {
          mapOnPanDrag?.(e)
        }}
        style={[Layout.fill]}
      >
        {mapChildren}
      </MapView>

      {/* Imaginary mapPadding - to help imagine the area of map */}
      {/* <View style={{
        position: 'absolute',
        backgroundColor: 'red',
        opacity: 0.5,
        zIndex: 999,
        top: defaultMapPadding.top,
        right: defaultMapPadding.right,
        bottom: defaultMapPadding.bottom,
        left: defaultMapPadding.left,
      }}
      /> */}
    </View>
  )
}

export default React.memo(MapComponent)
