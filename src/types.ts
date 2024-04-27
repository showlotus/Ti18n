export interface Configuration {
  configDirs: string[]
  // configTypes: string[]
  customLanguages: string[]
  enable: boolean
  extnames: string[]
  exclude: string[]
  shortcutLanguages: string[]
  shortcutLanguageMaxLength: number
}

export type ConfigurationKeys = keyof Configuration

export type ConfigExtensionType = 'json' | 'js' | 'ts'
