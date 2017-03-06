import React from 'react';

import Item from './Item';

import img1 from '../assets/img/1.png';
import img2 from '../assets/img/2.png';
import img3 from '../assets/img/3.png';

class List extends React.Component {
  render() {
    return(
      <ul className="row" id="tb_list">
        {this.props.items.map((item) => <Item content={item}/>)}
      </ul>
    );
  }
}

List.defaultProps = {
  items: [
    {  
      image: img1,
      title: 'Our services',
      description: 'Trailbee is an independent software and service provider specialized in clinical research applications. We are experts of e-recruitment, study retention and EDC solutions.',
      label: 'Services'
    },
    {  
      image: img2,
      title: 'Customers say',
      description: 'Working with Trailbee really simplified our efforts finding patients. Tralbee opened new channels for patient recruitment and helped us increase the recruitment rates.',
      label: 'Contact Us'
    },
    {  
      image: img3,
      title: 'Our goal',
      description: 'Trailbee is a dynamic software company with a single purpose of accelerating clinical trails. Our mission is to help bring groundbreaking treatments to the patients faster.',
      label: 'About Us'
    }
  ]
};

export default List