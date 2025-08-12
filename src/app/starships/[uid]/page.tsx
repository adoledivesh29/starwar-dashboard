"use client";

import { useParams, useRouter } from "next/navigation";
import { useStarshipDetails } from "@/hooks/useStarships";
import { StarshipModal } from "@/components/StarshipModal";
import { Loader } from "@/components/Loader";

export default function StarshipPage() {
    const params = useParams();
    const router = useRouter();
    const uid = params.uid as string;

    const { data: details, isLoading, isError } = useStarshipDetails(uid);

    const handleClose = () => {
        router.push("/");
    };

    if (isLoading) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-xl p-8">
                    <Loader />
                </div>
            </div>
        );
    }

    if (isError || !details?.result?.properties) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-red-600 mb-2">Error Loading Starship</h2>
                        <p className="text-gray-600 mb-4">
                            Failed to load starship details. Please try again later.
                        </p>
                        <button
                            onClick={handleClose}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <StarshipModal
            starship={details.result.properties}
            isOpen={true}
            onClose={handleClose}
        />
    );
}
