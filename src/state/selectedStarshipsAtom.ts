import { atom } from "jotai";
import { Starship } from "@/lib/types";

export const selectedStarshipsAtom = atom<Starship[]>([]);
