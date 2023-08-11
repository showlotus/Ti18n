interface Configuration {
  dirName: string;
  includes: string[];
}

type ConfigurationKeys = keyof Configuration;
