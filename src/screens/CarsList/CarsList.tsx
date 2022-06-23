import React from 'react';
import {CarsTable} from "./CarsTable";

interface CarsListProps {

}

export const CarsList: React.FC<CarsListProps> = ({}) => {
    return (
        <div>
            Cars List Screen
            <CarsTable />
        </div>
    );
}
