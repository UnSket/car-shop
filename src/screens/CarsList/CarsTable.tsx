import React from 'react';
import {useQuery} from 'react-query';
import {getCarsListQuery} from "../../queries/cars-list";
import {CarCard} from "./CarCard";
import styles from './CarsTable.module.css';
import {Button, Skeleton, Typography} from "@mui/material";

interface CarsTableProps {
    manufacturer?: string;
    color?: string;
    page: number;
    setPage: (page: number) => void;
}

export const CarsTable: React.FC<CarsTableProps> = ({color, page, setPage, manufacturer}) => {
    const { data, isLoading } = useQuery(getCarsListQuery({
        color,
        manufacturer,
        page
    }));
    if (isLoading || !data) {
        return (
            <div>
                <Skeleton variant='text' />
                <Skeleton variant='text' />
                <div className={styles.content}>
                    {Array.of(5).map((_, index) => <CarCard key={index}/>)}
                </div>
            </div>
        )
    }

    const hasPrevious = page > 1;
    const hasNext = page < data.totalPageCount;

    return (
        <div>
            <Typography variant="h5">Available cars</Typography>
            <Typography variant="subtitle1" mt={1.5} mb={2}>Showing 10 of {data.totalCarsCount} cars</Typography>
            <div className={styles.content}>
                {data.cars.map(car => <CarCard car={car} key={car.stockNumber} />)}
            </div>
            <div className={styles.footer}>
                {hasPrevious && (
                    <>
                        <Button variant="text" onClick={() => setPage(1)}>First</Button>
                        <Button variant="text" onClick={() => setPage(page - 1)}>Previous</Button>
                    </>
                )}
                <Typography variant="body1">Page {page} of {data.totalPageCount}</Typography>
                {hasNext && (
                    <>
                        <Button variant="text" onClick={() => setPage(page + 1)}>Next</Button>
                        <Button variant="text" onClick={() => setPage(data.totalPageCount)}>Last</Button>
                    </>
                )}
            </div>
        </div>
    )
}
