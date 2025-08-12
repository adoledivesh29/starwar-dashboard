import { initContract } from "@ts-rest/core";
import { Starship, ApiResponse, StarshipDetails } from "../types";

const c = initContract();

export const starshipContract = c.router({
    getStarships: {
        method: "GET",
        path: "/api/starships",
        query: c.type<{ search?: string; page?: number; limit?: number }>(),
        responses: {
            200: c.type<ApiResponse<Starship>>(),
        },
    },
    getStarshipDetails: {
        method: "GET",
        path: "/api/starships/:uid",
        responses: {
            200: c.type<{ result: { properties: StarshipDetails } }>(),
        },
    },
});
