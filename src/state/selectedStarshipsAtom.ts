import { atom } from "jotai";
import { StarshipDetails } from "@/lib/types";

export const selectedStarshipsAtom = atom<StarshipDetails[]>([]);
