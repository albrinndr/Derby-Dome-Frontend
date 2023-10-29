const adminRoutes = {
    login: '/admin/login',
    logout: '/admin/logout',

    fetchUsers: '/admin/users',
    blockUsers: (id: string) => `/admin/users/action?id=${id}`
};

export default adminRoutes;
