import React, { useState } from 'react';
import { CarsTable } from './CarsTable';
import { CarsFilter, Filter } from './Filter';
import styles from './CarsList.module.scss';
import { useSearchParams } from 'react-router-dom';

export const CarsList: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [filter, setFilter] = useState({
        color: searchParams.get('color') || '',
        manufacture: searchParams.get('manufacturer') || '',
        page: Number(searchParams.get('page')) || 1,
    });

    const updateFilter = React.useCallback((newFilter: CarsFilter) => {
        searchParams.set('color', newFilter.color);
        searchParams.set('manufacturer', newFilter.manufacture);
        searchParams.set('page', '1');
        setSearchParams(searchParams);

        setFilter({ ...newFilter, page: 1 });
    }, []);

    const setPage = React.useCallback(
        (newPage: number) => {
            searchParams.set('page', String(newPage));
            setSearchParams(searchParams);

            setFilter({
                ...filter,
                page: newPage,
            });
        },
        [filter, setFilter, searchParams]
    );

    return (
        <div className={styles.container}>
            <div>
                <Filter onFilterSubmit={updateFilter} currentFilter={filter} />
            </div>
            <CarsTable
                color={filter.color}
                manufacturer={filter.manufacture}
                setPage={setPage}
                page={filter.page}
            />
        </div>
    );
};
