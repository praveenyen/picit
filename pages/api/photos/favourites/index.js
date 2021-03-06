import { getUser, getUserFavourites } from '../../../../util/api/user'
import { connectToDatabase } from '../../../../util/mongodb'

export default async (req, res) => {
    const { client, db } = await connectToDatabase()
    // const sessionToken = req.cookies['next-auth.session-token'];
    const sessionToken = req.cookies['__Secure-next-auth.session-token'];
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
                const favourites = await db.collection('favourites').insertOne({
                    userId: findUser.user.userId,
                    ...req.body
                })
                res.status(200).json({
                    data: favourites,
                    message: findUser
                })
            } else {
                res.status(400).json({
                    data: 'Unable to add into the likes.',
                    message: findUser
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