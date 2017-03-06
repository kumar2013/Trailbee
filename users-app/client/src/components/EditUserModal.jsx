import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';

import EditUserMutation from '../mutations/EditUserMutation';

class EditUserModal extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      id: props.user.__dataID__,
      name: props.user.name,
      age: props.user.age,
      email: props.user.email,
      address: props.user.address
    };
  }
  
  handleSubmit(e) {
    e.preventDefault();    
    const user = this.state;
    const viewer = this.props.viewer;
    
    Relay.Store.commitUpdate(
      new EditUserMutation({user, viewer})
    );
 
    $(ReactDOM.findDOMNode(this)).modal('hide');
  }
  
  handleChange(name, e) {
    let change = {};
    change[name] = e.target.value;
    this.setState(change);
  }

  render() {
    return (
      <div className="modal fade" id={this.props.modalId} role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">&times;</button>
              <h4 className="modal-title">Edit User</h4>
            </div>
            <div className="modal-body">
              <form className="tb-edit-form" onSubmit={this.handleSubmit.bind(this)}>
                <div className="form-group">
                  <label htmlFor="name" className="col-md-4 control-label">Name </label>
                  <div className="col-md-8">
                    <input className="form-control" type="text" placeholder="name" value={this.state.name} onChange={this.handleChange.bind(this, 'name')} required />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="age" className="col-md-4 control-label">Age </label>
                  <div className="col-md-8">
                    <input className="form-control" type="text" placeholder="age" value={this.state.age} onChange={this.handleChange.bind(this, 'age')} required/>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="col-md-4 control-label">Email </label>
                  <div className="col-md-8">
                    <input className="form-control" type="email" placeholder="email" value={this.state.email} onChange={this.handleChange.bind(this, 'email')} required/>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="address" className="col-md-4 control-label">Address </label>
                  <div className="col-md-8">
                    <input className="form-control" type="text" placeholder="address" value={this.state.address} onChange={this.handleChange.bind(this, 'address')} required/>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                  <button type="submit" className="btn btn-primary">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditUserModal
