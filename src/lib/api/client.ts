import { initClient } from "@ts-rest/core";
import { starshipContract } from "./starships";

export const client = initClient(starshipContract, {
    baseUrl: "http://www.swapi.tech",
    baseHeaders: {},
});
