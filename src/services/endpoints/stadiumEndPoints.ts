const stadiumRoutes = {

    banners: '/admin/banner',
    bannerUpdate: '/admin/banner',

    matchTime: '/admin/matchTime',
    getAllTimes: 'admin/matchTimes',
    updateMatchTimePrice: '/admin/updateTimePrice',
    deleteMatchTimes: (id: string) => `/admin/deleteMatchPrice/${id}`,

    getSeatPrice:'/admin/getSeats',
    setSeatPrice:'/admin/seatPrice'


};
export default stadiumRoutes;
