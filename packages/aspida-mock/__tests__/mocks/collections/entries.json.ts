import { MockMethods } from '~/aspida-mock/src/types'

export const entries = [
  { id: 0, title: 'aaa' },
  { id: 1, title: 'bbb' }
]

export default {
  get: () => [200, entries]
} as MockMethods
