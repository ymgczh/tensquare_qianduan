'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  //BASE_API: '"https://www.easy-mock.com/mock/5e929cb803484b4fe4b51327/zhymgc"'
  BASE_API: '"http://192.168.188.131:7300/mock/5e92f639318de31404cabf48/zhymgc"'
})
