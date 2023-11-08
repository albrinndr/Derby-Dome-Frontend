const clubRoutes = {
    signUp: '/club/signUp',
    verify: '/club/verify',
    resendOtp: '/club/resendOtp',
    login: '/club/login',
    logout: '/club/logout',

    getProfile: '/club/profile',
    updateProfile: '/club/profile',
    updateBackground: '/club/background',

    getTeamData: '/club/getTeam',
    addManager: '/club/addManager',
    editManager: '/club/editManager',
    addPlayer: '/club/addPlayer',
    editPlayer: '/club/editPlayer',
    deletePlayer: (id: string) => `/club/deletePlayer/${id}`,
    changeXI: (p1Id: string, p2Id: string) => `/club/changeXI/${p1Id}/${p2Id}`
};

export default clubRoutes;