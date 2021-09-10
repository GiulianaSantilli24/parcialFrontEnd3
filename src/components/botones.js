import react from "react";
import Data from "./data.json"

//inicializar el contador por fuera de la clase para que su scope sea global

let contador = 1;

//creo la clase Botones que extiende de react
class Botones extends react.Component {

    //le creo un constructor a Botones 
    constructor(props) {
        super(props)

        this.state = { historiaNueva:Data[0].historia, ultimaEleccion: "", listaElecciones: [], opcionA: Data[0].opciones.a, opcionB: Data[0].opciones.b };

        // agrego los handleChange al constructor

        this.handleChangeReiniciarHistoria = this.handleChangeReiniciarHistoria.bind(this);

        this.handleChangeOpcionA = this.handleChangeOpcionA.bind(this);

        this.handleChangeOpcionB = this.handleChangeOpcionB.bind(this);
    }
     componentDidUpdate(props) {
        contador = 1;
      }

    // creo la funcion handleChange para reiniciar la historia en cualquier momento y al finalizar la historia 

    handleChangeReiniciarHistoria() {

        contador = 1;

        this.setState({ historiaNueva: Data[0].historia, ultimaEleccion: [], listaElecciones: [], opcionA: Data[0].opciones.a, opcionB: Data[0].opciones.b })
    }

    // creo la funcion handleChange para manejar la opcion A

    handleChangeOpcionA() {
        contador++;

        let historiaNueva = Data.filter(data => data.id === contador + "a")[0];

        let recordatorio = [...this.state.listaElecciones, "Opción A"];

        if (contador < 6) {
            this.setState({ ultimaEleccion: "Opción A", listaElecciones: recordatorio, historiaNueva: historiaNueva.historia, opcionA: historiaNueva.opciones.a, opcionB: historiaNueva.opciones.b });
        }
        else {
            this.handleChangeReiniciarHistoria();
            contador = 1;
        }
    }

    // creo la funcion handleChange para manejar la opcion B

    handleChangeOpcionB() {
        contador++;

        let historiaNueva = Data.filter(data => data.id === contador + "b")[0];

        let recordatorio = [...this.state.listaElecciones, "Opción B"];

        if (contador < 6) {
            this.setState({ ultimaEleccion: "Opción B", listaElecciones: recordatorio, historiaNueva: historiaNueva.historia, opcionA: historiaNueva.opciones.a, opcionB: historiaNueva.opciones.b });
        } else {
            this.handleChangeReiniciarHistoria();
            contador = 1;
        }
    }

    //renderizo los divs, botones y spans para que se vean correctamente en el html

    render() {
        return (
            <>

                <div className="historia">{this.state.historiaNueva}</div>
                <div className="opcion">
                    <button className="botones" onClick={this.handleChangeOpcionA}> Opción A</button>
                    <span className="opciones">{this.state.opcionA}</span>
                </div>
                <br />
                <div className="opcion">
                    <button className="botones" onClick={this.handleChangeOpcionB}> Opción B</button>
                    <span className="opciones">{this.state.opcionB}</span>
                </div>
                <div className="recordatorio">
                    <p>Selección previa: {this.state.ultimaEleccion}</p>
                    <p>recordatorio de todas las selecciones anteriores:<ul> {this.state.listaElecciones.map((eleccion, index) => <li key={eleccion + index}>{eleccion}</li>)}</ul></p>
                    <div>
                        <button className="botones" onClick={this.handleChangeReiniciarHistoria}> Reiniciar Historia </button>
                    </div>
                </div>

            </>
        )
    }
}

//exporto la clase botones para utilizarla en App.js

export default Botones;
