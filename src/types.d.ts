interface Configuration {
  enable: boolean;
  configDirName: string;
  include: string[];
  exclude: string[];
}

type ConfigurationKeys = keyof Configuration;
