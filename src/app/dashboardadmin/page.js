"use client";

import { useState, useEffect } from "react";
import AdminUploadPDF from '@/components/AdminUploadPDF';

export default function DashboardAdmin() {
  // Estados principales
  const [users, setUsers] = useState([]);
  const [plans, setPlans] = useState([]);
  const [stats, setStats] = useState({ total: 0, withPlan: 0, withoutPlan: 0, totalAsesorias: 0 });
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [activeTab, setActiveTab] = useState('users');
  const [loading, setLoading] = useState(true);
  
  // Estados para filtros y búsqueda
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    role: 'all'
  });

  // Estados para modales y formularios
  const [showUserModal, setShowUserModal] = useState(false);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [editingPlan, setEditingPlan] = useState(null);

  // Estados para formularios
  const [userForm, setUserForm] = useState({
    name: '', email: '', phone: '', password: '', role: 'user', planId: ''
  });
  const [planForm, setPlanForm] = useState({
    name: '', description: '', duration: '', price: ''
  });
  const [uploadData, setUploadData] = useState({
    title: '', tipo: 'entrenamiento', pdf: null
  });

  // Funciones de carga de datos
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/users');
      const data = await response.json();
      
      if (data.users) {
        setUsers(data.users);
        setStats({
          total: data.users.length,
          withPlan: data.users.filter(u => u.planId).length,
          withoutPlan: data.users.filter(u => !u.planId).length,
          totalAsesorias: data.users.reduce((acc, u) => acc + (u.asesorias?.length || 0), 0)
        });
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPlans = async () => {
    try {
      const response = await fetch('/api/admin/plans');
      const data = await response.json();
      if (data.plans) setPlans(data.plans);
    } catch (error) {
      console.error('Error fetching plans:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchPlans();
  }, []);

  // Funciones de gestión de usuarios
  const handleEditUser = (user) => {
    setEditingUser(user);
    setUserForm({
      name: user.name,
      email: user.email,
      phone: user.phone || '',
      password: '',
      role: user.role,
      planId: user.planId || ''
    });
    setShowUserModal(true);
  };

  const handleSaveUser = async (e) => {
    e.preventDefault();
    try {
      const url = editingUser ? `/api/admin/${editingUser.id}` : '/api/admin/users';
      const method = editingUser ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userForm)
      });

      if (response.ok) {
        await fetchUsers();
        setShowUserModal(false);
        resetUserForm();
        alert(editingUser ? 'Usuario actualizado' : 'Usuario creado');
      } else {
        const error = await response.json();
        alert('Error: ' + error.message);
      }
    } catch (error) {
      console.error('Error saving user:', error);
      alert('Error al guardar usuario');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!confirm('¿Estás seguro de eliminar este usuario?')) return;
    
    try {
      const response = await fetch(`/api/admin/${userId}`, { method: 'DELETE' });
      if (response.ok) {
        await fetchUsers();
        alert('Usuario eliminado');
      } else {
        alert('Error al eliminar usuario');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // Funciones de gestión de planes
  const handleSavePlan = async (e) => {
    e.preventDefault();
    try {
      const url = editingPlan ? `/api/admin/plans/${editingPlan.id}` : '/api/admin/plans';
      const method = editingPlan ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(planForm)
      });

      if (response.ok) {
        await fetchPlans();
        setShowPlanModal(false);
        resetPlanForm();
        alert(editingPlan ? 'Plan actualizado' : 'Plan creado');
      } else {
        alert('Error al guardar plan');
      }
    } catch (error) {
      console.error('Error saving plan:', error);
    }
  };

  const handleDeletePlan = async (planId) => {
    if (!confirm('¿Estás seguro de eliminar este plan?')) return;
    
    try {
      const response = await fetch(`/api/admin/plans/${planId}`, { method: 'DELETE' });
      if (response.ok) {
        await fetchPlans();
        alert('Plan eliminado');
      }
    } catch (error) {
      console.error('Error deleting plan:', error);
    }
  };

  // Funciones auxiliares
  const resetUserForm = () => {
    setUserForm({ name: '', email: '', phone: '', password: '', role: 'user', planId: '' });
    setEditingUser(null);
  };

  const resetPlanForm = () => {
    setPlanForm({ name: '', description: '', duration: '', price: '' });
    setEditingPlan(null);
  };

  const filteredUsers = users.filter(user => {
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      if (!user.name.toLowerCase().includes(searchLower) && 
          !user.email.toLowerCase().includes(searchLower)) return false;
    }
    if (filters.role !== 'all' && user.role !== filters.role) return false;
    if (filters.status === 'with-plan' && !user.planId) return false;
    if (filters.status === 'without-plan' && user.planId) return false;
    return true;
  });

  const handleFirebasePdfUpload = async (e) => {
    e.preventDefault();
    
    if (!selectedUser || !uploadData.pdf || !uploadData.title) {
      alert('Completa todos los campos');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('file', uploadData.pdf);
    formData.append('usuarioId', selectedUser.id);
    formData.append('tipoPlan', uploadData.tipo);
    formData.append('titulo', uploadData.title);

    try {
      const response = await fetch('/api/upload-plan', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (response.ok) {
        alert('✅ PDF subido exitosamente a Firebase');
        setUploadData({ title: '', tipo: 'entrenamiento', pdf: null });
        fetchUsers();
      } else {
        alert(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('❌ Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Administrativo</h1>
          <p className="text-gray-600">Gestión de usuarios, planes y asesorías</p>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="text-2xl">👥</span>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Usuarios</dt>
                    <dd className="text-lg font-medium text-gray-900">{stats.total}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="text-2xl">✅</span>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Con Plan</dt>
                    <dd className="text-lg font-medium text-gray-900">{stats.withPlan}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="text-2xl">❌</span>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Sin Plan</dt>
                    <dd className="text-lg font-medium text-gray-900">{stats.withoutPlan}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="text-2xl">📄</span>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Asesorías</dt>
                    <dd className="text-lg font-medium text-gray-900">{stats.totalAsesorias}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('users')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'users' 
                    ? 'border-green-500 text-green-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                👥 Usuarios
              </button>
              <button
                onClick={() => setActiveTab('plans')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'plans'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                📋 Planes
              </button>
            </nav>
          </div>
        </div>

        {/* Contenido de Usuarios */}
        {activeTab === 'users' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Lista de Usuarios */}
            <div className="lg:col-span-2">
              <div className="bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Lista de Usuarios</h3>
                    <button
                      onClick={() => { resetUserForm(); setShowUserModal(true); }}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      ➕ Nuevo Usuario
                    </button>
                  </div>

                  {/* Filtros */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <input
                      type="text"
                      placeholder="Buscar por nombre o email..."
                      value={filters.search}
                      onChange={(e) => setFilters({...filters, search: e.target.value})}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <select
                      value={filters.role}
                      onChange={(e) => setFilters({...filters, role: e.target.value})}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="all">Todos los roles</option>
                      <option value="user">Usuario</option>
                      <option value="admin">Administrador</option>
                    </select>
                    <select
                      value={filters.status}
                      onChange={(e) => setFilters({...filters, status: e.target.value})}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="all">Todos los estados</option>
                      <option value="with-plan">Con plan</option>
                      <option value="without-plan">Sin plan</option>
                    </select>
                  </div>

                  {/* Tabla de usuarios */}
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Usuario</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Plan</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">PDFs</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredUsers.map((user) => (
                          <tr 
                            key={user.id}
                            onClick={() => setSelectedUser(user)}
                            className={`cursor-pointer transition-colors ${
                              selectedUser?.id === user.id ? 'bg-blue-50' : 'hover:bg-gray-50'
                            }`}
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div>
                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                <div className="text-sm text-gray-500">{user.email}</div>
                                <div className="text-xs text-gray-400">
                                  {user.role === 'admin' && <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full">Admin</span>}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                user.plan ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                              }`}>
                                {user.plan ? user.plan.name : 'Sin plan'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm text-gray-900">{user.asesorias?.length || 0} PDFs</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <div className="flex space-x-2">
                                <button
                                  onClick={(e) => { e.stopPropagation(); handleEditUser(user); }}
                                  className="text-blue-600 hover:text-blue-900"
                                >
                                  ✏️
                                </button>
                                <button
                                  onClick={(e) => { e.stopPropagation(); handleDeleteUser(user.id); }}
                                  className="text-red-600 hover:text-red-900"
                                >
                                  🗑️
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Panel lateral de usuario seleccionado */}
            <div className="lg:col-span-1">
              {selectedUser ? (
                <div className="space-y-6">
                  {/* Información del usuario */}
                  <div className="bg-white shadow rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">👤 Usuario Seleccionado</h3>
                    <div className="space-y-2">
                      <p><strong>Nombre:</strong> {selectedUser.name}</p>
                      <p><strong>Email:</strong> {selectedUser.email}</p>
                      <p><strong>Teléfono:</strong> {selectedUser.phone || 'No proporcionado'}</p>
                      <p><strong>Rol:</strong> {selectedUser.role}</p>
                      <p><strong>Plan:</strong> {selectedUser.plan?.name || 'Sin plan'}</p>
                      <p><strong>PDFs:</strong> {selectedUser.asesorias?.length || 0}</p>
                    </div>
                  </div>

                  {/* Gestión de PDFs con Firebase */}
                  <AdminUploadPDF 
                    selectedUser={selectedUser} 
                    onUploadSuccess={() => {
                      fetchUsers(); // Refrescar datos cuando se sube un PDF exitosamente
                    }} 
                  />

                  {/* PDFs existentes del usuario */}
                  <div className="bg-white rounded-lg shadow p-6">
                    <h4 className="text-lg font-semibold mb-4">
                      📄 PDFs Asignados ({selectedUser.asesorias?.length || 0})
                    </h4>
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {selectedUser.asesorias?.map((asesoria) => (
                        <div key={asesoria.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border">
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{asesoria.title}</p>
                            <div className="flex items-center space-x-3 text-sm text-gray-500 mt-1">
                              <span className="capitalize bg-gray-200 px-2 py-1 rounded">
                                {asesoria.tipo}
                              </span>
                              <span>📅 {new Date(asesoria.createdAt).toLocaleDateString('es-ES')}</span>
                              <span>📁 {asesoria.filename || 'Sin nombre'}</span>
                            </div>
                          </div>
                          <div className="flex space-x-2 ml-4">
                            <a
                              href={asesoria.pdfUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm transition-colors"
                            >
                              👁️ Ver PDF
                            </a>
                            <a
                              href={asesoria.pdfUrl}
                              download
                              className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm transition-colors"
                            >
                              📥 Descargar
                            </a>
                          </div>
                        </div>
                      ))}
                      
                      {(!selectedUser.asesorias || selectedUser.asesorias.length === 0) && (
                        <div className="text-center py-8 text-gray-500">
                          <div className="text-4xl mb-2">📭</div>
                          <p>No tiene PDFs asignados</p>
                          <p className="text-sm">Usa el formulario de arriba para subir el primer PDF</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white shadow rounded-lg p-6">
                  <div className="text-center text-gray-500">
                    <div className="text-6xl mb-4">👆</div>
                    <p>Selecciona un usuario de la lista para ver su información y gestionar sus PDFs</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Contenido de Planes */}
        {activeTab === 'plans' && (
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Gestión de Planes</h3>
                <button
                  onClick={() => { resetPlanForm(); setShowPlanModal(true); }}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  ➕ Nuevo Plan
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {plans.map((plan) => (
                  <div key={plan.id} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">{plan.name}</h4>
                    <p className="text-gray-600 text-sm mb-3">{plan.description}</p>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">Duración: {plan.duration}</span>
                      <span className="font-medium text-green-600">${plan.price}</span>
                    </div>
                    <div className="mt-3 flex space-x-2">
                      <button
                        onClick={() => {
                          setEditingPlan(plan);
                          setPlanForm({
                            name: plan.name,
                            description: plan.description,
                            duration: plan.duration,
                            price: plan.price
                          });
                          setShowPlanModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-900 text-sm"
                      >
                        ✏️ Editar
                      </button>
                      <button
                        onClick={() => handleDeletePlan(plan.id)}
                        className="text-red-600 hover:text-red-900 text-sm"
                      >
                        🗑️ Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Modal de Usuario */}
        {showUserModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {editingUser ? 'Editar Usuario' : 'Crear Usuario'}
                </h3>
                <form onSubmit={handleSaveUser}>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Nombre"
                      value={userForm.name}
                      onChange={(e) => setUserForm({...userForm, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={userForm.email}
                      onChange={(e) => setUserForm({...userForm, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      required
                    />
                    <input
                      type="tel"
                      placeholder="Teléfono (opcional)"
                      value={userForm.phone}
                      onChange={(e) => setUserForm({...userForm, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="password"
                      placeholder={editingUser ? "Nueva contraseña (opcional)" : "Contraseña"}
                      value={userForm.password}
                      onChange={(e) => setUserForm({...userForm, password: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      required={!editingUser}
                    />
                    <select
                      value={userForm.role}
                      onChange={(e) => setUserForm({...userForm, role: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="user">Usuario</option>
                      <option value="admin">Administrador</option>
                    </select>
                    <select
                      value={userForm.planId}
                      onChange={(e) => setUserForm({...userForm, planId: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="">Sin plan</option>
                      {plans.map(plan => (
                        <option key={plan.id} value={plan.id}>{plan.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex justify-end space-x-2 mt-6">
                    <button
                      type="button"
                      onClick={() => setShowUserModal(false)}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      {editingUser ? 'Actualizar' : 'Crear'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Plan */}
        {showPlanModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {editingPlan ? 'Editar Plan' : 'Crear Plan'}
                </h3>
                <form onSubmit={handleSavePlan}>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Nombre del plan"
                      value={planForm.name}
                      onChange={(e) => setPlanForm({...planForm, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      required
                    />
                    <textarea
                      placeholder="Descripción"
                      value={planForm.description}
                      onChange={(e) => setPlanForm({...planForm, description: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      rows="3"
                    />
                    <input
                      type="text"
                      placeholder="Duración (ej: 1 mes, 3 meses)"
                      value={planForm.duration}
                      onChange={(e) => setPlanForm({...planForm, duration: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="number"
                      placeholder="Precio"
                      value={planForm.price}
                      onChange={(e) => setPlanForm({...planForm, price: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div className="flex justify-end space-x-2 mt-6">
                    <button
                      type="button"
                      onClick={() => setShowPlanModal(false)}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      {editingPlan ? 'Actualizar' : 'Crear'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
