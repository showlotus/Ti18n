interface Configuration {
  dirName: string;
  includes: string[];
  exclude: string[];
}

type ConfigurationKeys = keyof Configuration;
