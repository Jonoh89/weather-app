import * as PIXI from "pixi.js";
import { SearchResponseData } from "../../types/responses/SearchResponseData";

export default class Location extends PIXI.Container {
    public name = "location";
    private cityText: PIXI.Text;
    private countryText: PIXI.Text;

    constructor (data: SearchResponseData) {
        super();

        this.cityText = this.createCityText();
        this.countryText = this.createCountryText();
        this.setLocation(data.city, data.country)
    }

    private createCityText () {
        const text = new PIXI.Text("", { fill: "#000000" });
        text.position.set(20, 40);
        text.anchor.set(0, 1);
        text.name = "city";
        return this.addChild(text);
    }

    private createCountryText () {
        const text = new PIXI.Text("", { fill: "#616161", fontSize: 18 });
        text.anchor.set(0, 1);
        text.position.set(20, 40);
        text.name = "country";
        return this.addChild(text);
    }

    public setLocation (city: string, country: string) {
        this.cityText.text = city;
        this.countryText.text = country;
        this.countryText.x = this.cityText.x + this.cityText.width + 10;
    }
}
