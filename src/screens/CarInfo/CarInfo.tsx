import React from 'react';
import {useParams} from "react-router-dom";
import {useQuery} from 'react-query';
import {getCarQuery} from "../../queries/car";
import styles from './CarInfo.module.scss';
import {Button, Card, CardActions, CardContent, Skeleton, Typography} from "@mui/material";

const getCarDescription = (car: ApiData.Car): string => `Stock # ${car.stockNumber} - ${car.mileage.number} ${car.mileage.unit} - ${car.fuelType} - ${car.color}`

export const CarInfo: React.FC = () => {
    const {stockNumber} = useParams();

    const {data: car} = useQuery(getCarQuery({stockNumber: stockNumber as string}));

    return (
        <div>
            {car ? <div className={styles.imageWrapper} style={{backgroundImage: `url(${car.pictureUrl})`}}/> :
                <Skeleton variant="rectangular" height={styles.imageHeight}/>}
            <div className={styles.contentWrapper}>
                <div className={styles.content}>
                    <div className={styles.contentRow}>
                        {car ? <Typography variant="h3">{car.manufacturerName}</Typography> :
                            <Skeleton variant="rectangular" width={200} height={50}/>}
                        <div className={styles.description}>
                            {car ? <Typography variant="subtitle1">{getCarDescription(car)}</Typography> :
                                <Skeleton variant="rectangular" width={300} height={30}/>}
                        </div>
                        <div className={styles.status}>
                            {car ? <Typography variant="body1">
                                    This car is currently available and can be delivered as soon as tomorrow morning. Please
                                    be aware that delivery times shown in this page are note definitive and may change due
                                    to bad weather conditions.
                                </Typography> :
                                <Skeleton variant="rectangular" width={400} height={90}/>}
                        </div>
                    </div>
                    <div className={styles.contentRow}>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography variant="body1">
                                    If you like this car, click the button and save it in your collection of favourite items.
                                </Typography>
                            </CardContent>
                            <CardActions className={styles.cardActions}>
                                <Button>Save</Button>
                            </CardActions>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
