import React from 'react';
import {Link} from 'react-router';

export default class Header extends React.Component {

  render() {
    return (
      <div id="header" className="w-100 pvm bb b--light-gray">
        <header className="mw8 center phm phl-ns">

          <menu className="fr">
            <li className="prm"><Link to="presentations" className="link book dib ttu">Presentations</Link></li>
            <li className="prm"><Link to="configuration" className="link book dib ttu">Configuration</Link></li>
            <li><Link to="remote" className="link book dib ttu">Remote</Link></li>
          </menu>

          <Link to="home" className="logo teal none f2 dib">shlissszneeK</Link>
        </header>
      </div>
    );
  }

}
