import React from 'react'
import styles from "./ShowImage.module.css"
import { API } from '../Config'
const ShowImage = ({item,url}) => {
    return (
        <div >
            <img src={`${API}/${url}/photo/${item._id}`} alt={item.name} className={styles.cardImage} />
        </div>
    )
}

export default ShowImage
