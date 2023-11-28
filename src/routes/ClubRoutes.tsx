import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import ClubSignUp from "../pages/club/ClubSignUp";
import ClubProtect from "../components/club/ClubProtect";
import ClubProfileHead from "../components/club/headers/ClubProfileHead";
import ClubProfile from "../pages/club/ClubProfile";
import ClubProfileEdit from "../pages/club/ClubProfileEdit";
import ClubBackground from "../pages/club/ClubBackground";
import ClubFixtures from "../pages/club/ClubFixtures";
import ClubNewFixture from "../pages/club/ClubNewFixture";
import ClubTeamManagement from "../pages/club/ClubTeamManagement";
import NotFound from "../pages/NotFound";
import ClubDashboard from "../pages/club/ClubDashboard";

const ClubRoutes = () => {
  return (
    <Routes>
      <Route path='login' element={<LoginPage user='club' />} />
      <Route path='signup' element={<ClubSignUp />} />
      <Route element={<ClubProtect />}>
        <Route path='' element={<ClubDashboard />} />
        <Route element={<ClubProfileHead />}>
          <Route path='profile' element={<ClubProfile />} />
          <Route path='profile/edit' element={<ClubProfileEdit />} />
          <Route path='profile/background' element={<ClubBackground />} />
        </Route>
        <Route path='fixture' element={<ClubFixtures />} />
        <Route path='fixture/newFixture' element={<ClubNewFixture />} />
        <Route path='team' element={<ClubTeamManagement />} />
        <Route path='*' element={<NotFound />} />

      </Route>

    </Routes>
  );
};

export default ClubRoutes;
