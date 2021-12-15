const router = require('express').Router();
const { websiteGetScoreSchema, websiteScoreByIdSchema, websiteRegisterSchema } = require('../utils/validation/websiteValidation');
const websiteService = require('../services/websiteService');

router.post('/score', async (req, res, next) => {
  try {
    const websiteDto = await websiteGetScoreSchema.validateAsync(req.body);

    const result = await websiteService.getWebsiteScore(websiteDto);

    res.status(200).send(result);
  } catch (error) {
    if (error.isJoi === true) {
      error.status = 422;
    }
    next(error);
  }
});

router.get('/score/:websiteId', async (req, res, next) => {
  try {
    const websiteId = await websiteScoreByIdSchema.validateAsync(req.params.websiteId);

    const result = await websiteService.getWebsiteScoreById(websiteId);

    res.status(200).send(result);
  } catch (error) {
    if (error.isJoi === true) {
      error.status = 422;
    }
    next(error);
  }
});

router.post('/report/phishing', async (req, res, next) => {
  try {
    const website = await websiteRegisterSchema.validateAsync(req.body);

    await websiteService.reportWebsitePhishing(website);

    res.status(200);
  } catch (error) {
    if (error.isJoi === true) {
      error.status = 422;
    }
    next(error);
  }
});

module.exports = router;
