import { GestureResponderEvent } from 'react-native'
import MapView, { Details, Region } from 'react-native-maps'
import { createTrackedSelector } from 'react-tracked'
import { create } from 'zustand'

interface MapViewState {
  mapRefCurrent: MapView | null,
  mapOnRegionChangeComplete?: ((region: Region, details: Details) => void) | undefined
  mapOnTouchStart: ((event: GestureResponderEvent) => void) | undefined
  mapOnPanDrag: ((event: any) => void) | undefined

  mapChildren: JSX.Element | undefined
}

export const useMapViewStore = create<MapViewState>(() => ({
  mapRefCurrent: null,
  mapOnRegionChangeComplete: undefined,
  mapOnTouchStart: undefined,
  mapOnPanDrag: undefined,
  mapChildren: undefined,
}))

export const useTrackedMapViewStore = createTrackedSelector(useMapViewStore)
