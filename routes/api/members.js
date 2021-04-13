const express = require('express')
const router = express.Router()
const members = require('../../Members')
const uuid = require('uuid')
//get all members
router.get('/',(req,res) => {
    res.json(members)
})
//get single person

router.get('/:id',(req,res) => {
  const found = members.some(member => member.id == parseInt(req.params.id))
  

  if(found){
     res.json(members.filter(member => member.id == parseInt(req.params.id)))
  }else{
      res.status(400, res.json({msg: `No member for this id : ${req.params.id}`}))
  }
})

//create member
router.post('/',(req,res) => {
    const newMember = {
        id:uuid.v4(),
        name:req.body.name,
        email:req.body.email,
        status:"active"
    }
    if(newMember.name ==null || newMember.email ==null ){
        res.status(400).json({msg: 'Please the newMember include both name and email'})
    }
    members.push(newMember)
    res.redirect('/')
})
//update member

router.put('/:id',(req,res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))

    if(found){
        const updMember = req.body;
        members.forEach(member => {
            if(member.id === parseInt(req.params.id)){
                member.name = updMember.name ? updMember.name : member.name,
                member.email = updMember.email ? updMember.email : member.email,
                res.json({msg:'Member updated',member})
            }
        })
    }else{
        res.status(400).json({msg:`No user match for id: ${req.params.id} `})
    }
})

//delete user
router.delete('/:id',(req,res) => {
    const found = members.some(member => member.id == parseInt(req.params.id))
    
  
    if(found){
      res.json({msg:'Member deleled',member: members.filter(member => member.id !== parseInt(req.params.id))})
    }else{
        res.status(400, res.json({msg: `No member for this id : ${req.params.id}`}))
    }
  })

module.exports = router