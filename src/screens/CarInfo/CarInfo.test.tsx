import React from 'react'
import {render, screen, waitFor} from '@testing-library/react'
import '@testing-library/jest-dom'
import {CarInfo} from './CarInfo';
import {MemoryRouter} from "react-router-dom";
import {setupServer} from "msw/node";
import {rest} from "msw";
import {QueryClient, QueryClientProvider} from "react-query";

const testCar: ApiData.Car = {
    stockNumber: 1,
    pictureUrl: '',
    color: 'white',
    fuelType: 'Petrol',
    manufacturerName: 'Test manufacture name',
    mileage: {
        unit: "km",
        number: 1
    },
    modelName: 'test model name'

}

const server = setupServer(
    rest.get('*', (req, res, ctx) => {
        return res(ctx.json({
            car: testCar
        }))
    })
)

const queryClient = new QueryClient();

const Wrapper: React.FC<{children: React.ReactNode}> = ({children}) => {
    return (
        <MemoryRouter>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </MemoryRouter>
    )
}

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('displays skeletons without data',  () => {
    render(<CarInfo />, {wrapper: Wrapper});

    expect(screen.getByTestId('car-info-skeleton-1')).toBeInTheDocument();
    expect(screen.getByTestId('car-info-skeleton-2')).toBeInTheDocument();
    expect(screen.getByTestId('car-info-skeleton-3')).toBeInTheDocument();
    expect(screen.getByTestId('car-info-logo-skeleton')).toBeInTheDocument();
});

test('displays car info data', async () => {

    render(<CarInfo />, {wrapper: Wrapper});

    await waitFor(() => screen.getByTestId('car-info-manufacturer-name'));

    expect(screen.getByTestId('car-info-manufacturer-name')).toHaveTextContent(testCar.manufacturerName);
    expect(screen.getByTestId('car-info-description')).toHaveTextContent('Stock # 1 - 1 km - Petrol - white');
});
