import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService } from '../api/apiService';

interface LoginDTO {
  email: string;
  password: string;
}

interface RegisterDTO {
  name: string;
  email: string;
  password: string;
}

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthResponse {
  token: string;
  user: User;
}

export const useAuth = () => {
  const queryClient = useQueryClient();

  const useCurrentUser = () =>
    useQuery<User, Error>({
      queryKey: ['auth', 'me'],
      queryFn: () => apiService.getCurrentUser().then(res => res.data),
      retry: false,
      staleTime: 5 * 60 * 1000,
    });

  const useLogin = () =>
    useMutation<AuthResponse, Error, LoginDTO>({
      mutationFn: (data) => apiService.login(data).then(res => res.data),
      onSuccess: (data) => {
        // Save token to localStorage or cookies
        localStorage.setItem('token', data.token);
        queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
      },
      onError: () => {
        localStorage.removeItem('token');
        queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
      },
    });

  const useRegister = () =>
    useMutation<AuthResponse, Error, RegisterDTO>({
      mutationFn: (data) => apiService.register(data).then(res => res.data),
      onSuccess: (data) => {
        localStorage.setItem('token', data.token);
        queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
      },
      onError: () => {
        localStorage.removeItem('token');
        queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
      },
    });

  const useLogout = () =>
    useMutation<void, Error>({
      mutationFn: () => apiService.logout().then(res => res.data),
      onSuccess: () => {
        localStorage.removeItem('token');
        queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
      },
      onError: () => {
        localStorage.removeItem('token');
        queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
      },
    });

  return {
    useCurrentUser,
    useLogin,
    useRegister,
    useLogout,
  };
};
