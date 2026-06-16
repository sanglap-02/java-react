import { useState } from 'react';
import { useGet } from '@hooks/useApi';
import LoadingSpinner from '@components/common/LoadingSpinner';
import Button from '@components/common/Button';
import CreateUserForm from '@components/users/CreateUserForm';
import type { User } from '@/types/api.types';

export default function HomePage() {
  const { data, isLoading, isError, error } = useGet<User[]>(['users'], '/users');
  const users = data?.data ?? [];
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="mx-auto max-w-3xl py-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Welcome to our Project</h1>
        <p className="text-lg text-gray-600">
          A full-stack app built with React, Spring Boot, and PostgreSQL.
        </p>
      </div>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">Users</h2>
          <Button size="sm" onClick={() => setShowForm(true)}>
            + Add user
          </Button>
        </div>

        {isLoading && <LoadingSpinner />}

        {isError && (
          <p className="text-red-600">
            Failed to load users: {error?.message ?? 'Unknown error'}
          </p>
        )}

        {!isLoading && !isError && users.length === 0 && (
          <p className="text-gray-500">No users found.</p>
        )}

        {users.length > 0 && (
          <ul className="divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white">
            {users.map((user) => (
              <li key={user.id} className="flex items-center justify-between px-4 py-3">
                <div>
                  <p className="font-medium text-gray-900">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                  {user.role.replace('ROLE_', '')}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      {showForm && <CreateUserForm onClose={() => setShowForm(false)} />}
    </div>
  );
}
