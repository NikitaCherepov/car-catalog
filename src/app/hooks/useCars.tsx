import { useQuery } from '@tanstack/react-query';
import carService from '../services/carService';

export function useCars(filter:'asc' | 'desc' | '' = '', page:number) {
    const { data, isLoading, isSuccess, refetch, isError } = useQuery({
        queryKey: ['cars', page, filter],
        queryFn: () => carService.getAllCars(filter, page),
        staleTime: 5 * 60 * 1000,
        retry: false
    });

    return { data, isLoading, isSuccess, refetch, isError};
}