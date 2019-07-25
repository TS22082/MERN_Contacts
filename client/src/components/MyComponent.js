import React, { Component } from 'react'
import axios from 'axios'

class MyComponent extends Component {
  state = {}

  constructor() {
    super()
    this.state = {
      contacts: []
    }
    this.onChange = this.onChange.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = async e => {
    e.preventDefault()
    const newContact = {
      name: this.state.name,
      email: this.state.email,
      message: this.state.message
    }

    console.log(newContact)
    await axios.post('/api', newContact)
    this.getContacts()
  }

  getContacts = async () => {
    let res = await axios.get('/api')
    this.setState({ contacts: res.data })
    console.log(this.state)
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
              <div className="form-group">
                <label>Name Field</label>
                <input
                  name="name"
                  type="text"
                  onChange={this.onChange}
                  className="form-control"
                  placeholder="Enter name"
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  name="email"
                  type="text"
                  onChange={this.onChange}
                  className="form-control"
                  placeholder="Enter E-mail"
                />
              </div>
              <div className="form-group">
                <label>Message</label>
                <input
                  name="message"
                  type="text"
                  onChange={this.onChange}
                  className="form-control"
                  placeholder="Enter Message"
                />
              </div>
              <div className="text-right">
                <button
                  type="submit"
                  onClick={this.onSubmit}
                  className="btn btn-primary"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
        {this.state.contacts.map(contact => (
          <div className="card" key={contact._id}>
            <div className="card-header">
              <h5 className="card-title text-center">{contact.name}</h5>
            </div>
            <div className="card-body">
              <p className="card-text text-center">{contact.message}</p>
              <p className="card-text text-center">{contact.email}</p>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

export default MyComponent
