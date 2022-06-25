import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getCarQuery } from '../../queries/car';
import styles from './CarInfo.module.scss';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Skeleton,
    Typography,
} from '@mui/material';
import { getCarDescription } from '../../lib/getCarDescription';
import { useIsCarFavourite } from '../../services/favouriteCars';

export const CarInfo: React.FC = () => {
    const { stockNumber } = useParams();

    const { data: car } = useQuery(
        getCarQuery({ stockNumber: stockNumber as string })
    );

    const { toggle, isFavourite } = useIsCarFavourite(car?.stockNumber);

    return (
        <div>
            {car ? (
                <div
                    className={styles.imageWrapper}
                    style={{ backgroundImage: `url(${car.pictureUrl})` }}
                />
            ) : (
                <Skeleton
                    variant="rectangular"
                    height={styles.imageHeight}
                    data-testid="car-info-logo-skeleton"
                />
            )}
            <div className={styles.contentWrapper}>
                <div className={styles.content}>
                    <div className={styles.contentRow}>
                        {car ? (
                            <>
                                <Typography
                                    variant="h3"
                                    data-testid="car-info-manufacturer-name"
                                >
                                    {car.manufacturerName}
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    mt={1.5}
                                    data-testid="car-info-description"
                                >
                                    {getCarDescription(car)}
                                </Typography>
                                <Typography variant="body1" mt={1.5}>
                                    This car is currently available and can be
                                    delivered as soon as tomorrow morning.
                                    Please be aware that delivery times shown in
                                    this page are note definitive and may change
                                    due to bad weather conditions.
                                </Typography>
                            </>
                        ) : (
                            <>
                                <Skeleton
                                    variant="text"
                                    data-testid="car-info-skeleton-1"
                                />
                                <Skeleton
                                    variant="text"
                                    data-testid="car-info-skeleton-2"
                                />
                                <Skeleton
                                    variant="text"
                                    data-testid="car-info-skeleton-3"
                                />
                            </>
                        )}
                    </div>
                    <div className={styles.contentRow}>
                        <Card variant="outlined">
                            {car ? (
                                <>
                                    <CardContent>
                                        <Typography variant="body1">
                                            If you like this car, click the
                                            button and save it in your
                                            collection of favourite items.
                                        </Typography>
                                    </CardContent>
                                    <CardActions className={styles.cardActions}>
                                        <Button
                                            onClick={toggle}
                                            variant={
                                                isFavourite
                                                    ? 'text'
                                                    : 'outlined'
                                            }
                                        >
                                            {isFavourite ? 'Remove' : 'Save'}
                                        </Button>
                                    </CardActions>
                                </>
                            ) : (
                                <CardContent>
                                    <Skeleton variant="text" />
                                    <Skeleton variant="text" />
                                    <Skeleton variant="text" />
                                </CardContent>
                            )}
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};
