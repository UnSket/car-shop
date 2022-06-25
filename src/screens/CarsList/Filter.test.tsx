import React from 'react';
import {
    fireEvent,
    getByRole,
    render,
    screen,
    waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { CarsFilter, Filter } from './Filter';
import { MemoryRouter } from 'react-router-dom';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { QueryClient, QueryClientProvider } from 'react-query';

const server = setupServer(
    rest.get(
        'https://auto1-mock-server.herokuapp.com/api/colors',
        (req, res, ctx) => {
            return res(ctx.json({ colors: ['red', 'green', 'white'] }));
        }
    ),
    rest.get(
        'https://auto1-mock-server.herokuapp.com/api/manufacturers',
        (req, res, ctx) => {
            return res(
                ctx.json({
                    manufacturers: [{ name: 'Fiat' }, { name: 'Audi' }],
                })
            );
        }
    )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const queryClient = new QueryClient();

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <MemoryRouter>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </MemoryRouter>
    );
};

test('displays current filter', async () => {
    const currentFilter: CarsFilter = {
        manufacture: 'Fiat',
        color: 'red',
    };

    const mockFunction = jest.fn();
    render(
        <Filter currentFilter={currentFilter} onFilterSubmit={mockFunction} />,
        { wrapper: Wrapper }
    );

    await waitFor(() => screen.getByTestId('filter-select-Color'));

    expect(screen.getByTestId('filter-select-Color')).toHaveTextContent('red');
    expect(screen.getByTestId('filter-select-Manufacturer')).toHaveTextContent(
        'Fiat'
    );
});

test('change filter', async () => {
    const currentFilter: CarsFilter = {
        manufacture: '',
        color: '',
    };

    const mockFunction = jest.fn();
    render(
        <Filter currentFilter={currentFilter} onFilterSubmit={mockFunction} />,
        { wrapper: Wrapper }
    );

    await waitFor(() => screen.getByTestId('filter-select-Color'));
    const button = getByRole(
        screen.getByTestId('filter-select-Color'),
        'button'
    );
    fireEvent.mouseDown(button);

    await waitFor(() => screen.getByTestId('filter-select-Color-item-green'));

    expect(
        screen.getByTestId('filter-select-Color-item-green')
    ).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('filter-select-Color-item-green'));
    fireEvent.click(screen.getByTestId('filter-submit-button'));

    expect(mockFunction).toBeCalled();
});
