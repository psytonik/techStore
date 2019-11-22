import * as contentfull from 'contentful';

export const client = contentfull.createClient({
    space: process.env.REACT_APP_SPACE_ID,
    accessToken: process.env.REACT_APP_ACCESS_TOKEN
});
