import { useQuery, useMutation, useQueryClient, type UseQueryResult, type UseMutationResult } from '@tanstack/react-query';
import { apiService } from '../api/apiService';

// Generic types for better type safety
interface CRUDHooks<T = any, CreateDTO = any, UpdateDTO = any, FilterParams = any> {
  // Queries
  useGetAll: (params?: FilterParams) => UseQueryResult<T[], Error>;
  useGetById: (id?: string | number) => UseQueryResult<T, Error>;
  useGetByParams: (params?: FilterParams) => UseQueryResult<T[], Error>;

  // Mutations
  useCreate: () => UseMutationResult<T, Error, CreateDTO>;
  useUpdate: () => UseMutationResult<T, Error, { id: string | number; data: UpdateDTO }>;
  useRemove: () => UseMutationResult<void, Error, string | number>;
}

export const useCRUD = <
  T = any,
  CreateDTO = any,
  UpdateDTO = any,
  FilterParams = Record<string, any>
>(
  resource: string
): CRUDHooks<T, CreateDTO, UpdateDTO, FilterParams> => {
  const queryClient = useQueryClient();

  const useGetAll = (params?: FilterParams) => {
    return useQuery({
      queryKey: [resource, 'all', params],
      queryFn: () => apiService.getAll(resource, params ?? {}).then(res => res.data),
      staleTime: 5 * 60 * 1000, // cache for 5 mins
    });
  };

  const useGetById = (id?: string | number) => {
    return useQuery({
      queryKey: [resource, 'byId', id],
      queryFn: () => apiService.getById(resource, id!).then(res => res.data),
      enabled: !!id,
    });
  };

  const useGetByParams = (params?: FilterParams) => {
    return useQuery({
      queryKey: [resource, 'filter', params],
      queryFn: () => apiService.getByParams(resource, params!).then(res => res.data),
      enabled: !!params && Object.keys(params).length > 0,
    });
  };

  const useCreate = () => {
    return useMutation({
      mutationFn: (data: CreateDTO) => apiService.create(resource, data).then(res => res.data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [resource] });
      },
      onError: () => {
        queryClient.invalidateQueries({ queryKey: [resource] });
      },
    });
  };

  const useUpdate = () => {
    return useMutation({
      mutationFn: ({ id, data }: { id: string | number; data: UpdateDTO }) =>
        apiService.update(resource, id, data).then(res => res.data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [resource] });
      },
      onError: () => {
        queryClient.invalidateQueries({ queryKey: [resource] });
      },
    });
  };

  const useRemove = () => {
    return useMutation({
      mutationFn: (id: string | number) => apiService.remove(resource, id).then(res => res.data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [resource] });
      },
      onError: () => {
        queryClient.invalidateQueries({ queryKey: [resource] });
      },
    });
  };

  return {
    useGetAll,
    useGetById,
    useGetByParams,
    useCreate,
    useUpdate,
    useRemove,
  };
};

