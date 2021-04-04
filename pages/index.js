import React, { useState, useEffect } from 'react';
import { createClient } from 'pexels';

const client = createClient('563492ad6f917000010000011070a3625d3e4a8387879fdb8392db23')

import styles from './search.module.scss'

const pexels = () => {
    const [images, setImages] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [pageImages, setPageImages] = useState([]);

    useEffect(() => {
        const fetchPexelImages = async () => {
            console.log('Fetching the pexel images')
            const curatedPhotos = await client.photos.curated({ per_page: 8 });
            setImages(curatedPhotos)
            setPageImages(curatedPhotos.photos)
        }
        fetchPexelImages();
        return () => {
        };
    }, []);

    const search = async (event) => {
        event.preventDefault();
        const query = event.target.value;
        const searchPhotos = await client.photos.search({ query: query, per_page: 8 })
        setImages(searchPhotos)
        setSearchQuery(query)
        setPageImages(searchPhotos.photos)
    }

    const loadMore = async (e) => {
        e.preventDefault();
        const pagination = {
            page: images.page + 1,
            per_page: images.per_page
        }

        const loadMore = await client.photos.curated(pagination)
        setImages(loadMore)
        setPageImages([...pageImages, ...loadMore.photos])
        console.log(pageImages)
    }
    return (
        <div>
            <div className="container">
                <div className="card nav-card">
                    <div className="card-header py-0">
                        <img src="/picit_logo.png" alt="Vercel Logo" className={styles.logo} />
                        {/* <h2 className="font-weight-bold">Pic It</h2> */}
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12 my-5">
                        <input className="form-control alternate-input" type="text" name="query" placeholder="Search Photos" onChange={e => { search(e) }} />
                    </div>
                </div>
                <div className="row">
                    {pageImages?.map(image => {
                        return <div className="col-sm-12 col-md-3 my-2">
                            <img className="img-fluid" style={{
                                borderRadius: '10px',
                                width: '100%'
                            }} src={image?.src?.medium} alt="photo" />
                        </div>
                    })}
                </div>
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-2 my-5">
                        <button className="btn btn-primary" onClick={e => loadMore(e)}>Load More</button>
                    </div>
                </div>
            </div>
            {/* {JSON.stringify(images)} */}
        </div>
    );
}

export default pexels;
