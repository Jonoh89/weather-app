import React, { Dispatch, SetStateAction, useState } from "react";
import useFetch from "./shared/hooks/useFetch";
import Search from "./Search";
import "./App.css";
import Weather from "./Weather";
import { SearchResponseData } from "./types/responses/SearchResponseData";
import { Units } from "./types/Units";

type HomeProps = {
    units: Units,
    history: string[],
    setUnits: Dispatch<SetStateAction<Units>>
    setHistory: Dispatch<SetStateAction<string[]>>
}

function Home ({ units, setUnits, history, setHistory }: HomeProps) {
    const [ search, setSearch ] = useState("sunnyville");
    const data = useFetch<SearchResponseData>(`/api/search?city=${search}&units=${units}`);

    const onSearch = (city: string) => {
        setSearch(city);
        setHistory([ city, ...history.slice(0, 4) ]);
    };

    return (
        <div className="Home">
            <Search units={units} setUnits={setUnits} onSearch={onSearch}/>
            {data ? <Weather data={data} units={units}/> : null}
        </div>
    );
}

export default Home;
