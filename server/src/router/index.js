const rootRouter = require('express').Router();

const checkToken = require('../middlewares/checkToken');
const chatRouter = require('./chatRouter');
const contestRouter = require('./contestRouter');
const userRouter = require('./userRouter');
const authRouter = require('./authRouter');
const offerRouter = require('./offerRouter');
const cashRouter = require('./cashRouter');
rootRouter.use('/auth', authRouter);
rootRouter.use(checkToken.checkAccessToken);
rootRouter.use('/chats', chatRouter);
rootRouter.use('/offers', offerRouter);
rootRouter.use('/users', userRouter);
rootRouter.use('/contests', contestRouter);
rootRouter.use('/cash', cashRouter);
module.exports = rootRouter;
