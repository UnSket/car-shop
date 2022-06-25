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
                {car ? <div className={styles.logo} style={{backgroundImage: `url(${car.pictureUrl})`}} data-testid="car-card-logo" /> : <Skeleton variant="rectangular" width={80} height={80} data-testid="car-card-logo-skeleton" />}
                <div className={styles.content}>
                    {car ? (
                        <>
                            <Typography variant="subtitle1" data-testid="car-card-manufacturer-name">{car.manufacturerName}</Typography>
                            <Typography variant="body1" mt={1.5} data-testid="car-card-description">{getCarDescription(car)}</Typography>
                            <Link to={`/car/${car.stockNumber}`} mt={1.5}>View details</Link>
                        </>
                        ) : (
                            <>
                                <Skeleton variant="text" data-testid="car-card-skeleton-1" />
                                <Skeleton variant="text" data-testid="car-card-skeleton-2" />
                                <Skeleton variant="text" data-testid="car-card-skeleton-3" />
                            </>
                        )}
                </div>
            </div>
        </Paper>
    )
}
