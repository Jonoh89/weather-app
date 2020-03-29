import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from "react";
import "./Search.css";
import Form from "react-bootstrap/Form";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Units } from "./types/Units";

type SearchProps = {
    units: Units,
    setUnits: Dispatch<SetStateAction<Units>>
    onSearch: (city: string) => void
}

function Search ({ units, setUnits, onSearch }: SearchProps) {
    const [ city, setCity ] = useState("sunnyville");
    const onChange = (event: ChangeEvent<HTMLInputElement>) => setCity(event.target.value.toLowerCase());
    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSearch(city);
    };

    return (
        <Form className="Search" onSubmit={onSubmit}>
            <Form.Row>
                <Col xs={6} sm={8}>
                    <Form.Control placeholder="City" type="text" name="city" onChange={onChange}/>
                </Col>
                <Col xs={3} sm={2}>
                    <ToggleButtonGroup type="radio" name="units" defaultValue={units} onChange={setUnits}>
                        <ToggleButton variant="secondary" value="metric">°C</ToggleButton>
                        <ToggleButton variant="secondary" value="imperial">°F</ToggleButton>
                    </ToggleButtonGroup>
                </Col>
                <Col xs={2} sm={2}>
                    <Button variant="primary" type="submit">Search</Button>
                </Col>
            </Form.Row>
        </Form>
    );
}

export default Search;
