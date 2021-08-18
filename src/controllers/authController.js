const router = require('express').Router();
const authService = require('../services/authService');
const { authRegisterSchema, authLoginSchema, authRefreshSchema } = require('../utils/validation/authValidation');

router.post('/register', async (req, res, next) => {
    try{
        const registerDTO = await authRegisterSchema.validateAsync(req.body);

        const result = await authService.register(registerDTO);

        res.status(201).send(result);
    }catch (error){
        if(error.isJoi === true){
            error.status = 422;
        }
        next(error)
    }
});

router.post('/login', async (req, res, next) => {
    try{
        const loginDTO = await authLoginSchema.validateAsync(req.body);

        const result = await authService.login(loginDTO, req.ip, req.get('User-Agent'));

        res.send(result);
    }catch (error){
        if(error.isJoi === true){
            error.status = 422;
        }
        next(error)
    }
});


router.post('/refresh', async (req, res, next) => {
    try {
        const refreshDTO = await authRefreshSchema.validateAsync(req.body);

        const result = await authService.refresh(refreshDTO);

        res.send(result)
    } catch (error) {
        next(error)
    }
})

module.exports = router;
