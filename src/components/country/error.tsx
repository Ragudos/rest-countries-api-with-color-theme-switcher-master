import React from "react";
import { useAsyncError } from "react-router-dom";


const ErrorCountryCard: React.FC = () => {
    const error = useAsyncError() as Error;

    return (
        <div>{error.message}</div>
    );
};

export default React.memo(ErrorCountryCard);