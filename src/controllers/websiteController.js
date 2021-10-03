const router = require('express').Router();
const {websiteRegisterSchema, websiteGetScoreSchema} = require("../utils/validation/websiteValidation");
const websiteService = require("../services/websiteService");

router.get('/', async (req, res, next) => {
    try{
        const getScoreDTO = await websiteGetScoreSchema.validateAsync(req.body);

        const result = await websiteService.getWebsiteScore(getScoreDTO);

        res.status(200).send(result);
    }catch (error){
        if(error.isJoi === true){
            error.status = 422;
        }
        next(error)
    }
});

router.post('/', async (req, res, next) => {
    try{
        const registerWebsite = await websiteRegisterSchema.validateAsync(req.body);

        await websiteService.registerNewWebsite(registerWebsite);

        res.status(201);
    }catch (error){
        if(error.isJoi === true){
            error.status = 422;
        }
        next(error)
    }
});


module.exports = router;
