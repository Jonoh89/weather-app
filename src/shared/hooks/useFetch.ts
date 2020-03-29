import { useEffect, useState } from "react";

export default function useFetch<T> (url: string) {
    const [ response, setResponse ] = useState<T>();
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(url);
            const json = await res.json();
            setResponse(json);
        };
        fetchData();
    }, [ url ]);
    return response;
};
