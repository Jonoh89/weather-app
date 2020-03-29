import * as PIXI from "pixi.js";
import gsap from "gsap";
import { SearchResponseData, Weather } from "../../types/responses/SearchResponseData";

class Background extends PIXI.Container {
    private backgroundGraphics: PIXI.Graphics;

    constructor (data: SearchResponseData) {
        super();
        this.backgroundGraphics = this.createBackground();
        this.setWeather(data.weather.main);
    }

    private createBackground () {
        const graphics = new PIXI.Graphics();
        graphics.beginFill(PIXI.utils.string2hex("#eeeeee"));
        graphics.drawRect(0, 0, 640, 640);
        graphics.endFill();
        return this.addChild(graphics);
    }

    setWeather (weather: Weather) {
        switch (weather) {
            case "Clear":
                gsap.to(this.backgroundGraphics, { pixi: { tint: "#3671e9" }, duration: 1 });
                break;
            case "Snow":
                gsap.to(this.backgroundGraphics, { pixi: { tint: "#ffffff" }, duration: 1 });
                break;
            default:
                gsap.to(this.backgroundGraphics, { pixi: { tint: "#888888" }, duration: 1 });
        }
    }
}

export default Background;
