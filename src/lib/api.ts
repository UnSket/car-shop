import {stringify} from 'query-string';

interface MakeRequestParams {
    url: string;
    queryParams?: Record<string, unknown>;
}

const BASE_API_URL = 'https://auto1-mock-server.herokuapp.com/api/';

export const makeRequest = async <Response>(params: MakeRequestParams) => {
    let url = `${BASE_API_URL}${params.url}`;

    if (params.queryParams) {
        url += `?${stringify(params.queryParams)}`;
    }
    const response = await fetch(url);

    return await response.json() as Response;
}
