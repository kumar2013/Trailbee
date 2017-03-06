import React from 'react';

class AboutHeader extends React.Component {
  render () {
    return (
      <div className="row">
        <div className="col-md-6 col-md-offset-3 col-xs-12" id="tb_about_header">
          <h2 className="text-center">About Trailbee</h2>
          <p>
            Trailbee is a dynamic software company with a single purpose of accelerating clinical research. We provide innovative software solutions that optimize the clinical trail process by enabling all stakeholders to easily communicate and collaborate on a joint platform.
          </p>
        </div>
      </div>
    );
  }
}

export default AboutHeader