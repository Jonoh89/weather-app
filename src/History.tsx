import React, { useState } from "react";
import "./History.css";
import useFetch from "./shared/hooks/useFetch";
import Weather from "./Weather";
import { SearchResponseData } from "./types/responses/SearchResponseData";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import { Units } from "./types/Units";

type HistoryProps = {
    units: Units,
    history: string[]
}

function History ({ units, history }: HistoryProps) {
    const [ activeHistory, setActiveHistory ] = useState(history[0]);
    const data = useFetch<SearchResponseData>(`/api/search?city=${activeHistory}&units=${units}`);

    const buttons = history.map(city => (
        <Button className="History_button" size="sm" key={city} active={activeHistory === city} variant="secondary"
                onClick={() => setActiveHistory(city)}>{city}</Button>
    ));

    return (
        <div className="History">
            <ButtonGroup aria-label="Basic example">
                {buttons}
            </ButtonGroup>
            {data ? <Weather data={data} units={units}/> : null}
        </div>
    );
}

export default History;
