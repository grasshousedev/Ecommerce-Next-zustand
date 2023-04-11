import  SanityClient  from "@sanity/client";
import ImageUrlBuilder from "@sanity/image-url"
export const client = SanityClient({
    //  projectId: process.env.SANITY_PROJECT_ID,
    // dataset: process.env.SANITY_DATASET,
    // apiVersion: process.env.SANITY_API_VERSION,
    // useCdn: process.env.SANITY_USE_CDN,
    // token: process.env.SANITY_TOKEN,

    projectId: "gyg1eyca",
    dataset: "chepe-chepe",
    apiVersion: "2022-09-07",
    useCdn: "true",
    token: "skVlsGwrN3LMZtBc8GCZgplKYLyMFqmw1U1lv0uQ3ArwuhKOgKhWpOynthYVjOBfW8uifgVWg31TnINN4XFZZnq8RTy2fNIlBisqLkGlSXUz9TZKrKp23gibV7HmFey8T2LHRe1jAeZRY8zwNqVcw7c5GQ1nWz5mIhXc1dDupX1Y5r0jZH36",
   
})

const builder = ImageUrlBuilder(client)

export const urlFor = (source) => builder.image(source)