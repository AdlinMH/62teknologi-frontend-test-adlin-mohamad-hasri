import React from 'react'
import { LatLng, MapMarker, Marker } from 'react-native-maps'

const MapViewMarkers = ({ point, title, markerRef }: {
  point: LatLng,
  title: string | undefined
  markerRef: React.MutableRefObject<MapMarker | null>
}) => {
  return (
    <Marker
      ref={markerRef}
      key="MarkerPoint"
      coordinate={{ latitude: point?.latitude, longitude: point?.longitude }}
      title={title}
    >
    </Marker>
  )
}


export default React.memo(MapViewMarkers)
