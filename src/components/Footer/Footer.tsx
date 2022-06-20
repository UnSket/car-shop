import { Card } from '@mui/material';
import React from 'react';
import styles from './Footer.module.css';

export const Footer = () => {
    return (
        <Card variant='outlined' className={styles.container}>
            © AUTO1 Group 2022
        </Card>
    )
}