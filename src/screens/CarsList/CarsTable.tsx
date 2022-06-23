import React from 'react';
import {useQuery} from 'react-query';
import {getCarsListQuery} from "../../queries/cars-list";
import {CarCard} from "./CarCard";
import styles from './CarsTable.module.css';

interface CarsTableProps {
    manufacturer?: string;
    color?: string;
}

export const CarsTable: React.FC<CarsTableProps> = (props) => {
    const [page, setPage] = React.useState(0);
    const { data, isLoading } = useQuery(getCarsListQuery({
        ...props,
        page
    }));

    return (
        <div className={styles.content}>
            {data ? (
                <>
                    {data.cars.map(car => <CarCard car={car} key={car.stockNumber} />)}
                </>
            ) : (
                <>
                    {Array.of(5).map((_, index) => <CarCard key={index}/>)}
                </>
            )}
        </div>
    )
}
