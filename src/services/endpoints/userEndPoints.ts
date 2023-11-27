const userRoutes = {
    signUp: '/user/signUp',
    verify: '/user/verify',
    resendOtp: '/user/resendOtp',
    login: '/user/login',
    logout: '/user/logout',

    getProfile: '/user/profile',
    updateProfile: '/user/profile',

    getHome: '/user/home',
    getFixtures: '/user/fixtures',
    search: '/user/search',
    fixtureDetails: '/user/fixtureDetails',
    clubDetails: '/user/clubDetails',

    booking: '/user/booking',

    addToCart: '/user/addToCart',
    getCheckout: '/user/checkout',

    addTicket: '/user/ticket',
    getTickets: '/user/myTickets',
    cancelTicket: '/user/cancelTicket',

    validateCoupon: '/user/validateCoupon',

    review: '/user/review',
    userReview: '/user/userReview',

    followClub: (clubId: string) => `/user/followClub?clubId=${clubId}`,
    notifications: '/user/notifications',
    notificationCount: '/user/notificationCount',
    readNotification: '/user/readNotification'
};

export default userRoutes;
