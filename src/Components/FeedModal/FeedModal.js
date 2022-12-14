import React, { useEffect } from 'react'
import { PHOTO_GET } from '../../Api'
import useFetch from '../../Hooks/useFetch'
import styles from "./FeedModal.module.css"
import Error from "../Error/Error"
import Loading from '../Loading/Loading'
import PhotoContent from "../PhotoContent/PhotoContent"

const FeedModal = ({ photo, setModalPhoto }) => {

    const { data, error, loading, request } = useFetch()

    useEffect(() => {
        const { url, options } = PHOTO_GET(photo.id);
        request(url, options)
    }, [photo, request])

    function handleOutsideClick(event) {
        if (event.target === event.currentTarget) setModalPhoto(null)

    }

    return (
        <div className={styles.modal} onClick={handleOutsideClick}>
            {error && <Error error={error} />}
            {loading && <Loading />}
            {data && <PhotoContent data={data} />}
        </div>
    )
}

export default FeedModal;