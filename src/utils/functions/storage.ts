import { Storage } from 'redux-persist'
import { StateStorage } from 'zustand/middleware'
import { MMKV } from 'react-native-mmkv'

export const storage = new MMKV({
  id: 'rushtrail-cctv-rn',
  encryptionKey: 'rushtrail-cctv-rn',
})

export const reduxStorage: Storage = {
  setItem: (key, value) => {
    storage.set(key, value)
    return Promise.resolve(true)
  },
  getItem: (key) => {
    const value = storage.getString(key)
    return Promise.resolve(value)
  },
  removeItem: (key) => {
    storage.delete(key)
    return Promise.resolve()
  },
}

export const zustandStorage: StateStorage = {
  setItem: (name, value) => storage.set(name, value),
  getItem: (name) => {
    const value = storage.getString(name)
    return value ?? null
  },
  removeItem: (name) => storage.delete(name),
}
