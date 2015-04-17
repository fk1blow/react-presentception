import React from 'react';

class ConfigurePage extends React.Component {

  render() {
    return (
      <div id="about" className="mw8 center phl-ns">
        <h1 className="ttu f2">configuration</h1>
        This is the configure page. <br/>
        It list content relevant to the <em>Configuration</em> area
        and reveals important actions.

        <h3>Remote control</h3>
        <section>
          Defines the remote control settings!
        </section>

        <h3>Presentational</h3>
        <section>
          Defines the presentational (stuff) settings!
        </section>
      </div>
    )
  }

}

export default ConfigurePage;
