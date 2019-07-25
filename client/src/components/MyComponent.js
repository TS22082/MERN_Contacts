import React, { Component } from 'react'
import axios from 'axios'

class MyComponent extends Component {
  constructor() {
    super()
    this.state = {
      contacts: []
    }
    this.getContacts = this.getContacts.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = async () => {
    const newContact = {
      name: this.state.name,
      email: this.state.email,
      message: this.state.message
    }

    await axios.post('/api', newContact)
    this.getContacts()
  }

  getContacts = async () => {
    let res = await axios.get('/api')
    this.setState({ contacts: res.data })
  }

  componentDidMount() {
    this.getContacts()
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <form className="mb-4">
              <div class="form-group">
                <label>Name Field</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter name"
                />
              </div>
              <div class="form-group">
                <label>Email</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Password"
                />
              </div>
              <div class="form-group">
                <label>Email</label>
                <input type="text" class="form-control" placeholder="message" />
              </div>
              <button type="submit" class="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
        {this.state.contacts.map(contact => (
          <div class="card">
            <div class="card-body">
              <h5 class="card-title text-center">{contact.name}</h5>
              <p class="card-text text-center">{contact.message}</p>
              <p class="card-text text-center">{contact.email}</p>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

export default MyComponent
