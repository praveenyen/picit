import React, { useState } from 'react';
import axios from 'axios';
import styles from './Photo.module.scss';
import { LazyLoadImage, trackWindowScroll } from 'react-lazy-load-image-component';

const Photo = ({ photo }) => {
    const [isUpVoted, setIsUpVoted] = useState(false);
    const [isDownVoted, setIsDownVoted] = useState(false);
    const addToFavourite = async () => {
        const addRequest = await axios.post(`/api/photos/favourites/`, photo);
        setIsUpVoted(true)
        setTimeout(() => {
            setIsUpVoted(false)
        }, 10000);
    };
    const downVote = async () => {
        const deleteRequest = await axios.delete(`/api/photos/favourites/${photo.id}`, photo);
        setIsDownVoted(true);
        setTimeout(() => {
            setIsDownVoted(false)
        }, 10000);
    }

    return (
        <div className={`
        ${styles.imageContainer} 
        ${isUpVoted && 'animate__animated animate__heartBeat animate__repeat-2'}
        ${isDownVoted && 'animate__animated animate__flipOutX animate__repeat-1'}
        `}>
            <LazyLoadImage src={photo.src.portrait} alt="Photo 1" style={{
                borderRadius: '10px',
                width: '100%'
            }} />
            <div className={styles.overlay}>
                <div className="row justify-content-around">
                    <div className="col-4">
                        <span class="badge rounded-pill bg-success" onClick={e => addToFavourite()}>Up</span>
                    </div>
                    <div className="col-4">
                        <span class="badge rounded-pill bg-info" onClick={e => downVote()}>Down</span>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Photo;
