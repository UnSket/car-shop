import {
    QueryFunctionContext,
    UseQueryOptions,
    QueryKey,
} from 'react-query';

export interface QueryDescriptor<P, D, E> {
    queryKey(params: P): QueryKey;
    queryFn(params: P, context: QueryFunctionContext): Promise<D>;
}

export function createQuery<P, D, E>(descriptor: QueryDescriptor<P, D, E>) {
    return (
        params: P,
    ): UseQueryOptions<D, E> => ({
        queryKey: descriptor.queryKey(params),
        queryFn(context) {
            return descriptor.queryFn(params, context);
        },
    });
}
