import React from 'react';
import {
    useSession, signIn, signOut
} from 'next-auth/client';
import User from '../../layout/user'
import styles from './collection.module.scss'

import { connectToDatabase } from '../../util/mongodb'
import Photo from '../../components/Photo'

const index = ({ collections, isConnected }) => {
    return (
        <div>
            <div className="container">
                {collections?.map(collection => {
                    return <>
                        <h3 className="subheader font-weight-bold mt-4">{collection.name}</h3>
                        <hr />
                        <div className="row">
                            {collection.photos.map(photo => {
                                return <>
                                    <div className="col-sm-12 col-md-2 mb-4">
                                        <Photo photo={photo} />
                                    </div>
                                </>
                            })}
                        </div>
                    </>
                })}
            </div>
        </div>
    );
}

index.layout = User;

export async function getServerSideProps(context) {
    const { client, db } = await connectToDatabase()

    const isConnected = await client.isConnected()
    const sessionToken = context.req.cookies['next-auth.session-token'];
    const userSession = await db.collection('sessions').findOne({ sessionToken: sessionToken })

    if (!isConnected) {
        console.log('error')
    }

    if (!userSession) {
        return {
            props: { isConnected, collections: [] }
        }
    }

    const collections = await db.collection('collection').find({ userId: userSession.userId }).toArray();

    // const createCollections = await db.collection('collection').insertOne(
    //     {
    //         userId: userSession._id,
    //         name: 'My Favourite Collection',
    //         type: 'public',
    //         canBeListed: true,
    //         slug: 'my-favourite-collection',
    //         "page": 1,
    //         "per_page": 8,
    //         "photos": [
    //             {
    //                 "id": 3655681, "width": 3840, "height": 5120, "url": "https://www.pexels.com/photo/sea-landscape-beach-water-3655681/", "photographer": "Ena Marinkovic", "photographer_url": "https://www.pexels.com/@ena-marinkovic-1814213", "photographer_id": 1814213, "avg_color": "#4B7995", "src": { "original": "https://images.pexels.com/photos/3655681/pexels-photo-3655681.jpeg", "large2x": "https://images.pexels.com/photos/3655681/pexels-photo-3655681.jpeg?auto=compress\u0026cs=tinysrgb\u0026dpr=2\u0026h=650\u0026w=940", "large": "https://images.pexels.com/photos/3655681/pexels-photo-3655681.jpeg?auto=compress\u0026cs=tinysrgb\u0026h=650\u0026w=940", "medium": "https://images.pexels.com/photos/3655681/pexels-photo-3655681.jpeg?auto=compress\u0026cs=tinysrgb\u0026h=350", "small": "https://images.pexels.com/photos/3655681/pexels-photo-3655681.jpeg?auto=compress\u0026cs=tinysrgb\u0026h=130", "portrait": "https://images.pexels.com/photos/3655681/pexels-photo-3655681.jpeg?auto=compress\u0026cs=tinysrgb\u0026fit=crop\u0026h=1200\u0026w=800", "landscape": "https://images.pexels.com/photos/3655681/pexels-photo-3655681.jpeg?auto=compress\u0026cs=tinysrgb\u0026fit=crop\u0026h=627\u0026w=1200", "tiny": "https://images.pexels.com/photos/3655681/pexels-photo-3655681.jpeg?auto=compress\u0026cs=tinysrgb\u0026dpr=1\u0026fit=crop\u0026h=200\u0026w=280" }, "liked": false
    //             },
    //             {
    //                 "id": 7342540, "width": 2096, "height": 2544, "url": "https://www.pexels.com/photo/snow-city-landscape-people-7342540/", "photographer": "Lisa Fotios", "photographer_url": "https://www.pexels.com/@fotios-photos", "photographer_id": 26735, "avg_color": "#B2A876", "src": { "original": "https://images.pexels.com/photos/7342540/pexels-photo-7342540.jpeg", "large2x": "https://images.pexels.com/photos/7342540/pexels-photo-7342540.jpeg?auto=compress\u0026cs=tinysrgb\u0026dpr=2\u0026h=650\u0026w=940", "large": "https://images.pexels.com/photos/7342540/pexels-photo-7342540.jpeg?auto=compress\u0026cs=tinysrgb\u0026h=650\u0026w=940", "medium": "https://images.pexels.com/photos/7342540/pexels-photo-7342540.jpeg?auto=compress\u0026cs=tinysrgb\u0026h=350", "small": "https://images.pexels.com/photos/7342540/pexels-photo-7342540.jpeg?auto=compress\u0026cs=tinysrgb\u0026h=130", "portrait": "https://images.pexels.com/photos/7342540/pexels-photo-7342540.jpeg?auto=compress\u0026cs=tinysrgb\u0026fit=crop\u0026h=1200\u0026w=800", "landscape": "https://images.pexels.com/photos/7342540/pexels-photo-7342540.jpeg?auto=compress\u0026cs=tinysrgb\u0026fit=crop\u0026h=627\u0026w=1200", "tiny": "https://images.pexels.com/photos/7342540/pexels-photo-7342540.jpeg?auto=compress\u0026cs=tinysrgb\u0026dpr=1\u0026fit=crop\u0026h=200\u0026w=280" }, "liked": false
    //             },
    //             {
    //                 "id": 7302872, "width": 2670, "height": 4000, "url": "https://www.pexels.com/photo/fashion-people-woman-girl-7302872/", "photographer": "Ksenia Chernaya", "photographer_url": "https://www.pexels.com/@kseniachernaya", "photographer_id": 1005150, "avg_color": "#D6D2CF", "src": { "original": "https://images.pexels.com/photos/7302872/pexels-photo-7302872.jpeg", "large2x": "https://images.pexels.com/photos/7302872/pexels-photo-7302872.jpeg?auto=compress\u0026cs=tinysrgb\u0026dpr=2\u0026h=650\u0026w=940", "large": "https://images.pexels.com/photos/7302872/pexels-photo-7302872.jpeg?auto=compress\u0026cs=tinysrgb\u0026h=650\u0026w=940", "medium": "https://images.pexels.com/photos/7302872/pexels-photo-7302872.jpeg?auto=compress\u0026cs=tinysrgb\u0026h=350", "small": "https://images.pexels.com/photos/7302872/pexels-photo-7302872.jpeg?auto=compress\u0026cs=tinysrgb\u0026h=130", "portrait": "https://images.pexels.com/photos/7302872/pexels-photo-7302872.jpeg?auto=compress\u0026cs=tinysrgb\u0026fit=crop\u0026h=1200\u0026w=800", "landscape": "https://images.pexels.com/photos/7302872/pexels-photo-7302872.jpeg?auto=compress\u0026cs=tinysrgb\u0026fit=crop\u0026h=627\u0026w=1200", "tiny": "https://images.pexels.com/photos/7302872/pexels-photo-7302872.jpeg?auto=compress\u0026cs=tinysrgb\u0026dpr=1\u0026fit=crop\u0026h=200\u0026w=280" }, "liked": false
    //             },
    //             {
    //                 "id": 7246399, "width": 3024, "height": 4032, "url": "https://www.pexels.com/photo/brown-concrete-building-near-road-during-night-time-7246399/", "photographer": "Vindhya Chandrasekharan", "photographer_url": "https://www.pexels.com/@vindhya-chandrasekharan-9993183", "photographer_id": 9993183, "avg_color": "#19293E", "src": { "original": "https://images.pexels.com/photos/7246399/pexels-photo-7246399.jpeg", "large2x": "https://images.pexels.com/photos/7246399/pexels-photo-7246399.jpeg?auto=compress\u0026cs=tinysrgb\u0026dpr=2\u0026h=650\u0026w=940", "large": "https://images.pexels.com/photos/7246399/pexels-photo-7246399.jpeg?auto=compress\u0026cs=tinysrgb\u0026h=650\u0026w=940", "medium": "https://images.pexels.com/photos/7246399/pexels-photo-7246399.jpeg?auto=compress\u0026cs=tinysrgb\u0026h=350", "small": "https://images.pexels.com/photos/7246399/pexels-photo-7246399.jpeg?auto=compress\u0026cs=tinysrgb\u0026h=130", "portrait": "https://images.pexels.com/photos/7246399/pexels-photo-7246399.jpeg?auto=compress\u0026cs=tinysrgb\u0026fit=crop\u0026h=1200\u0026w=800", "landscape": "https://images.pexels.com/photos/7246399/pexels-photo-7246399.jpeg?auto=compress\u0026cs=tinysrgb\u0026fit=crop\u0026h=627\u0026w=1200", "tiny": "https://images.pexels.com/photos/7246399/pexels-photo-7246399.jpeg?auto=compress\u0026cs=tinysrgb\u0026dpr=1\u0026fit=crop\u0026h=200\u0026w=280" }, "liked": false
    //             },
    //             {
    //                 "id": 7243354, "width": 4160, "height": 6240, "url": "https://www.pexels.com/photo/man-in-black-jacket-sitting-on-chair-7243354/", "photographer": "kira schwarz", "photographer_url": "https://www.pexels.com/@kira-schwarz", "photographer_id": 616468, "avg_color": "#AFAFAF", "src": { "original": "https://images.pexels.com/photos/7243354/pexels-photo-7243354.jpeg", "large2x": "https://images.pexels.com/photos/7243354/pexels-photo-7243354.jpeg?auto=compress\u0026cs=tinysrgb\u0026dpr=2\u0026h=650\u0026w=940", "large": "https://images.pexels.com/photos/7243354/pexels-photo-7243354.jpeg?auto=compress\u0026cs=tinysrgb\u0026h=650\u0026w=940", "medium": "https://images.pexels.com/photos/7243354/pexels-photo-7243354.jpeg?auto=compress\u0026cs=tinysrgb\u0026h=350", "small": "https://images.pexels.com/photos/7243354/pexels-photo-7243354.jpeg?auto=compress\u0026cs=tinysrgb\u0026h=130", "portrait": "https://images.pexels.com/photos/7243354/pexels-photo-7243354.jpeg?auto=compress\u0026cs=tinysrgb\u0026fit=crop\u0026h=1200\u0026w=800", "landscape": "https://images.pexels.com/photos/7243354/pexels-photo-7243354.jpeg?auto=compress\u0026cs=tinysrgb\u0026fit=crop\u0026h=627\u0026w=1200", "tiny": "https://images.pexels.com/photos/7243354/pexels-photo-7243354.jpeg?auto=compress\u0026cs=tinysrgb\u0026dpr=1\u0026fit=crop\u0026h=200\u0026w=280" }, "liked": false
    //             },
    //             {
    //                 "id": 7239496, "width": 1977, "height": 2471, "url": "https://www.pexels.com/photo/fashion-love-people-woman-7239496/", "photographer": "Mariana Montrazi", "photographer_url": "https://www.pexels.com/@mariana-montrazi-24300980", "photographer_id": 24300980, "avg_color": "#2D2D2D", "src": { "original": "https://images.pexels.com/photos/7239496/pexels-photo-7239496.jpeg", "large2x": "https://images.pexels.com/photos/7239496/pexels-photo-7239496.jpeg?auto=compress\u0026cs=tinysrgb\u0026dpr=2\u0026h=650\u0026w=940", "large": "https://images.pexels.com/photos/7239496/pexels-photo-7239496.jpeg?auto=compress\u0026cs=tinysrgb\u0026h=650\u0026w=940", "medium": "https://images.pexels.com/photos/7239496/pexels-photo-7239496.jpeg?auto=compress\u0026cs=tinysrgb\u0026h=350", "small": "https://images.pexels.com/photos/7239496/pexels-photo-7239496.jpeg?auto=compress\u0026cs=tinysrgb\u0026h=130", "portrait": "https://images.pexels.com/photos/7239496/pexels-photo-7239496.jpeg?auto=compress\u0026cs=tinysrgb\u0026fit=crop\u0026h=1200\u0026w=800", "landscape": "https://images.pexels.com/photos/7239496/pexels-photo-7239496.jpeg?auto=compress\u0026cs=tinysrgb\u0026fit=crop\u0026h=627\u0026w=1200", "tiny": "https://images.pexels.com/photos/7239496/pexels-photo-7239496.jpeg?auto=compress\u0026cs=tinysrgb\u0026dpr=1\u0026fit=crop\u0026h=200\u0026w=280" }, "liked": false
    //             },
    //             {
    //                 "id": 6757343, "width": 3023, "height": 4589, "url": "https://www.pexels.com/photo/grayscale-photo-of-woman-in-white-dress-dancing-6757343/", "photographer": "Mariana Montrazi", "photographer_url": "https://www.pexels.com/@mariana-montrazi-24300980", "photographer_id": 24300980, "avg_color": "#EEE", "src": { "original": "https://images.pexels.com/photos/6757343/pexels-photo-6757343.jpeg", "large2x": "https://images.pexels.com/photos/6757343/pexels-photo-6757343.jpeg?auto=compress\u0026cs=tinysrgb\u0026dpr=2\u0026h=650\u0026w=940", "large": "https://images.pexels.com/photos/6757343/pexels-photo-6757343.jpeg?auto=compress\u0026cs=tinysrgb\u0026h=650\u0026w=940", "medium": "https://images.pexels.com/photos/6757343/pexels-photo-6757343.jpeg?auto=compress\u0026cs=tinysrgb\u0026h=350", "small": "https://images.pexels.com/photos/6757343/pexels-photo-6757343.jpeg?auto=compress\u0026cs=tinysrgb\u0026h=130", "portrait": "https://images.pexels.com/photos/6757343/pexels-photo-6757343.jpeg?auto=compress\u0026cs=tinysrgb\u0026fit=crop\u0026h=1200\u0026w=800", "landscape": "https://images.pexels.com/photos/6757343/pexels-photo-6757343.jpeg?auto=compress\u0026cs=tinysrgb\u0026fit=crop\u0026h=627\u0026w=1200", "tiny": "https://images.pexels.com/photos/6757343/pexels-photo-6757343.jpeg?auto=compress\u0026cs=tinysrgb\u0026dpr=1\u0026fit=crop\u0026h=200\u0026w=280" }, "liked": false
    //             },
    //             {
    //                 "id": 7237022, "width": 2268, "height": 4032, "url": "https://www.pexels.com/photo/red-and-brown-food-on-black-surface-7237022/", "photographer": "kira schwarz", "photographer_url": "https://www.pexels.com/@kira-schwarz", "photographer_id": 616468, "avg_color": "#643A31", "src": { "original": "https://images.pexels.com/photos/7237022/pexels-photo-7237022.jpeg", "large2x": "https://images.pexels.com/photos/7237022/pexels-photo-7237022.jpeg?auto=compress\u0026cs=tinysrgb\u0026dpr=2\u0026h=650\u0026w=940", "large": "https://images.pexels.com/photos/7237022/pexels-photo-7237022.jpeg?auto=compress\u0026cs=tinysrgb\u0026h=650\u0026w=940", "medium": "https://images.pexels.com/photos/7237022/pexels-photo-7237022.jpeg?auto=compress\u0026cs=tinysrgb\u0026h=350", "small": "https://images.pexels.com/photos/7237022/pexels-photo-7237022.jpeg?auto=compress\u0026cs=tinysrgb\u0026h=130", "portrait": "https://images.pexels.com/photos/7237022/pexels-photo-7237022.jpeg?auto=compress\u0026cs=tinysrgb\u0026fit=crop\u0026h=1200\u0026w=800", "landscape": "https://images.pexels.com/photos/7237022/pexels-photo-7237022.jpeg?auto=compress\u0026cs=tinysrgb\u0026fit=crop\u0026h=627\u0026w=1200", "tiny": "https://images.pexels.com/photos/7237022/pexels-photo-7237022.jpeg?auto=compress\u0026cs=tinysrgb\u0026dpr=1\u0026fit=crop\u0026h=200\u0026w=280" }, "liked": false
    //             }
    //         ],
    //         "total_results": 8000,
    //         "next_page": "https://api.pexels.com/v1/curated/?page=2\u0026per_page=8"
    //     }
    // )

    return {
        props: { isConnected, collections: JSON.parse(JSON.stringify(collections)) }
    }
}

export default index;
