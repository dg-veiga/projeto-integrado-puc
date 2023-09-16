import React from 'react';
import { useRouter } from 'next/router';

import styles from './styles.module.scss';

interface Props{
    type: "button" | "submit" | "reset"
}

const Button1 = ({type}: Props) => {
    return (
        <button type={type} className={styles.Button1}>
            Submit
        </button>
    );
};

export default Button1;
