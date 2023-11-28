const adminRoutes = {
    login: '/admin/login',
    logout: '/admin/logout',

    fetchUsers: '/admin/users',
    blockUsers: (id: string) => `/admin/users/action?id=${id}`,

    fetchClubs: '/admin/clubs',
    blockClubs: (id: string) => `/admin/clubs/action?id=${id}`,

    addCoupon: '/admin/coupon',
    getCoupons: '/admin/coupons',
    editCoupon: '/admin/editCoupon',
    deleteCoupon: (id: string) => `/admin/coupon/${id}`,

    dashboardSales: '/admin/dashboardSlotSales',
    dashboardStaticContent: '/admin/dashboardStaticContent',
    dashboardTicketContent: '/admin/dashboardTicketContend'
};

export default adminRoutes;
