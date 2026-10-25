import type { RouteObject } from "react-router-dom";
import LoadingError from "../../scenes/global/LoadingError";
import Loading from "../../scenes/global/Loading";

const masterdataRoutes: RouteObject[] = [
    {
        path: "Masterdata/Museum",
        errorElement: <LoadingError />,
        HydrateFallback: Loading,
        lazy: async () => {
            const { default: MuseumSearch } = await import(
                "./Museum/MuseumSearch"
            );

            return { Component: MuseumSearch };
        },
    },
    {
        path: "Masterdata/Museum/Edit",
        errorElement: <LoadingError />,
        HydrateFallback: Loading,
        lazy: async () => {
            const { default: MuseumEdit } = await import(
                "./Museum/MuseumEdit"
            );

            return { Component: MuseumEdit };
        },
    },
    {
        path: "Masterdata/Museum/Create",
        errorElement: <LoadingError />,
        HydrateFallback: Loading,
        lazy: async () => {
            const { default: MuseumCreate } = await import(
                "./Museum/MuseumEdit"
            );

            return { Component: MuseumCreate };
        },
    },
];

export default masterdataRoutes;