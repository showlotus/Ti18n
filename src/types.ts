export interface Configuration {
  configDirs: string[]
  customLanguages: string[]
  enable: boolean
  extnames: string[]
  exclude: string[]
  shortcutLanguages: string[]
  shortcutLanguageMaxLength: number
}

export type ConfigurationKeys = keyof Configuration
