import { getUser, getUserFavourites } from '../../../../util/api/user'
import { connectToDatabase } from '../../../../util/mongodb'

export default async (req, res) => {
    const { client, db } = await connectToDatabase()
    // const sessionToken = req.cookies['next-auth.session-token'];
    const sessionToken = req.cookies['__Secure-next-auth.session-token'];
    const findUser = await getUser(sessionToken)

    switch (req.method) {
        case 'DELETE':
            const { photo_id } = req.query;
            if (findUser.userFound) {
                const deleted = await db.collection("favourites").deleteMany({
                    id: Number(photo_id),
                    userId: findUser.user.userId
                })
                res.status(200).json({
                    data: 'Deleted successfully!'
                })
            } else {
                res.status(400).json({
                    data: 'Unable to delete it.'
                })
            }
            break;

        default:
            res.status(500).json({
                data: 'no data'
            })
            break;
    }
}