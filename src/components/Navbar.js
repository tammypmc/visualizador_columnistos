import React, {Component} from 'react';
import DropdownDates from './DropdownDates';
import '../App.css';
/*
Para llamar a esta clase:
 <Navbar seleccionFecha={handler de fechas} seleccionAnio={handler de anios} listaAnios= {lista de Anios}></Navbar>
*/
class Navbar extends Component {
  state = {
    slide: '-60px',
    lastScrollY: 0,
    date: "",
    year: ""
  };

  componentDidMount() {

    window.addEventListener('scroll', this.handleScroll);
  }

  /*

  */
  handleScroll = () => {
    const {lastScrollY} = this.state;
    const currentScrollY = window.scrollY;
    if (lastScrollY < 300) {
      this.setState({slide: '-60px'});
    } else {
      this.setState({slide: '0px'});
    }
    this.setState({lastScrollY: currentScrollY});
  };

  callbackFunction = (childData) => {
    this.setState({message: childData})
  };

/* envia a app.js el rango de fechas seleccionadas
parametro: rango de fechas seleccionadas del calendario */
  handleDate = (Date) => {

    this.setState({date: Date});
    this.props.seleccionFecha(Date);
  }

/* envia a app.js el anio seleccionado del dropdown fecha
parametro: anio seleccionado del calendario */
  handleYear = (Year) => {
    this.setState({year: Year});
    this.props.seleccionAnio(Year);
  }

  render() {
    return (<nav className="navbar sticky-top navbar-expand-lg navbar-custom py-0" style={{
        transform: `translate(0, ${this.state.slide})`,
        transition: 'transform 10ms linear'
      }}>
      <a className="navbar-brand pl-5" href="/">ColumnistOS</a>
      <button className="navbar-toggler custom-toggler " type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse  " id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item dropdown">
            <button className="nav-link dropdown-toggle btn mt-2 " id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Fecha
            </button>
            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
              <form id="formLogin">
                  <DropdownDates obtenerFecha={this.handleDate} obtenerAnio={this.handleYear} listaAnios={this.props.listaAnios}/>

              </form>
            </div>
            <p>
              {this.state.message}
            </p>
          </li>

        </ul>

      </div>
    </nav>);
  }
}

export default Navbar;
