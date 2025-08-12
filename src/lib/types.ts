export type Starship = {
    uid: string;
    name: string;
    url: string;
};

export type StarshipDetails = {
    uid: string;
    name: string;
    model: string;
    manufacturer: string;
    crew: string;
    hyperdrive_rating: string;
    cost_in_credits: string;
    length: string;
    max_atmosphering_speed: string;
    passengers: string;
    cargo_capacity: string;
    consumables: string;
    vehicle_class: string;
    pilots: string[];
    films: string[];
    created: string;
    edited: string;
};

export type StarshipApiResponse = {
    message: string;
    result: {
        properties: StarshipDetails;
        description: string;
        _id: string;
        uid: string;
        __v: number;
    };
};

export type ApiResponse<T> = {
    message: string;
    total_records: number;
    total_pages: number;
    previous: string | null;
    next: string | null;
    apiVersion: string;
    results: T[];
    social?: {
        discord: string;
        reddit: string;
    };
    support?: {
        contact: string;
    };
    timestamp: string;
};
