import {createQuery} from "../lib/createQuery";
import {makeRequest} from "../lib/api";

export function getColorQueryKey(): string {
    return `colors`;
}

export const getColorQuery = createQuery({
    queryKey() {
        return getColorQueryKey();
    },

    queryFn: async () => {
        const responseData = await makeRequest< {colors: string[]}>({
            url: `colors`,
        });

        return responseData.colors;
    },
});
