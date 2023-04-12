import  SanityClient  from "@sanity/client";
import ImageUrlBuilder from "@sanity/image-url"
export const client = SanityClient({
     projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    apiVersion: process.env.SANITY_API_VERSION,
    useCdn: process.env.SANITY_USE_CDN,
    token: process.env.SANITY_TOKEN,
})

const builder = ImageUrlBuilder(client)

export const urlFor = (source) => builder.image(source)