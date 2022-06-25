import React from 'react';
import {Paper, Skeleton, Typography} from "@mui/material";
import styles from './CarCard.module.scss';
import {getCarDescription} from "../../lib/getCarDescription";
import {Link} from "../../components/Link/Link";

interface CarCardProps {
    car?: ApiData.Car;
}

export const CarCard: React.FC<CarCardProps> = ({car}) => {
    return(
        <Paper variant="outlined">
            <div className={styles.container}>
                {car ? <div className={styles.logo} style={{backgroundImage: `url(${car.pictureUrl})`}} /> : <Skeleton variant="rectangular" width={80} height={80} />}
                <div className={styles.content}>
                    {car ? (
                        <>
                            <Typography variant="subtitle1">{car.manufacturerName}</Typography>
                            <Typography variant="body1" mt={1.5}>{getCarDescription(car)}</Typography>
                            <Link to={`/car/${car.stockNumber}`} mt={1.5}>View details</Link>
                        </>
                        ) : (
                            <>
                                <Skeleton variant="text" />
                                <Skeleton variant="text" />
                                <Skeleton variant="text" />
                            </>
                        )}
                </div>
            </div>
        </Paper>
    )
}