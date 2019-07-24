const express = require('express')
const router = express.Router()
const Contact = require('../models/contact')

//get all
router.get('/', async (req, res) => {
  try {
    const allContacts = await Contact.find()
    res.send(allContacts)
    console.log('get request recieved')
  } catch (err) {
    console.log(err)
  }
})

//get one specific
router.get('/:id', getContactById, async (req, res) => {
  res.send(res.contact.name)
})

//post to DB
router.post('/', async (req, res) => {
  const contact = new Contact({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message
  })

  try {
    const newContact = await contact.save()
    res.status(201).json(newContact)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

//update entry in DB
router.patch('/:id', getContactById, async (req, res) => {
  if (req.body.name != null) {
    res.contact.name = req.body.name
  }
  if (req.body.email != null) {
    res.contact.email = req.body.email
  }
  if (req.body.message != null) {
    res.contact.name = req.body.message
  }

  try {
    const updatedContact = await res.contact.save()
    res.json(updatedContact)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

//delete entry from DB
router.delete('/:id', getContactById, async (req, res) => {
  try {
    await res.contact.remove()
    res.json({ message: 'Contact deleted' })
  } catch (err) {
    res.status(500).json({ message: message.err })
  }
})

async function getContactById(req, res, next) {
  let contact
  try {
    contact = await Contact.findById(req.params.id)
    if (contact == null) {
      return res.status(404).json('Cannot find contact')
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.contact = contact
  next()
}

module.exports = router
