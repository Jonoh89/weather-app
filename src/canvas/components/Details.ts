import * as PIXI from "pixi.js";
import gsap from "gsap";
import { SearchResponseData, Weather } from "../../types/responses/SearchResponseData";
import { Units } from "../../types/Units";

class Details extends PIXI.Container {
    private icon: PIXI.Sprite;
    private descriptionText: PIXI.Text;
    private temperatureText: PIXI.Text;

    constructor (data: SearchResponseData, units: Units) {
        super();

        this.icon = this.setIcon(data.weather.main);
        this.descriptionText = this.setDescription(data.weather.description);
        this.temperatureText = this.setTemperature(data.weather.temp, units);
    }

    newData (data: SearchResponseData, units: Units) {
        this.icon = this.setIcon(data.weather.main);
        this.descriptionText = this.setDescription(data.weather.description);
        this.temperatureText = this.setTemperature(data.weather.temp, units);
    }

    private createIcon (texture: PIXI.Texture): PIXI.Sprite {
        const icon = new PIXI.Sprite(texture);
        icon.anchor.set(0.5);
        icon.position.set(-icon.width, 50 + icon.height / 2);
        return icon;
    }

    private createSun (texture: PIXI.Texture): PIXI.Sprite {
        const icon = new PIXI.Sprite(texture);
        icon.anchor.set(0.5);
        icon.position.set(-icon.width, 50 + icon.height / 2);
        gsap.to(icon, { duration: 1000, rotation: 360, repeat: -1, ease: "linear" });
        return icon;
    }

    private setIcon (weather: Weather): PIXI.Sprite {
        if (this.icon) this.removeChild(this.icon);

        let icon;
        switch (weather) {
            case "Clear":
                icon = this.addChild(this.createSun(new PIXI.Texture(PIXI.utils.TextureCache["sun"])));
                break;
            case "Snow":
                icon = this.addChild(this.createIcon(new PIXI.Texture(PIXI.utils.TextureCache["snow"])));
                break;
            default:
                icon = this.addChild(this.createIcon(new PIXI.Texture(PIXI.utils.TextureCache["clouds"])));
        }
        gsap.to(icon, { x: 20 + icon.width / 2, duration: 1 });
        return icon;
    }

    private setDescription (description: string): PIXI.Text {
        if (this.descriptionText) this.removeChild(this.descriptionText);

        const text = new PIXI.Text(description);
        text.position.set(20, this.icon.y + this.icon.height / 2 + 20);
        return this.addChild(text);
    }

    private setTemperature (temp: number, units: Units) {
        if (this.temperatureText) this.removeChild(this.temperatureText);
        const unitSymbol = units === "metric" ? "°C" : "°F";
        const text = new PIXI.Text(`${temp}${unitSymbol}`, { fontSize: 40 });
        text.anchor.set(1, 0);
        text.position.set(640 - 30, 50);
        return this.addChild(text);
    }
}

export default Details;
