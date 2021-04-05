import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
    const { db } = await connectToDatabase();
    // await db.collection('movies').insert({
    //     name: 'The Iron man: End Game',
    //     genre: 'Action',
    //     hero: 'Stark Tony'
    // })

    const movies = await db
        .collection("movies")
        .find({})
        .sort({ metacritic: -1 })
        .limit(20)
        .toArray();

    res.json(movies);
};