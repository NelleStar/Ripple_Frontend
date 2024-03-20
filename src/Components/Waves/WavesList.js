import { useState, useEffect } from "react";

import WaveCard from "./WaveCard";

import RippleApi from "../../apiRipple";

function WavesList() {
    const [ waves, setWaves ] = useState(null);

    useEffect(() => {
        async function fetchWaves() {
            try {
                const wavesData = await RippleApi.getWaves();
                console.log(`WavesData from WavesList:`, wavesData);
                setWaves(wavesData.waves);
            } catch(err) {
                console.error(`Error fetching waves:`, err);
                return err;
            }
        }
        fetchWaves();
    }, []);

    return (
        <div className="waves-list-container">
            <div className="waves-list-content">
                {waves && waves.map((wave) => (
                    <div className="WaveCard" key={wave.waveId}>
                        <WaveCard wave={wave} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default WavesList;