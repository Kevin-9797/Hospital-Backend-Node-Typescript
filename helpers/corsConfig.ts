const whitelistDomains = [`http://localhost:3030`,`http://localhost:8080`, 'https://heroku.com//puzzle'];

export const corsConfig = {
  origin: (origin: string | undefined, callback: any) => {
    if (whitelistDomains.indexOf(origin as string) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by cors'));
    }
  },
};