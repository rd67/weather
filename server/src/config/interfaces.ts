export enum IEnvironment {
  production = "production",
  development = "development",
  test = "test",
}

interface IServerConfig {
  isProduction: boolean;
  environment: IEnvironment;
  name: string;
  port: number;
  secretKey: string;
  url: string;
}

export interface IMySQLConfig {
  rootPassword: string;
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
}

export interface IRedisConfig {
  url: string;
  commandarUser: string;
  commandarPassword: string;
}

export interface IOtherConfig {
  swagger: boolean;
}

export interface IConfig {
  server: IServerConfig;

  mySQL: IMySQLConfig;
  redis: IRedisConfig;

  other: IOtherConfig;
}
