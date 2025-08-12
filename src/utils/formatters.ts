export function formatCrew(crew: string): string {
    if (crew === "unknown") return "Unknown";
    if (crew === "0") return "Droid-operated";
    return crew;
}

export function formatHyperdriveRating(rating: string): string {
    if (rating === "unknown") return "Unknown";
    return rating;
}

export function formatManufacturer(manufacturer: string): string {
    return manufacturer || "Unknown";
}

export function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
}

export function capitalizeFirstLetter(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
}
