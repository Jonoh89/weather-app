import React, { useEffect, useRef } from "react";
import "./Weather.css";
import * as PIXI from "pixi.js";
import PIXIApp from "./canvas/PIXIApp";
import { SearchResponseData } from "./types/responses/SearchResponseData";

import SunImageUrl from "./canvas/assets/sun.webp";
import SnowyImageUrl from "./canvas/assets/snowy.webp";
import PartlySunnyImageUrl from "./canvas/assets/partly_sunny.webp";
import { Units } from "./types/Units";

let lodaing = false;
let pixiApp: PIXIApp;

const assets = [
    [ { name: "sun", url: SunImageUrl } ],
    [ { name: "snow", url: SnowyImageUrl } ],
    [ { name: "clouds", url: PartlySunnyImageUrl } ],
];

function Weather ({ data, units }: { data: SearchResponseData, units: Units }) {
    const canvasContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!pixiApp && canvasContainer && !lodaing) {
            lodaing = true;
            PIXI.Loader.shared.add(assets).load(() => {
                pixiApp = new PIXIApp({
                    height: 640,
                    width: 640,
                    autoStart: true,
                    backgroundColor: 0xffffff
                }, data, units);
                if (canvasContainer?.current) canvasContainer.current.appendChild(pixiApp.view);
                // @ts-ignore
                window.pa = pixiApp;
            });
        } else {
            if (canvasContainer?.current && pixiApp) canvasContainer.current.appendChild(pixiApp.view);
            if (data) pixiApp.setData(data, units);
        }
    }, [ data, units ]);

    return (
        <div className={"Weather"} ref={canvasContainer}>
        </div>
    );
}

export default Weather;
