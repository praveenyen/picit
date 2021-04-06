import { connectToDatabase } from '../../util/mongodb'

export const getUser = async (sessionToken) => {
    const { db } = await connectToDatabase()
    const userSession = await db.collection('sessions').findOne({ sessionToken: sessionToken })

    if (userSession) {
        return {
            userFound: true,
            user: userSession
        }
    }
    return {
        userFound: false,
        user: { userId: false }
    }
}

export const getUserFavourites = async (userId) => {
    const { db } = await connectToDatabase();
    const favourites = await db.collection('favourites').find({ userId: userId }).toArray();

    return favourites
}

module.exports = { getUser, getUserFavourites };
