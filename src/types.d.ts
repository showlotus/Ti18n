interface Configuration {
  enable: boolean;
  configDirName: string;
  includes: string[];
  exclude: string[];
}

type ConfigurationKeys = keyof Configuration;
