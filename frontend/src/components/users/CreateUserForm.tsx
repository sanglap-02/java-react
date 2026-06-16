import { FormEvent, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { usePost } from '@hooks/useApi';
import Button from '@components/common/Button';
import type { CreateUserRequest, User } from '@/types/api.types';

interface CreateUserFormProps {
  onClose: () => void;
}

const emptyForm: CreateUserRequest = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  role: 'ROLE_USER',
};

export default function CreateUserForm({ onClose }: CreateUserFormProps) {
  const queryClient = useQueryClient();
  const [form, setForm] = useState<CreateUserRequest>(emptyForm);

  const { mutate, isPending, isError, error } = usePost<User, CreateUserRequest>('/users', {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      onClose();
    },
  });

  const serverErrors = (error?.response?.data as { errors?: Record<string, string> } | undefined)
    ?.errors;
  const serverMessage = (error?.response?.data as { message?: string } | undefined)?.message;

  const handleChange = (field: keyof CreateUserRequest) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutate(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Create user</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">First name</label>
              <input
                type="text"
                required
                value={form.firstName}
                onChange={handleChange('firstName')}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {serverErrors?.firstName && (
                <p className="mt-1 text-xs text-red-600">{serverErrors.firstName}</p>
              )}
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Last name</label>
              <input
                type="text"
                required
                value={form.lastName}
                onChange={handleChange('lastName')}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {serverErrors?.lastName && (
                <p className="mt-1 text-xs text-red-600">{serverErrors.lastName}</p>
              )}
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={handleChange('email')}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {serverErrors?.email && (
              <p className="mt-1 text-xs text-red-600">{serverErrors.email}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              required
              minLength={8}
              value={form.password}
              onChange={handleChange('password')}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {serverErrors?.password && (
              <p className="mt-1 text-xs text-red-600">{serverErrors.password}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Role</label>
            <select
              value={form.role}
              onChange={handleChange('role')}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="ROLE_USER">User</option>
              <option value="ROLE_ADMIN">Admin</option>
            </select>
          </div>

          {isError && !serverErrors && (
            <p className="text-sm text-red-600">{serverMessage ?? 'Failed to create user.'}</p>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" loading={isPending}>
              Create
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
