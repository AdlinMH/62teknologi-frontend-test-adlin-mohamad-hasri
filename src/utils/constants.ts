import { Colors } from '@/theme/variables'
import { StatusBar } from 'react-native'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'

export const historyStatus = {
  finished: {
    displayText: 'Selesai',
    color: Colors.success600,
  },
}

export const initialRegion = {
  latitude: -6.2874025,
  longitude: 106.8244454,
  latitudeDelta: 0.50,
  longitudeDelta: 0.40,
}

export const defaultMapPadding = {
  top: (StatusBar.currentHeight || 0) + responsiveHeight(1),
  bottom: responsiveHeight(27),
  left: responsiveWidth(3),
  right: responsiveWidth(3),
}

export const defaultPoint = {
  latitude: -6.2874025,
  longitude: 106.8272,
}
