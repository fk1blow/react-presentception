import React from 'react';

export default class Slide extends React.Component {

  render() {
    return (
      <div className="slide-mask bg-teal">
        <div className="slide mw8 center">
          <section>
            <h1 className="sh2 book">xPresentation named: <em>'p1'</em></h1>
          </section>

          <section>
            content of the slide 1
          </section>
        </div>
      </div>
    );
  }

}
