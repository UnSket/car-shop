import { createQuery } from '../lib/createQuery';
import { makeRequest } from '../lib/api';

export function getManufacturesQueryKey(): string {
    return `manufactures`;
}

export const getManufacturesQuery = createQuery({
    queryKey() {
        return getManufacturesQueryKey();
    },

    queryFn: async () => {
        const responseData = await makeRequest<{
            manufacturers: ApiData.Manufacturer[];
        }>({
            url: `manufacturers`,
        });

        return responseData.manufacturers;
    },
});
