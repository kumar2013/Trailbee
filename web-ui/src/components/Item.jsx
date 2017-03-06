import React from 'react';

class Item extends React.Component {
  render() {
    const item = this.props.content;
    
    return(
      <li className="col-md-4 col-xs-12">
        <div className="tb-item">
          <img src= {item.image} className="img-responsive" alt="Responsive image"/>
          <h4>{item.title}</h4>
          <p>{item.description}</p>
          <button className="btn btn-info" type="button">{item.label}</button>
        </div>
      </li>
    );
  }
}

export default Item