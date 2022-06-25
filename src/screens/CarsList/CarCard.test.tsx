import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CarCard } from './CarCard';
import { MemoryRouter } from 'react-router-dom';

test('displays skeletons without data', () => {
    render(<CarCard />, { wrapper: MemoryRouter });

    expect(screen.getByTestId('car-card-skeleton-1')).toBeInTheDocument();
    expect(screen.getByTestId('car-card-skeleton-2')).toBeInTheDocument();
    expect(screen.getByTestId('car-card-skeleton-3')).toBeInTheDocument();
    expect(screen.getByTestId('car-card-logo-skeleton')).toBeInTheDocument();
});

test('displays car data', () => {
    const testCar: ApiData.Car = {
        stockNumber: 1,
        pictureUrl: '',
        color: 'white',
        fuelType: 'Petrol',
        manufacturerName: 'Test manufacture name',
        mileage: {
            unit: 'km',
            number: 1,
        },
        modelName: 'test model name',
    };
    render(<CarCard car={testCar} />, { wrapper: MemoryRouter });

    expect(screen.getByTestId('car-card-manufacturer-name')).toHaveTextContent(
        testCar.manufacturerName
    );
    expect(screen.getByTestId('car-card-description')).toHaveTextContent(
        'Stock # 1 - 1 km - Petrol - white'
    );
    expect(screen.getByTestId('car-card-logo')).toBeInTheDocument();
});
