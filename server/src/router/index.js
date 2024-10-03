const rootRouter = require('express').Router();

const checkToken = require('../middlewares/checkToken');
const chatRouter = require('./chatRouter');
const contestRouter = require('./contestRouter');
const userRouter = require('./userRouter');
const authRouter = require('./authRouter');

rootRouter.use('/auth', authRouter);

rootRouter.use(checkToken.checkToken);

rootRouter.use('/users', userRouter);
rootRouter.use('/chats', chatRouter);
rootRouter.use('/contests', contestRouter);

module.exports = rootRouter;
