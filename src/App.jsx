import { useEffect, useRef, useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'

function App() {
  const lakierSelected = useRef(null);
  const rimsAluminiumSelected = useRef(null)
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
  
  const [message, setMessage] = useState("Cena bazowa: 75000 PLN \n\nRAZEM: 75000 PLN")
  
  function calculatePrice() {
    var price = CENA_BAZOWA;
    
    if(auto.lakier != "szary") price += CENA_LAKIER
    if(auto.felgi == "aluminiowe") price += CENA_FELGI
    if(auto.dodatkowe_wyposazenia[0]) price += CENA_CZUJNIKI
    if(auto.dodatkowe_wyposazenia[1]) price += CENA_CLIMATRONIC
    if(auto.dodatkowe_wyposazenia[2]) price += CENA_NAWIGACJA
    
    return price;
  }
  
  function updatePrices() {
    var messageUpdated = `Cena bazowa: ${CENA_BAZOWA} PLN`;
    
    if (auto.lakier != "szary") messageUpdated += `\nLakier: ${CENA_LAKIER} PLN`;
    if (auto.felgi == "aluminiowe") messageUpdated += `\nFelgi aluminiowe: ${CENA_FELGI} PLN`;
    if (auto.dodatkowe_wyposazenia[0]) messageUpdated += `\nCzujniki parkowania: ${CENA_CZUJNIKI} PLN`;
    if (auto.dodatkowe_wyposazenia[1]) messageUpdated += `\nClimatronic: ${CENA_CLIMATRONIC} PLN`;
    if (auto.dodatkowe_wyposazenia[2]) messageUpdated += `\nNawigacja: ${CENA_NAWIGACJA} PLN`;
    
    messageUpdated += `\n\nRAZEM: ${calculatePrice()} PLN`;
    
    setMessage(messageUpdated);   
  }
  
  function handleSelect() {
    setAuto(prevAuto => ({
      ...prevAuto,
      lakier: lakierSelected.current.value
    }))
  }
  
  function handleRims() {
    var value = "stalowe"
    if(rimsAluminiumSelected.current.checked)
      value = "aluminiowe"
    
    setAuto(prevAuto => ({
      ...prevAuto,
      felgi: value
    }))
  }
  
  
  function handleEquipment() {
    setAuto(prevAuto => ({
      ...prevAuto,
      dodatkowe_wyposazenia: [parkingSensorsCheck.current.checked, climatronicCheck.current.checked, navigationCheck.current.checked]
    }))
  }
  
  useEffect(() => {
    updatePrices()
  }, [auto])

  return (
    <>
      <div className='container-fluid'>
        <img src={"/src/assets/" + auto.lakier + ".png"} alt='zdjecie auta' className='img-fluid mx-auto d-block' height={150} />  
        <h1 className='text-white text-center fw-bold configText' >Konfigurator wyposażenia</h1>
        
        <h3 className='otherText'>Wybierz kolor lakieru</h3>
        <div className='selectLakier'>
          <select ref={lakierSelected} className='border-0' defaultValue="szary" onChange={handleSelect}>
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
            <input  className="form-check-input" type='radio' name='rims' id='rimsSteel' value="stalowe" defaultChecked onChange={handleRims} />
            <label htmlFor="rimsSteel">Stalowe</label>
          </div>
          <div className='rightRim'>
            <input ref={rimsAluminiumSelected} className="form-check-input" type='radio' name='rims' id='rimsAluminium' value="aluminiowe" onChange={handleRims} />
            <label htmlFor="rimsAluminium">Aluminiowe</label>
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
        <p className='priceText'><pre>{message}</pre></p>
      </div>
    </>
  )
}

export default App
