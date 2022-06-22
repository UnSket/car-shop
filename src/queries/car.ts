import {createQuery} from "../lib/createQuery";
import {makeRequest} from "../lib/api";

export interface CarQueryParams {
    stockNumber: string;
}

export function getCarQueryKey(stockNumber: string): string {
    return `cars/${stockNumber}`;
}

export const getCarQuery = createQuery({
    queryKey(params: CarQueryParams) {
        return getCarQueryKey(params.stockNumber);
    },

    queryFn: async (params: CarQueryParams) => {
        const responseData = await makeRequest< {car: ApiData.Car}>({
            url: `cars/${params.stockNumber}`,
        });

        return responseData.car;
    },
});
