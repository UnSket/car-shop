interface MakeRequestParams {
    url: string;
    queryParams?: Record<string, unknown>;
}

const BASE_API_URL = 'https://auto1-mock-server.herokuapp.com/api/';

export const makeRequest = async <Response>(params: MakeRequestParams) => {
    const response = await fetch(`${BASE_API_URL}${params.url}`);

    return await response.json() as Response;
}
