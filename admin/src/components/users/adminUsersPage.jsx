import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { fetchUsers, selectUserLoading, selectUsers } from '../../features/users/usersSlice';
import { selectUser } from '../../features/auth/authSlice';
import { cn } from '@/lib/utils';

export default function AdminUsersPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector(selectUser);
  const users = useSelector(selectUsers);
  const isLoading = useSelector(selectUserLoading);
  const [filter, setFilter] = useState({ role: 'all', search: '' });
  const pathname = useLocation().pathname
 

  useEffect(() => {
    if (sessionUser?.role !== 'admin') navigate('/unauthorized');
    dispatch(fetchUsers());
  }, [dispatch, sessionUser, navigate, pathname]);

  const filteredUsers = users.filter((user) => {
    console.log(user);
    const matchesRole = filter.role === 'all' || user.role === filter.role;
    const matchesSearch = user.email.toLowerCase().includes(filter.search.toLowerCase());
    return matchesRole && matchesSearch;
  });

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-purple-700">Users</h1>
          <p className="text-sm text-gray-500">Manage buyers, sellers, and admins on the platform.</p>
        </div>
        <Link to="/admin/users/create" className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-lg shadow">
          + Add User
        </Link>
      </div>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by email"
          className="border border-gray-300 rounded px-3 py-2 w-64"
          value={filter.search}
          onChange={(e) => setFilter({ ...filter, search: e.target.value })}
        />

        <select
          className="border border-gray-300 rounded px-3 py-2"
          value={filter.role}
          onChange={(e) => setFilter({ ...filter, role: e.target.value })}
        >
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
          <option value="staff">Staff</option>
        </select>
      </div>

      <div className="overflow-auto rounded-lg border shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Company</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan="6" className="text-center py-6">Loading users...</td></tr>
            ) : filteredUsers.length === 0 ? (
              <tr><td colSpan="6" className="text-center py-6">No users found.</td></tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.id} className="border-t">
                  <td className="p-3">{user.firstName} {user.lastName}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">
                    <span className={cn("px-2 py-1 text-xs font-semibold rounded-full", {
                      'bg-purple-100 text-purple-700': user.role === 'admin',
                      'bg-blue-100 text-blue-700': user.role === 'buyer',
                      'bg-green-100 text-green-700': user.role === 'seller',
                      'bg-yellow-100 text-yellow-700': user.role === 'staff',
                    })}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-3">{user.company?.name || '-'}</td>
                  <td className="p-3">{user.status || 'Active'}</td>
                  <td className="p-3 text-right">
                    <Link to={`/admin/users/${user.id}`} className="text-sm text-blue-600 hover:underline mr-3">View</Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
