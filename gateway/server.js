"use strict";

var express = require('express');
var rateLimit = require('express-rate-limit');
var cors = require('cors');
var morgan = require('morgan');
var swaggerUi = require('swagger-ui-express');
var swaggerDocument = require('./swagger.json');
var _require = require('http-proxy-middleware'),
  createProxyMiddleware = _require.createProxyMiddleware;
var redis = require('redis');
var app = express();

// Redis client for caching
var redisClient = redis.createClient(process.env.REDIS_URL);

// Rate limiting middleware
var limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

// Middleware
app.use(cors());
app.use(morgan('combined'));
app.use(limiter);
app.use(express.json());

// Health check endpoint
app.get('/health', function (req, res) {
  res.status(200).json({
    status: 'healthy'
  });
});

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Proxy middleware setup
var mainServiceProxy = createProxyMiddleware({
  target: process.env.MAIN_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: {
    '^/api': '/'
  }
});

// Routes
app.use('/api', mainServiceProxy);
var PORT = process.env.GATEWAY_PORT || 4000;
app.listen(PORT, function () {
  console.log("API Gateway running on port ".concat(PORT));
});