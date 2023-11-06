const fixtureRoutes = {
    getFixtureFormContent: '/club/fixtureFormContent',
    createNewFixture: '/club/createNewFixture',

    getClubFixture: '/club/getFixtures',
    cancelFixture: (id: string) => `/club/cancelFixture/${id}`
};
export default fixtureRoutes;
