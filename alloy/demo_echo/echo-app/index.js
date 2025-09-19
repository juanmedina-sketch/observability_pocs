
const express = require('express');
const { createLogger, transports, format } = require('winston');
const ruid = require('express-ruid');
const client = require('prom-client');

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

// metricas para prometheus
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ timeout : 5000 });

// Crear un contador de requests HTTP
const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Contador de requests HTTP por ruta y método',
  labelNames: ['method', 'route', 'status_code']
});

// Middleware para contar las requests
app.use((req, res, next) => {
  res.on('finish', () => {
    httpRequestCounter.inc({
      method: req.method,
      route: req.route ? req.route.path : req.path,
      status_code: res.statusCode
    });
  });
  next();
});
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

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
