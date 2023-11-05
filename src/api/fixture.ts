import Api from "../services/axios";
import fixtureRoutes from "../services/endpoints/fixtureEndPoints";
import errorHandle from "./error";

export const getFixtureDateContent = async (date: Date) => {
    try {
        const response = await Api.post(fixtureRoutes.getFixtureFormContent, { date });
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
};


export const newFixture = async (fixtureForm: FormData) => {
    try {
        const response = await Api.post(fixtureRoutes.createNewFixture, fixtureForm);
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
};