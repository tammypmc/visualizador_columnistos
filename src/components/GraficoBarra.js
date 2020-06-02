import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';
import '../App.css';
import {descargarImagen} from './utilities'
import 'bootstrap/dist/css/bootstrap.min.css';

/* para llamar esta clase:
      SEMANA:
        <GraficoBarra id="semana" periodicos={medios} enlace={graficoSemanaPeriodico} titulo="¿Cómo se distribuye por día de la semana  por periódico?"/>
      MES:
        <GraficoBarra id="mes"  periodicos={medios} enlace={distribucionMesAnio} titulo="¿Cómo se distribuyen por mes por periódico?"/>
*/
class GraficoBarra extends Component {

  constructor(props) {
    super(props);
    this.chartReference = React.createRef();
    this.state = {
      data: { datasets:[], labels:[] }
    };
  }

  componentDidMount() {
  this.ObtenerVariables(this.props.enlace);/* retorna los datos dado el api */

  }

/*cada vez que se actualiza la fecha se vuelve a generar los datos de los graficos*/
/* parametro: consulta del api actualizada*/
  componentDidUpdate(prevProps, prevState) {
  if (prevProps.data !== this.props) {
    this.ObtenerVariables(this.props.enlace)
  }
}

  /* divide el resultado de la consulta en 3 listas nombre del periodico, los meses o semana  y el porcentaje de cada
  uno, crea el dataset por cada periodico, le asigna los colores a cada periodico y divide los valores de cada barra
  parametro: consulta del api*/
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

              for (var i = 0; i < this.props.periodicos.length; i++) { /*genera un dataset con la informacion de cada periodico*/
                var lista_data = []
                for (var j = 0; j < llave.length; j++) {
                  lista_data.push(valor[valor_por_periodico]);
                  valor_por_periodico++;
                }

                nuevo.data.datasets[i] = {
                  label:this.props.periodicos[i],
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
    if (this.props.id === "semana") { /* si se habla de semana el máximo del eje "y" será 100, en caso de ser mes será 50*/
      x = 100;
    } else {
      x = 50;
    }
    return (<div className="componente_barra">

      <div className={this.props.id}>
        <Bar data={this.state.data} width={null} height={null} options={{
            title: {
              display: true,
              text: this.props.titulo,            /* se extrae  de app el titulo del grafico */
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
        <button className="btn btn-outline-secondary btn-sm btn-auto btn-iconed btn-rounded" onClick={() => console.log("ici") || descargarImagen(this.props.id)}>
        <i className="icon ion-md-arrow-down"></i>
        <span className="spn">Descargar</span>
      </button>

    </div>);

  }

}



export default GraficoBarra;
