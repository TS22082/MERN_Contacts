import React, { Component } from 'react'
import axios from 'axios'

class MyComponent extends Component {
  constructor() {
    super()
    this.state = {
      contacts: []
    }
    this.getContacts = this.getContacts.bind(this)
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
      <div>
        <h1>My name is {this.props.name}</h1>
        {this.state.contacts.map(contact => (
          <p key={contact._id}>{contact.name}</p>
        ))}
      </div>
    )
  }
}

export default MyComponent
