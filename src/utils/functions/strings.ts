import Config from 'react-native-build-config'

type Schema = typeof Config.APP_SCHEMA

export function firstLetterToUpperCase(str?: string): string | null | undefined {
  return (str) ? str.charAt(0).toUpperCase() + str.slice(1) : str
}

export function firstLetterToLowerCase(str?: string): string | null | undefined {
  return (str) ? str.charAt(0).toLowerCase() + str.slice(1) : str
}

export function titleCase(str?: string): string {
  if (!str) return ''
  const splitStr = str.split(/[ ]/)
  for (let i = 0; i < splitStr.length; i += 1) {
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1)
  }
  return splitStr.join(' ')
}

export const allowOnlyNumber = (value: string) => value.replace(/[^0-9]/g, '')

export const envSchemaDisplay = (schema: Schema) => {
  switch (firstLetterToLowerCase(schema)) {
    case 'internalDebug':
    case 'internalRelease':
      return 'Dev'
    default:
      return ''
  }
}
