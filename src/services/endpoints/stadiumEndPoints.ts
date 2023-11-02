const stadiumRoutes = {

    banners: '/admin/banner',
    bannerUpdate: '/admin/banner',

    matchTime: '/admin/matchTime',
    getAllTimes: 'admin/matchTimes',
    updateMatchTimePrice: '/admin/updateTimePrice',
    deleteMatchTimes: (id: string) => `/admin/deleteMatchPrice/${id}`


};
export default stadiumRoutes;
