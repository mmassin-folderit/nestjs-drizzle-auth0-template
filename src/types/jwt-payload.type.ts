export type JwtPayload = {
   /**
    * The issuer of the token, typically a URL.
    */
   iss: string;

   /**
    * The subject of the token, usually a unique identifier for the user or client.
    */
   sub: string;

   /**
    * The audience for the token, typically a URL or an identifier for the intended recipient.
    */
   aud: string;

   /**
    * The time at which the token was issued, in seconds since the Unix epoch.
    */
   iat: number;

   /**
    * The time at which the token expires, in seconds since the Unix epoch.
    */
   exp: number;

   /**
    * The grant type used to obtain the token.
    */
   gty: string;

   /**
    * The authorized party, usually the client ID of the application.
    */
   azp: string;
};
