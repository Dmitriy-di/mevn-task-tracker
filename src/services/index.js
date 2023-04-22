const getProducts = require('../services/products.service')
const getModules = require('../services/modules.service')
const getTasks = require('../services/tasks.service')
const getGroups = require('../services/groups.service')
const getSubjects = require('../services/subjects.service')

module.exports = {
  ...getProducts,
  ...getModules,
  ...getTasks,
  ...getGroups,
  ...getSubjects,
}
