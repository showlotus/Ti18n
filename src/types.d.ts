interface Configuration {
  enable: boolean;
  configDirName: string;
  include: string[];
  exclude: string[];
  shortcutLanguages: string[];
  shortcutLanguageMaxLength: number;
}

type ConfigurationKeys = keyof Configuration;
