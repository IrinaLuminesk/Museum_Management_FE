import { APIResponse_Model, Museum_model } from "../../api/api-client"
import { _MuseumService } from "../../api/apiClient";
import { useState } from "react";
const Dashboard = () => {

    const [result, setResult] = useState<APIResponse_Model | null>(null);
    async function Search() {
        const searchTerms: Museum_model = new Museum_model(); 
        const response = await _MuseumService.mUSEUM_SEARCH(searchTerms);
        setResult(response);
    }
    return (
        <>
            <div className="dashboard">
                <button onClick={Search}>
                    hello
                </button>
                {
                    result == null ?
                        (
                            <div>
                                There are nothing
                            </div>
                        ) : (
                            <div>
                                {JSON.stringify(result.result)}
                            </div>
                        )
                }

            </div>
        </>
    )
}

export default Dashboard