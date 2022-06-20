import { AppBar, Toolbar, Link, Button } from '@mui/material';
import React from 'react';
import styles from './Header.module.css';
import logo from './logo.png';
import { ButtonLink } from '../ButtonLink/ButtonLink';

export const Header: React.FC = () => {
    return (
        <AppBar position='static'>
            <Toolbar className={styles.container} >
                <img src={logo} className={styles.logo} />

                <div>
                    <ButtonLink variant='text' color='inherit' to='/purchase'>Purchase</ButtonLink>
                    <ButtonLink variant='text'  color='inherit' to='/orders'>My Orders</ButtonLink>
                    <ButtonLink variant='text'  color='inherit' to='/sell'>Sell</ButtonLink>
                </div>
            </Toolbar>
        </AppBar>
    )
}