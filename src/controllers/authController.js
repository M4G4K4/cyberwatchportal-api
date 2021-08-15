const router = require('express').Router();
const authService = require('../services/authService');
const { authRegisterSchema } = require('../utils/validation/authValidation');

router.post('/register', async (req, res, next) => {
    try{
        const registerDTO = await authRegisterSchema.validateAsync(req.body);

        const result = await authService.register(registerDTO);

        res.send(result);
    }catch (error){
        if(error.isJoi === true){
            error.status = 422;
        }
        next(error)
    }
});

module.exports = router;
