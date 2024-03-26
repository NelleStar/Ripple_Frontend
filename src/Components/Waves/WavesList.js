import { useState, useEffect, useContext } from "react";
import userContext from "../../userContext";

import WaveCard from "./WaveCard";
import NewWaveForm from "../../Forms/WaveForm/NewWaveForm";

import RippleApi from "../../apiRipple";

import "./WaveList.css"

function WavesList() {
    const [ waves, setWaves ] = useState(null);
    const { username } = useContext(userContext);
    
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

    const handleDeleteWave = async(waveId) => {
      console.log(`handleDeleteWave:`, waveId)
      try {
        await RippleApi.deleteWave(waveId);
        const wavesData = await RippleApi.getWaves();
        console.log(`handleDeleteWave wavesData:`, wavesData)
        setWaves(wavesData.waves)
      } catch(err) {
        console.error(`Error deleting wave:`, err)
      }
    }

    const addWave = (wave) => {
      setWaves([...waves, wave]);
    }

    return (
      <div className="waves-list-container">
        <div className="waves-list-content">
          <div className="waves-list-title">
            <h1>Waves</h1>
          </div>
          <div className="waves-list-new-form">
            <NewWaveForm addWave={addWave}/>
          </div>
          <div className="waves-list">
            {waves &&
              waves.map((wave) => (
                <div className="WaveCard" key={wave.waveId}>
                  <WaveCard wave={wave} loggedInUser={username}/>
                  {/* <button onClick={() => handleDeleteWave(wave.waveId)}>
                    Delete
                  </button>
                  <button onClick={() => console.log("Navigate to edit form")}>
                    Edit
                  </button> */}
                </div>
              ))}
          </div>
        </div>
      </div>
    );
}

export default WavesList;