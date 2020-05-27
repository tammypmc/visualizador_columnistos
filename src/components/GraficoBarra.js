import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';
import '../App.css';
import {descargarImagen} from './utilities'
import 'bootstrap/dist/css/bootstrap.min.css';

class GraficoBarra extends Component {

  constructor(props) {
    super(props);
    this.chartReference = React.createRef();
    this.state = {
      data: []
    };
  }

  componentDidMount() {
  this.ObtenerVariables(this.props.enlace);/* retorna los datos dado el api */
  }

  componentDidUpdate(prevProps, prevState) {
  if (prevProps.data !== this.props) {
    this.ObtenerVariables(this.props.enlace)
  }
}

  /* obtiene la consulta, divide en 3 listas el resultado de la consulta entre el nombre del periodico, los meses o semana
  y el porcentaje de cada uno,crea el dataset, le asigna los colores y divide los valores de cada barra */
  ObtenerVariables(consulta) {
    fetch(consulta)
          .then(res => res.json())
          .then(
            (result) => {
              var periodico = result.data;
              var lista_periodico = [];
              var valor = [];
              var llave = [];

              for (var y = 0; y < periodico.length; y++) {

                for (var key in periodico[y]) {
                  if (key === "site") {
                    lista_periodico.push(periodico[y][key]);
                  } else if (llave.includes(key) === false) {
                    llave.push(key);
                    valor.push(parseInt(periodico[y][key]));
                  } else {
                    valor.push(parseInt(periodico[y][key]));
                  }
                }
              }


              var nuevo = {
                data: {
                  labels: llave,
                  datasets: []
                }
              }

              var valor_por_periodico = 0;
              var color = 0;
              const COLORS = ['#CE796B', '#C18C5D', '#495867', '#A2C3A4', '#C4F1BE']
              for (var i = 0; i < lista_periodico.length; i++) {

                var lista_data = []
                for (var j = 0; j < llave.length; j++) {
                  lista_data.push(valor[valor_por_periodico]);
                  valor_por_periodico++;
                }

                nuevo.data.datasets[i] = {
                  label: lista_periodico[i],
                  backgroundColor: COLORS[color],
                  borderColor: COLORS[color],
                  borderWidth: 1,
                  hoverBackgroundColor: COLORS[color],
                  hoverBorderColor: COLORS[color],
                  data: lista_data
                }
                color++;

              }

              this.setState({data: nuevo.data});

            })

  }

  render() {
    var x = 0;
    if (this.props.id === "semana") {
      x = 100;
    } else {
      x = 50;
    }
    return (<div className="componente_barra">

      <div className={this.props.id}>
        <Bar data={this.state.data} width={null} height={null} options={{
            title: {
              display: true,
              text: this.props.titulo,
              /* se extrae de de app el titulo del grafico */
              fontSize: 20
            },
            legend: {
              display: true,
              position: 'top',
              labels: {
                boxWidth: 20
              }
            },
            scales: {
              xAxes: {
                ticks: {
                  beginAtZero: true,
                  stepSize: 10,
                  max: x
                }
              },
              yAxes: [
                {

                  ticks: {
                    beginAtZero: true,
                    stepSize: 25,
                    max: x
                  }
                }
              ]
            },
            plugins: {
              datalabels: {
                display: false
              }
            }
          }}/>

      </div>

      <button role="button" className="btn btn-outline-secondary btn-sm btn-auto btn-iconed btn-rounded" onClick={() => console.log("ici") || descargarImagen(this.props.id)}>
        <i className="icon ion-md-arrow-down"></i>
        <span className="spn">Descargar</span>
      </button>

    </div>);

  }

}



export default GraficoBarra;
