
const express = require('express');
const { createLogger, transports, format } = require('winston');
const ruid = require('express-ruid');

const app = express();
app.use(ruid({ setInContext: true }));

const logger = createLogger({
  defaultMeta: { app: 'gm2dev.demo.echo-app.express' },
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.File({
      filename: './logs.log',
      json: true,
      maxsize: 5242880,
      maxFiles: 5,
    }),
    new transports.Console(),
  ]
});
app.use(express.json({ type: '*/*' }));

app.get('/success', (req, res) => {
  logger.info("Request processed succesfully", { requestId: req.rid });
  return res.status(200).send({
    msg: "App Success",
    requestId: req.rid

  });
});

app.get('/fail', (req, res) => {
  try {
    a()
  } catch (err) {
    logger.error(err.message, { requestId: req.rid, stack: err.stack })
    return res.status(404).send({ error: 'App Error' });
  }
});

const c = () => {
  throw new Error("err");
}
const b = () => {
  return c()
}
const a = () => {
  return b()
}


module.exports = app
