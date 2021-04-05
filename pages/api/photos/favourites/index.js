import { getUser, getUserFavourites } from '../../../../util/api/user'
import { connectToDatabase } from '../../../../util/mongodb'

export default async (req, res) => {
    const { client, db } = await connectToDatabase()
    const sessionToken = req.cookies['next-auth.session-token'];
    const findUser = await getUser(sessionToken)

    switch (req.method) {
        case 'GET':
            const userFav = await getUserFavourites(findUser.user.userId);
            res.status(201).json({
                data: userFav
            })
            break;
        case 'POST':
            if (findUser.userFound) {
                const favourites = await db.collection('favourites').insert({
                    userId: findUser.user.userId,
                    ...req.body
                })
                res.status(200).json({
                    data: favourites
                })
            }
            break;

        default:
            res.status(201).json({
                data: 'no data'
            })
            break;
    }
}