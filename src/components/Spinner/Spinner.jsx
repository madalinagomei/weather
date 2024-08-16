import React from "react";
import styles from './Spinner.module.css';
import ClipLoader from "react-spinners/ClipLoader";

const Spinner = () => {
    return (
        <div className={styles.spinnerContainer}>
            <ClipLoader color="hsla(0, 67%, 53%, 1)" />
        </div>
    );
};

export default Spinner;