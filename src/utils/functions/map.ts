import { PixelRatio, Platform } from 'react-native'
import MapView, { LatLng } from 'react-native-maps'

import { defaultMapPadding } from '../constants'

const animateToPoint = (mapRefCurrent: MapView | null, coord?: LatLng | null, autoZoom = true) => {
  if (!coord || !coord?.latitude || !coord?.longitude) return // () => undefined
  if (!mapRefCurrent) return

  // animate to region
  // const timeout = setTimeout(() => {
  mapRefCurrent?.animateCamera?.(
    {
      center: coord,
      pitch: 2,
      // heading: 20,
      // altitude: 200,
      ...autoZoom ? { zoom: 16 } : {},
    },
    { duration: 200 },
  )
  // }, 666)
}

export const animateToCoordinates = (mapRefCurrent: MapView | null, coords?: LatLng[]) => {
  try {
    if (!mapRefCurrent) return
    if (coords?.length && coords.every((c) => !!c.latitude && !!c.longitude)) {
      if (coords?.length === 1) {
        animateToPoint(mapRefCurrent, coords[0])
        return
      }
      requestAnimationFrame(() => (
        mapRefCurrent?.fitToCoordinates?.(coords, {
          // edgePadding: defaultMapPadding,
          edgePadding: Platform.OS === 'ios' ? defaultMapPadding : {
            top: PixelRatio.get() * 15, // 50 is the baseMapPadding https://github.com/react-native-community/react-native-maps/blob/master/lib/android/src/main/java/com/airbnb/android/react/maps/AirMapView.java#L85
            right: 0,
            left: 0,
            bottom: PixelRatio.get() * 40,
          },
          animated: true,
        })
      ))
    }
  } catch (error) {
    console.log('error animateToCoordinates', error)
  }
}
