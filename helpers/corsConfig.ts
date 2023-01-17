const whitelistDomains = [`http://localhost:4200`,`http://localhost:62625`,`http://localhost:8080`, 'https://heroku.com/hospitalApp'];

export const corsConfig = {
  origin: (origin: string | undefined, callback: any) => {
    console.log(origin)
    if ( whitelistDomains.indexOf(origin as string ) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by cors'));
    }
  },
};  