import { requestAuth } from './generic.service'

const enter = async (data) =>
  await requestAuth({ url: `login`, data, method: 'post' })

export { enter }
