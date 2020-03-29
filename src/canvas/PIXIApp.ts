import * as PIXI from "pixi.js";
import { SearchResponseData } from "../types/responses/SearchResponseData";
import Background from "./components/Background";
import Location from "./components/Location";
import Details from "./components/Details";
import { Units } from "../types/Units";
import { PixiPlugin } from "gsap/PixiPlugin";
import gsap from "gsap";
gsap.registerPlugin(PixiPlugin);
PixiPlugin.registerPIXI(PIXI);


type PIXIAppOptions = {
    autoStart?: boolean;
    width?: number;
    height?: number;
    view?: HTMLCanvasElement;
    backgroundColor?: number;
}

class PIXIApp extends PIXI.Application {
    private background: Background;
    private location: Location;
    private details: Details;

    constructor (options: PIXIAppOptions, data: SearchResponseData, units: Units) {
        super(options);
        this.background = this.stage.addChild(new Background(data));
        this.location = this.stage.addChild(new Location(data));
        this.details = this.stage.addChild(new Details(data, units));
    }

    setData (data: SearchResponseData, units: Units) {
        this.background.setWeather(data.weather.main);
        this.location.setLocation(data.city, data.country);
        this.details.newData(data, units);
    }
}

export default PIXIApp;
