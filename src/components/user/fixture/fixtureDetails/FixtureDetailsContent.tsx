
import FixtureDetailsHead from "./FixtureDetailsHead";
import FixtureDetails from "./FixtureDetails";

interface Fixture {
    clubId: {
        name: string,
        image: string;
        team: {
            players: [{
                name: string;
                image: string;
                _id: string;
                startingXI: boolean;
            }];
        };
    };
    awayTeamId?: {
        team: {
            players: [{
                name: string;
                image: string;
                _id: string;
                startingXI: boolean;
            }];
        };
    };
    awayTeam: string;
    awayTeamLogo: string,
    date: string;
    time: string,
    title: string;
    _id: string;
    poster: string;
}

interface FixtureContent {
    fixtureData: Fixture;
}

const FixtureContent: React.FC<FixtureContent> = ({ fixtureData }) => {
    return (
        <div>
            {fixtureData && <>
                <FixtureDetailsHead home={fixtureData.clubId.name} away={fixtureData.awayTeam} />
                <FixtureDetails fixture={fixtureData} />
            </>}
        </div>
    );
};

export default FixtureContent;
