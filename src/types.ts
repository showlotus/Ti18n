export interface Configuration {
  configDirs: string[]
  configTypes: string[]
  customLanguages: string[]
  enable: boolean
  extFiles: string[]
  exclude: string[]
  shortcutLanguages: string[]
  shortcutLanguageMaxLength: number
}

export type ConfigurationKeys = keyof Configuration

export interface TokenParams {
  language: string
  filePath: string
  fileType: ConfigFileType
}

export type TokenValue = Omit<TokenParams, 'language'>

export type CommandTokenParams = TokenParams & { token: string }

export enum ConfigFileType {
  /**
   * 在同一个文件且同一个属性下
   */
  SINGLE_FILE_IN_SINGLE_PROP = 0,
  /**
   * 在同一个文件且多个属性下
   */
  SINGLE_FILE_IN_MULTI_PROP = 1,
  /**
   * 在多个文件中
   */
  MULTI_FILE = 2,
}
