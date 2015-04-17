import React from 'react';

export default class Slide extends React.Component {

  render() {
    return (
      <div className="slide-mask">
        <div className="slide mw8 center">
          <section>
            <h2 className="tc">xPresentation named: <em>'p1'</em></h2>
          </section>

          <section>
            content of the slide 5
          </section>
        </div>
      </div>
    );
  }

}
