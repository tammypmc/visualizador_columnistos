import React, {Component} from 'react';
import DropdownDates from './DropdownDates';
import '../App.css';

class Navbar extends Component {
  state = {
    slide: '-60px', // How much should the Navbar slide up or down
    lastScrollY: 0, // Keep track of current position in state
    date: "",
    year: ""
  };

  componentWillMount() {
    // When this component mounts, begin listening for scroll changes
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const {lastScrollY} = this.state;
    const currentScrollY = window.scrollY;

    if (lastScrollY < 600) {

      console.log(currentScrollY);
      this.setState({slide: '-60px'});
    } else {

      console.log(currentScrollY);
      this.setState({slide: '0px'});
    }

    this.setState({lastScrollY: currentScrollY});
  };

  callbackFunction = (childData) => {
    this.setState({message: childData})
  };

  handleDate = (Date) => {/* envia a app.js el rango de fechas seleccionadas */
    this.setState({date: Date});
    this.props.seleccionFecha(Date);
  }

  handleYear = (Year) => {/* envia a app.js el rango de fechas seleccionadas */
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

      <div className="collapse navbar-collapse pr-5  " id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Fecha
            </a>
            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
              <DropdownDates obtenerFecha={this.handleDate} obtenerAnio={this.handleYear} listaAnios={this.props.listaAnios}/>

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
