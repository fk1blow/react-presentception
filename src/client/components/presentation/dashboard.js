import React from 'react';
import {Link} from 'react-router';

export default class PresentationDashboard extends React.Component {

  render() {
    return (
      <div id="presentation-dashboard" className="mw8 center phm phl-ns">
        <h1 className="f1-ns normal">
          Presentations
        </h1>

        <p>
          This is the presentation page. <br/>
          It list content relevant to the <em>presentation</em> area
          and reveals important actions.
        </p>

        <h3>Current slides</h3>

        <p>Chose a slide from the list below.<br/> These are the ones the user has downloaded.</p>

        <ol className="list">
          <li><Link className="teal" to="presentation-details" params={{id: 1}}>Presentation about something</Link></li>
          <li><Link className="teal" to="presentation-details" params={{id: 2}}>Small presentation about something else</Link></li>
          <li><Link className="teal" to="presentation-details" params={{id: 3}}>Yet another presentation about foo</Link></li>
        </ol>
      </div>
    )
  }

}
