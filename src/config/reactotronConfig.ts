import { NativeModules, Platform } from 'react-native'
import ReactotronClient from 'reactotron-react-native'
import DeviceInfo from 'react-native-device-info'
import { customAlphabet } from 'nanoid/non-secure'

const nanoid = customAlphabet('ABCDXYZ1234', 4)

console.tron = (message?: any, ...optionalParams: any[]) => { // eslint-disable-line
  console.log(message, optionalParams) // eslint-disable-line
}

let scriptHostname: string | undefined = ''
if (__DEV__) {
  const { scriptURL } = NativeModules.SourceCode || {}
  scriptHostname = scriptURL?.split?.('://')?.[1]?.split?.(':')?.[0]
  // console.log('>> scriptHostname > ', scriptHostname) // eslint-disable-line
}

const init = async () => {
  const name = `-${DeviceInfo?.getDeviceId?.() || nanoid()}`
  const reactotron = ReactotronClient
    ?.configure({
      name,
      host: scriptHostname || Platform.OS,
    })
    ?.useReactNative({
      asyncStorage: false,
      networking: {
        ignoreUrls: /symbolicate|127.0.0.1/,
      },
      editor: false,
      errors: { veto: (_stackFrame: any) => false },
      overlay: false,
    })

  if (reactotron) {
    reactotron.connect?.() // add all built-in react native plugins
    reactotron.clear?.() // plus some custom made plugin.
  }

    console.tron = (message?: any, ...optionalParams: any[]) => { // eslint-disable-line
    reactotron?.log?.([message, ...optionalParams])
      console.log([message, ...optionalParams]) // eslint-disable-line
  }

    console.log('[Reactotron]', 'Configured') // eslint-disable-line

  return reactotron
}

export default init

declare global {
  interface Console {
    tron: (message?: any, ...optionalParams: any[]) => void
  }
}
