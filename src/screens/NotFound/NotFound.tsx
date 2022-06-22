import React from 'react';
import styles from './NotFound.module.scss';
import logo from '../../assets/logo.png';
import {Typography} from "@mui/material";
import {Link} from "../../components/Link/Link";

export const NotFound: React.FC = () => {
    return (
        <div className={styles.container}>
            <img src={logo} alt='logo' className={styles.logo} />
            <Typography variant='h4' className={styles.contentItem} mt={1.5}>404 - Not Found</Typography>
            <Typography variant='body1' className={styles.contentItem} mt={1.5}>Sorry, the page you are looking for does not exist</Typography>
            <Typography variant='body1' className={styles.contentItem} mt={1.5}>You can always go back to the <Link to="/">homepage</Link>.</Typography>
        </div>
    )
}
