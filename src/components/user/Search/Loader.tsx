import React from "react";
import styles from './Loader.module.css';

const Loader = () => {
    return (
        <div className="flex justify-center">
            <div className={styles.loading}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    );
};

export default Loader;
