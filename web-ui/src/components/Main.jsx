import React from 'react';
import ReactDom from 'react-dom';

import AboutHeader from './AboutHeader';
import List from './List';

class Main extends React.Component {
  render() {
    return (
      <div className="container" id="tb_main"> 
        <AboutHeader />
        <List />
      </div>
    );
  }
}

export default Main
