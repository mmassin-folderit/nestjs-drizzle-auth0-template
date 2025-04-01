export interface Config {
   port: number;
   auth0: AuthConfig;
   database: DatabaseConfig;
}

export type DatabaseConfig = {
   host: string;
   port: number;
   user: string;
   password: string;
   database: string;
};

export type AuthConfig = {
   issuerUrl: string;
   audience: string;
};
