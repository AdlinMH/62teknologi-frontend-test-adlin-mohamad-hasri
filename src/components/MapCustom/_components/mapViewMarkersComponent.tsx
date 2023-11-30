import React from 'react'
import { LatLng, Marker } from 'react-native-maps'

// import { animateToCoordinates } from '@/Utils/functions/map'

// import { useTrackedMapViewStore } from '../../_store/mapViewStore'

const MapViewMarkers = ({ point }: { point: LatLng }) => {
  // const { mapRefCurrent } = useTrackedMapViewStore()
  
  // let coords_: LatLng | undefined
  // if (upcomingStopData?.lat && upcomingStopData?.lng) {
  //   coords_ = ({ latitude: upcomingStopData.lat, longitude: upcomingStopData.lng }) as LatLng
  // }
  // // animateToPoint({ latitude: activeBus?.driverInfo?.latitude, longitude: activeBus?.driverInfo?.longitude || 0 })
  // animateToCoordinates(mapRefCurrent, (coords_ ? [coords_, busCoord] : [busCoord]))

  return (
    <>
      {point && point?.latitude && point?.longitude && (
        <Marker
          key="MarkerPoint"
          coordinate={{ latitude: point?.latitude, longitude: point?.longitude }}
          title={'TITLE'}
          description={'DESC'}
        />
      )}
    </>
  )
}


export default React.memo(MapViewMarkers)
