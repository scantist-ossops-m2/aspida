import { MockMethods } from '~/aspida-mock/src/types'
import { users } from '../users/index'

export default {
  get: ({ values }) => [200, users.filter(user => user.name === values.userName)[0]]
} as MockMethods
