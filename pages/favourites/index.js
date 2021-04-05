import React, { useState, useEffect } from 'react';
import axios from 'axios';
import User from '../../layout/user'
import Photo from '../../components/Photo'

const index = () => {
    const [favourites, setFavourites] = useState([])
    useEffect(() => {
        const fetchFavourites = async () => {
            const favourites = await axios.get('/api/photos/favourites');
            setFavourites(favourites.data['data'])
        }
        fetchFavourites();
    }, []);
    return (
        <div>
            <div className="container">
                <div className="row py-5">
                    {/* {JSON.stringify(favourites)} */}
                    {favourites?.map(photo => {
                        return <>
                            <div className="col-sm-12 col-md-2 mb-4">
                                <Photo photo={photo} />
                            </div>
                        </>
                    })}
                </div>
            </div>
        </div>
    );
}

index.layout = User;

export default index;
