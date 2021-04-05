import React from 'react';
import axios from 'axios';
import styles from './Photo.module.scss';

const Photo = ({ photo }) => {
    const addToFavourite = async () => {
        const addRequest = await axios.post(`/api/photos/favourites/`, photo);
    };
    const removeFromFavourite = async () => {

    }

    return (
        <div className={styles.imageContainer}>
            <img src={photo.src.portrait} alt="Photo 1" style={{
                borderRadius: '10px',
                width: '100%'
            }} />
            <div className={styles.overlay}>
                <div className="row justify-content-around">
                    <div className="col-4">
                        <span class="badge rounded-pill bg-success" onClick={e => addToFavourite()}>Like</span>
                </div>
                <div className="col-4">
                    <span class="badge rounded-pill bg-info">Share</span>
                </div>
            </div>
        </div>
        </div >
    );
}

export default Photo;
