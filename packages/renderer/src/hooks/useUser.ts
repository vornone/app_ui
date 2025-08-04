import { useCRUD } from './useCRUD'; // adjust path as needed
import type { UseQueryResult, UseMutationResult } from '@tanstack/react-query';

interface User {
  id: number;
  name: string;
  email: string;
  active: boolean;
}

// Optionally you can define CreateUserDTO and UpdateUserDTO if needed
type CreateUserDTO = Partial<Omit<User, 'id'>>;
type UpdateUserDTO = Partial<Omit<User, 'id'>>;

export const useUser = () => {
  // Pass generic types for better type safety
  const userCRUD = useCRUD<User, CreateUserDTO, UpdateUserDTO>('users');

  return {
    useGetAll: userCRUD.useGetAll,
    useGetById: userCRUD.useGetById,
    useGetByParams: userCRUD.useGetByParams,
    useCreate: userCRUD.useCreate,
    useUpdate: userCRUD.useUpdate,
    useRemove: userCRUD.useRemove,
  };
};
