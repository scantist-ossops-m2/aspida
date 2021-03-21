/* eslint-disable */
import type { Methods as Methods0 } from '.'
import type { Methods as Methods1 } from './2/_hogeId'
import type { Methods as Methods2 } from './2/_hogeId@number'
import type { Methods as Methods3 } from './2/_hogeId@string/entries.json'
import type { Methods as Methods4 } from './2/_hogeId@string/test-4'
import type { Methods as Methods5 } from './2/_hogeId@string/test-4/_fugaId'
import type { Methods as Methods6 } from './2/_hogeId@string/test-4/fuga aa'
import type { Methods as Methods7 } from './3.1'
import type { Methods as Methods8 } from './_articleId.json'
import type { Methods as Methods9 } from './users/_userId@string'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'PATCH' | 'OPTIONS'
type RequestType = 'FormData' | 'URLSearchParams' | 'ArrayBuffer' | 'Blob' | 'string' | 'any'
type HttpStatusOk = 200 | 201 | 202 | 203 | 204 | 205 | 206
type BasicHeaders = Record<string, string>

type AspidaRequest = {
  query?: any
  headers?: any
  httpBody?: any
  body?: any
  config?: RequestInit
}

type AspidaParams = {
  query?: any
  headers?: any
  body?: any
  config?: RequestInit
}

const headersToObject = (headers: Headers): any =>
  [...headers.entries()].reduce((prev, [key, val]) => ({ ...prev, [key]: val }), {})

const appendDataToFormData = (data: Record<string, any>, formData: FormData) => {
  Object.entries(data).forEach(([key, val]) => {
    if (Array.isArray(val)) {
      val.forEach(v => formData.append(key, v))
    } else if (val != null) {
      formData.append(key, val)
    }
  })

  return formData
}

const dataToURLString = (data: Record<string, any>) => {
  const searchParams = new URLSearchParams()

  Object.entries(data).forEach(([key, val]) => {
    if (Array.isArray(val)) {
      val.forEach(v => searchParams.append(key, v))
    } else if (val != null) {
      searchParams.append(key, val)
    }
  })

  return searchParams.toString()
}

const hasFormData = typeof FormData !== 'undefined'

const optionToRequest = (
  option?: AspidaParams,
  type?: RequestType
): AspidaRequest | undefined => {
  if (option?.body === undefined) return option

  let httpBody
  let headers: BasicHeaders = {}

  switch (type) {
    case 'FormData':
      if (hasFormData) {
        httpBody = appendDataToFormData(option.body, new FormData())
      } else {
        const formData = new (require('form-data'))()
        httpBody = appendDataToFormData(option.body, formData)
        headers = formData.getHeaders()
      }
      break
    case 'URLSearchParams':
      httpBody = dataToURLString(option.body)
      headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
      break
    case 'ArrayBuffer':
    case 'string':
    case 'Blob':
    case 'any':
      httpBody = option.body
      break
    default:
      httpBody = JSON.stringify(option.body)
      headers['Content-Type'] = 'application/json;charset=utf-8'
      break
  }

  return { httpBody, ...option, headers: { ...headers, ...option.headers } }
}

const send = async <T = void, U = BasicHeaders, V = HttpStatusOk>(
  client: typeof fetch,
  method: HttpMethod,
  baseURL: string,
  url: string,
  resType: 'json' | 'text' | 'arrayBuffer' | 'blob' | 'formData' | 'void',
  params?: AspidaParams,
  type?: RequestType
) => {
  const request = optionToRequest(params, type)
  const res = await client(
    `${baseURL}${url}${
      request?.query ? `?${dataToURLString(request.query)}` : ''
    }`,
    {
      method,
      ...request?.config,
      body: request?.httpBody,
      headers: { ...request?.config?.headers, ...request?.headers }
    }
  )

  return {
    status: res.status as any,
    headers: headersToObject(res.headers),
    body: resType === 'void' ? undefined : await res[resType]()
  } as { status: V, headers: U, body: T }
}

