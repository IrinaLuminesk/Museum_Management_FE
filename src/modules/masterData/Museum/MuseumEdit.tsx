import { useSearchParams } from "react-router-dom";

function MuseumEdit() {
    const [searchParams] = useSearchParams();

    const museumId = searchParams.get("MuseumId");

    const isEdit = museumId !== null && museumId !== "";

    return (
        <div>
            <h1>{isEdit ? "Edit Museum" : "Create Museum"}</h1>

            {isEdit ? (
                <p>Editing Museum ID: {museumId}</p>
            ) : (
                <p>Creating a new museum</p>
            )}
        </div>
    );
}

export default MuseumEdit;
