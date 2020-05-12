import React, {Component} from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Navbar extends Component {
  state = {
      slide: '-60px',  // How much should the Navbar slide up or down
      lastScrollY: 0,  // Keep track of current position in state
    };

    componentWillMount() {
      // When this component mounts, begin listening for scroll changes
      window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
      // If this component is unmounted, stop listening
      window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
      const { lastScrollY } = this.state;
      const currentScrollY = window.scrollY;

      console.log(currentScrollY);


      if (lastScrollY < 700) {
        this.setState({ slide: '-60px' });
      } else {
        this.setState({ slide: '0px' });
      }
      this.setState({ lastScrollY: currentScrollY });
    };

  render() {
    return (<nav className="navbar sticky-top navbar-expand-lg navbar-custom " style={{
          transform: `translate(0, ${this.state.slide})`,
          transition: 'transform 100ms linear',
        }}>
      <a className="navbar-brand pl-5" href="/">ColumnistOS</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse"
        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
        aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse " id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle pr-5" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Fecha
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown"></div>
          </li>

        </ul>

      </div>
    </nav>);
  }
}


export default Navbar;
