import { createClient } from "pexels";
const client = createClient(process.env.PEXELS_API_KEY);
export async function getImages(query) {
    const res = await client.photos.search({
        query,
        per_page: 5,
    });
    if (!("photos" in res))
        return [];
    return res.photos.map((photo) => photo.src.large);
}
