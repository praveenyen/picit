import React, { useState, useEffect } from 'react';
import { createClient } from 'pexels';

const client = createClient('563492ad6f917000010000011070a3625d3e4a8387879fdb8392db23')

const pexels = () => {
    const [images, setImages] = useState([]);
    const [randomImage, setRandomImage] = useState({});

    useEffect(() => {
        const fetchPexelImages = async () => {
            console.log('Fetching the pexel images')
            const random = await client.photos.random();
            const curatedPhotos = await client.photos.curated({ per_page: 10 });
            setImages(curatedPhotos)
            setRandomImage(random)
            console.log(curatedPhotos)
        }
        fetchPexelImages();
        return () => {
        };
    }, []);
    return (
        <div>
            <h2>Pexels Open Source API Documentation</h2>
            {images?.photos?.map(image => {
                return <div className="c">
                    <img style={{
                        borderRadius: '10px'
                    }} src={image?.src?.medium} alt="photo" />
                </div>
            })}
            <div className="row">
                <div className="col-sm-6">

                </div>
            </div>
            {JSON.stringify(images)}
            {JSON.stringify(randomImage)}
        </div>
    );
}

export default pexels;
