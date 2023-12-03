import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import AntIcon from 'react-native-vector-icons/AntDesign'
import Toast, {
  BaseToast, BaseToastProps, ToastConfig,
} from 'react-native-toast-message'

import {
  Colors, FontFamily, FontSize, MetricsSizes,
} from '@/theme/variables'

const styles = StyleSheet.create({
  baseContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 70,
    alignItems: 'center',
    backgroundColor: Colors.primary600,
    marginBottom: -10,
    padding: 10,
    paddingHorizontal: 20,
  },
  baseFont: {
    color: Colors.white,
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.regular,
    marginLeft: MetricsSizes.small,
  },
})

const toastConfig: ToastConfig = {
  success: (props: BaseToastProps) => (
    <View style={[styles.baseContainer, { backgroundColor: Colors.success600 }]}>
      <AntIcon name="exclamationcircle" color={Colors.white} size={FontSize.large} />
      <Text style={[styles.baseFont]}>{props.text1}</Text>
    </View>
  ),
  error: (props: BaseToastProps) => (
    <View style={[styles.baseContainer, { backgroundColor: Colors.error600 }]}>
      <AntIcon name="exclamationcircle" color={Colors.white} size={FontSize.large} />
      <Text style={[styles.baseFont]}>{props.text1}</Text>
    </View>
  ),
  errorBig: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{ backgroundColor: Colors.error100, borderLeftWidth: 0 }}
      text1Style={{
        fontSize: FontSize.small, fontFamily: FontFamily.regular, fontWeight: '400', color: Colors.error600,
      }}
      renderLeadingIcon={() => (
        <View style={{ justifyContent: 'center', marginLeft: MetricsSizes.regular }}>
          <AntIcon name="closecircle" color={Colors.error600} size={FontSize.large} />
        </View>
      )}
      contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
    />
  ),
  info: (props: BaseToastProps) => (
    <View style={[styles.baseContainer, { backgroundColor: Colors.information600 }]}>
      <AntIcon name="exclamationcircle" color={Colors.white} size={FontSize.large} />
      <Text style={[styles.baseFont]}>{props.text1}</Text>
    </View>
  ),
}

function ToastCustom() {
  return (
    <Toast config={toastConfig} position="bottom" bottomOffset={0} />
  )
}

export default ToastCustom