const api = (init?: { baseURL?: string; fetch?: typeof fetch; config?: RequestInit}) => {
  const f = init?.fetch ?? fetch
  const prefix = (init?.baseURL ?? '').replace(/\/$/, '')
  const PATH0 = '/v1.1/'
  const PATH1 = '/v1.1/2/'
  const PATH2 = '/'
  const PATH3 = '/entries.json/'
  const PATH4 = '/test-4/'
  const PATH5 = '/test-4/fuga aa/'
  const PATH6 = '/v1.1/3.1/'
  const PATH7 = '/v1.1/users/'
  const GET = 'GET'
  const POST = 'POST'
  const PUT = 'PUT'
  const DELETE = 'DELETE'

  return {
    $2: {
      _hogeId: (val1: number | string) => {
        const prefix1 = `${PATH1}${val1}`

        return {
          $get: (option?: { config?: RequestInit }) =>
            send<Methods1['get']['resBody']>(f, GET, prefix, `${prefix1}${PATH2}`, 'json', option),
          $path: () => `${prefix}${prefix1}${PATH2}`
        }
      },
      _hogeId_number: (val1: number) => {
        const prefix1 = `${PATH1}${val1}`

        return {
          $get: (option: { query?: Methods2['get']['query'], headers: Methods2['get']['reqHeaders'], config?: RequestInit }) =>
            send<Methods2['get']['resBody']>(f, GET, prefix, `${prefix1}${PATH2}`, 'json', option),
          $path: (option?: { method?: 'get'; query: Methods2['get']['query'] }) =>
            `${prefix}${prefix1}${PATH2}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
        }
      },
      _hogeId_string: (val1: string) => {
        const prefix1 = `${PATH1}${val1}`

        return {
          entries_json: {
            $get: (option?: { config?: RequestInit }) =>
              send<Methods3['get']['resBody']>(f, GET, prefix, `${prefix1}${PATH3}`, 'json', option),
            $path: () => `${prefix}${prefix1}${PATH3}`
          },
          test_4: {
            /**
             * _fugaId comment
             */
            _fugaId: (val3: number | string) => {
              const prefix3 = `${prefix1}${PATH4}${val3}`

              return {
                $get: (option?: { query?: Methods5['get']['query'], config?: RequestInit }) =>
                  send<Methods5['get']['resBody']>(f, GET, prefix, `${prefix3}${PATH2}`, 'json', option),
                $post: (option: { body?: Methods5['post']['reqBody'], query: Methods5['post']['query'], config?: RequestInit }) =>
                  send<Methods5['post']['resBody']>(f, POST, prefix, `${prefix3}${PATH2}`, 'json', option),
                $put: (option: { query: Methods5['put']['query'], config?: RequestInit }) =>
                  send<Methods5['put']['resBody']>(f, PUT, prefix, `${prefix3}${PATH2}`, 'json', option),
                /**
                 * _fugaId delete method
                 * @returns _fugaId resBody
                 */
                $delete: (option: { query: Methods5['delete']['query'], config?: RequestInit }) =>
                  send<Methods5['delete']['resBody']>(f, DELETE, prefix, `${prefix3}${PATH2}`, 'json', option),
                $path: (option?: { method?: 'get'; query: Methods5['get']['query'] } | { method: 'post'; query: Methods5['post']['query'] } | { method: 'put'; query: Methods5['put']['query'] } | { method: 'delete'; query: Methods5['delete']['query'] }) =>
                  `${prefix}${prefix3}${PATH2}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
              }
            },
            fuga_aa: {
              $get: (option: { query: Methods6['get']['query'], config?: RequestInit }) =>
                send<Methods6['get']['resBody']>(f, GET, prefix, `${prefix1}${PATH5}`, 'json', option),
              $post: (option: { body?: Methods6['post']['reqBody'], query: Methods6['post']['query'], config?: RequestInit }) =>
                send<Methods6['post']['resBody']>(f, POST, prefix, `${prefix1}${PATH5}`, 'json', option),
              $put: (option: { query: Methods6['put']['query'], config?: RequestInit }) =>
                send<Methods6['put']['resBody']>(f, PUT, prefix, `${prefix1}${PATH5}`, 'json', option),
              $delete: (option: { body: Methods6['delete']['reqBody'], query: Methods6['delete']['query'], config?: RequestInit }) =>
                send<Methods6['delete']['resBody']>(f, DELETE, prefix, `${prefix1}${PATH5}`, 'json', option),
              $path: (option?: { method?: 'get'; query: Methods6['get']['query'] } | { method: 'post'; query: Methods6['post']['query'] } | { method: 'put'; query: Methods6['put']['query'] } | { method: 'delete'; query: Methods6['delete']['query'] }) =>
                `${prefix}${prefix1}${PATH5}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
            },
            $get: (option: { query: Methods4['get']['query'], config?: RequestInit }) =>
              send<void>(f, GET, prefix, `${prefix1}${PATH4}`, 'void', option),
            $post: (option?: { body?: Methods4['post']['reqBody'], query?: Methods4['post']['query'], config?: RequestInit }) =>
              send<void>(f, POST, prefix, `${prefix1}${PATH4}`, 'void', option),
            $put: (option?: { query?: Methods4['put']['query'], config?: RequestInit }) =>
              send<Methods4['put']['resBody']>(f, PUT, prefix, `${prefix1}${PATH4}`, 'json', option),
            $delete: (option: { query: Methods4['delete']['query'], config?: RequestInit }) =>
              send<Methods4['delete']['resBody']>(f, DELETE, prefix, `${prefix1}${PATH4}`, 'json', option),
            $path: (option?: { method?: 'get'; query: Methods4['get']['query'] } | { method: 'post'; query: Methods4['post']['query'] } | { method: 'put'; query: Methods4['put']['query'] } | { method: 'delete'; query: Methods4['delete']['query'] }) =>
              `${prefix}${prefix1}${PATH4}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
          }
        }
      }
    },
    /**
     * 3.1 comment
     */
    $3_1: {
      /**
       * 3.1 get method comment
       * @param option.headers - 3.1 reqHeaders
       */
      $get: (option?: { query?: Methods7['get']['query'], headers?: Methods7['get']['reqHeaders'], config?: RequestInit }) =>
        send<Methods7['get']['resBody']>(f, GET, prefix, PATH6, 'json', option),
      $post: (option: { body?: Methods7['post']['reqBody'], query: Methods7['post']['query'], config?: RequestInit }) =>
        send<Methods7['post']['resBody']>(f, POST, prefix, PATH6, 'json', option, 'URLSearchParams'),
      $path: (option?: { method?: 'get'; query: Methods7['get']['query'] } | { method: 'post'; query: Methods7['post']['query'] }) =>
        `${prefix}${PATH6}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
    },
    _articleId_json: (val0: number | string) => {
      const prefix0 = `${PATH0}${val0}.json`

      return {
        $get: (option?: { config?: RequestInit }) =>
          send<Methods8['get']['resBody']>(f, GET, prefix, `${prefix0}${PATH2}`, 'json', option),
        $path: () => `${prefix}${prefix0}${PATH2}`
      }
    },
    users: {
      _userId: (val1: string) => {
        const prefix1 = `${PATH7}${val1}`

        return {
          $get: (option: { query: Methods9['get']['query'], headers: Methods9['get']['reqHeaders'], config?: RequestInit }) =>
            send<Methods9['get']['resBody']>(f, GET, prefix, `${prefix1}${PATH2}`, 'json', option),
          $post: (option: { query: Methods9['post']['query'], config?: RequestInit }) =>
            send<Methods9['post']['resBody']>(f, POST, prefix, `${prefix1}${PATH2}`, 'json', option),
          $path: (option?: { method?: 'get'; query: Methods9['get']['query'] } | { method: 'post'; query: Methods9['post']['query'] }) =>
            `${prefix}${prefix1}${PATH2}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
        }
      }
    },
    $get: (option?: { query?: Methods0['get']['query'], config?: RequestInit }) =>
      send<Methods0['get']['resBody'], BasicHeaders, Methods0['get']['status']>(f, GET, prefix, PATH0, 'json', option),
    $path: (option?: { method?: 'get'; query: Methods0['get']['query'] }) =>
      `${prefix}${PATH0}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
