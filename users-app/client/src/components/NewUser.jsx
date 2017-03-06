import React from 'react';
import Relay from 'react-relay';

import AddUserMutation from '../mutations/AddUserMutation';

class NewUser extends React.Component {
  constructor() {
    super();
    
    this.state = {
      name: '',
      age: '',
      email: '',
      address: ''
    };
  }
  
  handleSubmit(e) {
    e.preventDefault();    
    const user = this.state;
    const viewer = this.props.viewer;
    
    Relay.Store.commitUpdate(
      new AddUserMutation({viewer, user}), {
        onSuccess: () => Relay.Store.forceFetch
      }
    );
    
    this.setState({
      name: '',
      age: '',
      email: '',
      address: ''
    });
  }
  
  handleChange(name, e) {
    let change = {};
    change[name] = e.target.value;
    this.setState(change);
  }
  
  render() {
    return(
      <div className="row" id="tb_new_user">
        <div className="col-md-8 col-md-offset-2 col-xs-12">
          <h2>New User</h2>
          <p>Want to add a new user, fill the following form</p>
          <form className="form-inline" onSubmit={this.handleSubmit.bind(this)}>
            <div className="form-group">
              <input className="form-control" type="text" placeholder="name" value={this.state.name} onChange={this.handleChange.bind(this, 'name')} required />
            </div>
            <div className="form-group">
              <input className="form-control" type="text" placeholder="age" value={this.state.age} onChange={this.handleChange.bind(this, 'age')} required/>
            </div>
            <div className="form-group">
              <input className="form-control" type="email" placeholder="email" value={this.state.email} onChange={this.handleChange.bind(this, 'email')} required/>
            </div>
            <div className="form-group">
              <input className="form-control" type="text" placeholder="address" value={this.state.address} onChange={this.handleChange.bind(this, 'address')} required/>
            </div>
            <button type="submit" className="btn btn-primary">Add</button>
          </form>
        </div>
      </div>
    );
  }
}

export default NewUser
