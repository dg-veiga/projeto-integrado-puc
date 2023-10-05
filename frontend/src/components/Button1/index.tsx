import React from 'react';
import { useRouter } from 'next/router';

import styles from './styles.module.css';

interface Props{
    type: "button" | "submit" | "reset"
    children: any
}

function Button1({type}: Props) {
    return (
        <button type={type} className='btn btn-primary' id={styles.Button1}>
            Submit
        </button>
    );
};

export default Button1;
