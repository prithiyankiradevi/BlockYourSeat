const router = require('express').Router()
const userController=require('../controller/login_controller')

router.post('/create',userController.register)
router.post('/login',userController.login)
router.put('/update/:userId',userController.updateUserData)
router.get('/getById/:userId',userController.getPerUser)
router.get('/getAll',userController.getAllUsers)
router.delete('/delete/:userId',userController.deleteUserData)




module.exports=router