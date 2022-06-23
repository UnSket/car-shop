import {createQuery} from "../lib/createQuery";
import {makeRequest} from "../lib/api";

export interface GetCarsListQueryParams {
    manufacturer?: string;
    color?: string;
    page: number;
}

export interface GetCarsListResponse {
    cars: ApiData.Car[],
    totalPageCount: number,
    totalCarsCount: number
}

export function getCarQueryKey(stockNumber: string): string {
    return `cars/${stockNumber}`;
}


export const getCarsListQuery = createQuery({
    queryKey(params: GetCarsListQueryParams) {
        const { manufacturer, color, page } = params;

        return [
            'carsList',
            manufacturer,
            color,
            page
        ].join('/');
    },
    queryFn(params: GetCarsListQueryParams, { pageParam: offset = 0 }) {
        const { manufacturer, color, page } = params;

        return makeRequest<GetCarsListResponse>({
            url: 'cars',
            queryParams: {
                manufacturer,
                color,
                page
            },
        });
    },
});
