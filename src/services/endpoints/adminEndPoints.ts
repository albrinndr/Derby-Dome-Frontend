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
    dashboardTicketContent: '/admin/dashboardTicketContend',

    allFixtures: '/admin/allFixtures',
    allTickets: '/admin/allTickets',

    getAllOffers: '/admin/allOffers',
    addNewOffer: '/admin/addOffer',
    editOffer: '/admin/editOffer',
    deleteOffer: (id: string) => `/admin/deleteOffer/${id}`
};

export default adminRoutes;
