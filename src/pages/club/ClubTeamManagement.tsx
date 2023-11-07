import React, { useState, useEffect } from "react";
import NavBarFull from "../../components/club/navbar/NavBarFull";
import TeamManagement from "../../components/club/team/TeamManagement";

const ClubTeamManagement = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.pageYOffset === 0 ? false : true);
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div>
            <NavBarFull color={isScrolled} />
            <TeamManagement />
        </div>
    );

};

export default ClubTeamManagement;
