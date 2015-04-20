import React from 'react';

class ConfigurePage extends React.Component {

  render() {
    return (
      <div id="about" className="mw8 center phm phl-ns">
        <h1 className="f1-ns normal">Configuration</h1>
        This is the configure page. <br/>
        It list content relevant to the <em>Configuration</em> area
        and reveals important actions.

        <section>
          <h3>Remote control</h3>
          Defines the remote control settings!
        </section>

        <section>
          <h3>Presentational</h3>
          Defines the presentational (stuff) settings!
        </section>
      </div>
    )
  }

}

export default ConfigurePage;
