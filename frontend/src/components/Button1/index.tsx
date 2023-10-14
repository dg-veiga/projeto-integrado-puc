import React from 'react';
import { useRouter } from 'next/router';

import styles from './styles.module.css';

interface Props{
    type: "button" | "submit" | "reset"
    children: any
    variant?: 'primary' | 'secondary' | 'danger'
}

function Button1({type, children, variant='secondary'}: Props) {
    return (
        <button type={type} className={`btn btn-${variant}`} id={styles.Button1}>
            {children}
        </button>
    );
};

export default Button1;
