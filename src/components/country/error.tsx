import React from "react";
import { useAsyncError } from "react-router-dom";

const ErrorCountryCard: React.FC = () => {
    const error = useAsyncError() as Error;

    return <div style={{
        marginTop: "2rem"
    }} className="container bold">
        Something went wrong!

        <small>
        {error.message}
        </small>
    </div>;
};

export default React.memo(ErrorCountryCard);
