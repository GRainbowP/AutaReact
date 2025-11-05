import { useRef, useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import szary from './assets/szary.png'
import czerwony from './assets/czerwony.png'
import granatowy from './assets/granatowy.png'
import zielony from './assets/zielony.png'
import zolty from './assets/zolty.png'

function App() {
  const lakierSelected = useRef(null);
  const rimsSelected = useRef(null);
  const parkingSensorsCheck = useRef(null);
  const climatronicCheck = useRef(null);
  const navigationCheck = useRef(null);

  var CENA_BAZOWA = 75000;
  var CENA_LAKIER = 9000;
  var CENA_FELGI = 7000;
  var CENA_CZUJNIKI = 6500;
  var CENA_CLIMATRONIC = 8500;
  var CENA_NAWIGACJA = 5000;

  const [auto, setAuto] = useState({
    lakier: "szary",
    felgi: "stalowe",
    dodatkowe_wyposazenia: [false, false, false]
    //0 - czujniki parkowania 1 - climatronic 2 - nawigacja
  })

  function handleSelect() {
    setAuto(prevAuto => ({
      ...prevAuto,
      lakier: lakierSelected.current.value
    }))
  }

  function handleRims() {
    setAuto(prevAuto => ({
      ...prevAuto,
      felgi: rimsSelected.current.id
    }))
  }

  function handleEquipment() {
    setAuto(prevAuto => ({
      ...prevAuto,
      dodatkowe_wyposazenie: [parkingSensorsCheck.current.value, climatronicCheck.current.value, navigationCheck.current.value]
    }))
    console.log(parkingSensorsCheck.current.value)
  }

  return (
    <>
      <div className='container-fluid'>
        <img src={"/src/assets/" + auto.lakier + ".png"} alt='zdjecie auta' className='img-fluid mx-auto d-block' height={150} />  
        <h1 className='text-white text-center fw-bold configText' >Konfigurator wyposażenia</h1>
        
        <h3 className='otherText'>Wybierz kolor lakieru</h3>
        <div className='selectLakier'>
          <select ref={lakierSelected} className='border-0' defaultValue={szary} onChange={handleSelect}>
            <option value="szary">szary</option>
            <option value="czerwony">czerwony</option>
            <option value="zielony">zielony</option>
            <option value="zolty">żółty</option>
            <option value="granatowy">granatowy</option>
          </select>
        </div>

        <hr />

        <h3 className='otherText'>Felgi</h3>
        <div className='rimsSelect'>
          <div className='leftRim'>
            <input ref={rimsSelected} className="form-check-input" type='radio' name='rims' id='stalowe' defaultChecked onChange={handleRims} />
            <label htmlFor="stalowe">Stalowe</label>
          </div>
          <div className='rightRim'>
            <input ref={rimsSelected} className="form-check-input" type='radio' name='rims' id='aluminiowe' onChange={handleRims} />
            <label htmlFor="aluminiowe">Aluminiowe</label>
          </div>
        </div>

        <h3 className='otherText'>Wybierz dodatkowe wyposażenie</h3>
        <div className='equipmentSelect'>
          <input ref={parkingSensorsCheck} className='form-check-input' type='checkbox' id='parkingSensors' onChange={handleEquipment}  />
          <label htmlFor='parkingSensors'>Czujniki parkowania</label><br/>

          <input ref={climatronicCheck} className='form-check-input' type='checkbox' id='climatronic' onChange={handleEquipment} />
          <label htmlFor='climatronic'>Climatronic</label><br/>

          <input ref={navigationCheck} className='form-check-input' type='checkbox' id='navigation' onChange={handleEquipment} />
          <label htmlFor='navigation'>Nawigacja</label><br/>
        </div>

        <hr/>

        <h3 className='otherText'>Wycena</h3>
        <p className='priceText'>Cena bazowa: 75000 PLN <br/><br/>RAZEM: 75000 PLN</p>
      </div>
    </>
  )
}

export default App
