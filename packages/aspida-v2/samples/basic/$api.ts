/* eslint-disable */
import type { Methods as Methods0 } from '.'
import type { Methods as Methods1 } from './_sampleId@number.json'
import type { Methods as Methods2 } from './foo%3Abar'
import type { Methods as Methods3 } from './foo%3Abar/_bar_id@string.json'
import type { Methods as Methods4 } from './foo%3Abar/_fooId@number%40create'
import type { Methods as Methods5 } from './v1.1'
import type { Methods as Methods6 } from './v1.1/2/_hogeId'
import type { Methods as Methods7 } from './v1.1/2/_hogeId@number'
import type { Methods as Methods8 } from './v1.1/2/_hogeId@string/entries.json'
import type { Methods as Methods9 } from './v1.1/2/_hogeId@string/test-4'
import type { Methods as Methods10 } from './v1.1/2/_hogeId@string/test-4/_fugaId'
import type { Methods as Methods11 } from './v1.1/2/_hogeId@string/test-4/fuga aa'
import type { Methods as Methods12 } from './v1.1/3.1'
import type { Methods as Methods13 } from './v1.1/_articleId.json'
import type { Methods as Methods14 } from './v1.1/users/_userId@string'
import type { Methods as Methods15 } from './v2.0'

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
  const prefix = (init?.baseURL ?? 'https://example.com/api/').replace(/\/$/, '')
  const PATH0 = '/foo:bar'
  const PATH1 = '/v1.1'
  const PATH2 = '/v1.1/2'
  const PATH3 = '/entries.json'
  const PATH4 = '/test-4'
  const PATH5 = '/test-4/fuga aa'
  const PATH6 = '/v1.1/3.1'
  const PATH7 = '/v1.1/users'
  const PATH8 = '/v2.0'
  const GET = 'GET'
  const POST = 'POST'
  const PUT = 'PUT'
  const DELETE = 'DELETE'

  return {
    _sampleId_json: (val0: number) => {
      const prefix0 = `/${val0}.json`

      return {
        $get: (option?: { config?: RequestInit }) =>
          send<Methods1['get']['resBody']>(f, GET, prefix, prefix0, 'json', option),
        $path: () => `${prefix}${prefix0}`
      }
    },
    foo_bar: {
      _bar_id_json: (val1: string) => {
        const prefix1 = `${PATH0}/${val1}.json`

        return {
          $get: (option?: { config?: RequestInit }) =>
            send<Methods3['get']['resBody']>(f, GET, prefix, prefix1, 'text', option),
          $path: () => `${prefix}${prefix1}`
        }
      },
      _fooId_create: (val1: number) => {
        const prefix1 = `${PATH0}/${val1}@create`

        return {
          $get: (option?: { config?: RequestInit }) =>
            send<Methods4['get']['resBody']>(f, GET, prefix, prefix1, 'text', option),
          $path: () => `${prefix}${prefix1}`
        }
      },
      /**
       * @deprecated `_fooId_40create` has been deprecated.
       * Use `_fooId_create` instead
       */
      _fooId_40create: (val1: number) => {
        const prefix1 = `${PATH0}/${val1}@create`

        return {
          $get: (option?: { config?: RequestInit }) =>
            send<Methods4['get']['resBody']>(f, GET, prefix, prefix1, 'text', option),
          $path: () => `${prefix}${prefix1}`
        }
      },
      $get: (option?: { config?: RequestInit }) =>
        send<Methods2['get']['resBody']>(f, GET, prefix, PATH0, 'text', option),
      $path: () => `${prefix}${PATH0}`
    },
    /**
     * @deprecated `foo_3Abar` has been deprecated.
     * Use `foo_bar` instead
     */
    foo_3Abar: {
      _bar_id_json: (val1: string) => {
        const prefix1 = `${PATH0}/${val1}.json`

        return {
          $get: (option?: { config?: RequestInit }) =>
            send<Methods3['get']['resBody']>(f, GET, prefix, prefix1, 'text', option),
          $path: () => `${prefix}${prefix1}`
        }
      },
      _fooId_create: (val1: number) => {
        const prefix1 = `${PATH0}/${val1}@create`

        return {
          $get: (option?: { config?: RequestInit }) =>
            send<Methods4['get']['resBody']>(f, GET, prefix, prefix1, 'text', option),
          $path: () => `${prefix}${prefix1}`
        }
      },
      /**
       * @deprecated `_fooId_40create` has been deprecated.
       * Use `_fooId_create` instead
       */
      _fooId_40create: (val1: number) => {
        const prefix1 = `${PATH0}/${val1}@create`

        return {
          $get: (option?: { config?: RequestInit }) =>
            send<Methods4['get']['resBody']>(f, GET, prefix, prefix1, 'text', option),
          $path: () => `${prefix}${prefix1}`
        }
      },
      $get: (option?: { config?: RequestInit }) =>
        send<Methods2['get']['resBody']>(f, GET, prefix, PATH0, 'text', option),
      $path: () => `${prefix}${PATH0}`
    },
    v1_1: {
      $2: {
        _hogeId: (val2: number | string) => {
          const prefix2 = `${PATH2}/${val2}`

          return {
            $get: (option?: { config?: RequestInit }) =>
              send<Methods6['get']['resBody']>(f, GET, prefix, prefix2, 'json', option),
            $path: () => `${prefix}${prefix2}`
          }
        },
        _hogeId_number: (val2: number) => {
          const prefix2 = `${PATH2}/${val2}`

          return {
            $get: (option: { query?: Methods7['get']['query'], headers: Methods7['get']['reqHeaders'], config?: RequestInit }) =>
              send<Methods7['get']['resBody']>(f, GET, prefix, prefix2, 'json', option),
            $path: (option?: { method?: 'get'; query: Methods7['get']['query'] }) =>
              `${prefix}${prefix2}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
          }
        },
        _hogeId_string: (val2: string) => {
          const prefix2 = `${PATH2}/${val2}`

          return {
            entries_json: {
              $get: (option?: { config?: RequestInit }) =>
                send<Methods8['get']['resBody']>(f, GET, prefix, `${prefix2}${PATH3}`, 'json', option),
              $path: () => `${prefix}${prefix2}${PATH3}`
            },
            test_4: {
              _fugaId: (val4: number | string) => {
                const prefix4 = `${prefix2}${PATH4}/${val4}`

                return {
                  $get: (option?: { query?: Methods10['get']['query'], config?: RequestInit }) =>
                    send<Methods10['get']['resBody']>(f, GET, prefix, prefix4, 'json', option),
                  $post: (option: { body?: Methods10['post']['reqBody'], query: Methods10['post']['query'], config?: RequestInit }) =>
                    send<Methods10['post']['resBody']>(f, POST, prefix, prefix4, 'json', option),
                  $put: (option: { query: Methods10['put']['query'], config?: RequestInit }) =>
                    send<Methods10['put']['resBody']>(f, PUT, prefix, prefix4, 'json', option),
                  $delete: (option: { query: Methods10['delete']['query'], config?: RequestInit }) =>
                    send<Methods10['delete']['resBody']>(f, DELETE, prefix, prefix4, 'json', option),
                  $path: (option?: { method?: 'get'; query: Methods10['get']['query'] } | { method: 'post'; query: Methods10['post']['query'] } | { method: 'put'; query: Methods10['put']['query'] } | { method: 'delete'; query: Methods10['delete']['query'] }) =>
                    `${prefix}${prefix4}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
                }
              },
              fuga_aa: {
                $get: (option: { query: Methods11['get']['query'], config?: RequestInit }) =>
                  send<Methods11['get']['resBody']>(f, GET, prefix, `${prefix2}${PATH5}`, 'json', option),
                $post: (option: { body?: Methods11['post']['reqBody'], query: Methods11['post']['query'], config?: RequestInit }) =>
                  send<Methods11['post']['resBody']>(f, POST, prefix, `${prefix2}${PATH5}`, 'json', option),
                $put: (option: { query: Methods11['put']['query'], config?: RequestInit }) =>
                  send<Methods11['put']['resBody']>(f, PUT, prefix, `${prefix2}${PATH5}`, 'json', option),
                $delete: (option: { body: Methods11['delete']['reqBody'], query: Methods11['delete']['query'], config?: RequestInit }) =>
                  send<Methods11['delete']['resBody']>(f, DELETE, prefix, `${prefix2}${PATH5}`, 'json', option),
                $path: (option?: { method?: 'get'; query: Methods11['get']['query'] } | { method: 'post'; query: Methods11['post']['query'] } | { method: 'put'; query: Methods11['put']['query'] } | { method: 'delete'; query: Methods11['delete']['query'] }) =>
                  `${prefix}${prefix2}${PATH5}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
              },
              $get: (option: { query: Methods9['get']['query'], config?: RequestInit }) =>
                send<void>(f, GET, prefix, `${prefix2}${PATH4}`, 'void', option),
              $post: (option?: { body?: Methods9['post']['reqBody'], query?: Methods9['post']['query'], config?: RequestInit }) =>
                send<void>(f, POST, prefix, `${prefix2}${PATH4}`, 'void', option),
              $put: (option?: { query?: Methods9['put']['query'], config?: RequestInit }) =>
                send<Methods9['put']['resBody']>(f, PUT, prefix, `${prefix2}${PATH4}`, 'json', option),
              $delete: (option: { query: Methods9['delete']['query'], config?: RequestInit }) =>
                send<Methods9['delete']['resBody']>(f, DELETE, prefix, `${prefix2}${PATH4}`, 'json', option),
              $path: (option?: { method?: 'get'; query: Methods9['get']['query'] } | { method: 'post'; query: Methods9['post']['query'] } | { method: 'put'; query: Methods9['put']['query'] } | { method: 'delete'; query: Methods9['delete']['query'] }) =>
                `${prefix}${prefix2}${PATH4}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
            }
          }
        }
      },
      $3_1: {
        $get: (option?: { query?: Methods12['get']['query'], headers?: Methods12['get']['reqHeaders'], config?: RequestInit }) =>
          send<Methods12['get']['resBody']>(f, GET, prefix, PATH6, 'json', option),
        $post: (option: { body?: Methods12['post']['reqBody'], query: Methods12['post']['query'], config?: RequestInit }) =>
          send<Methods12['post']['resBody']>(f, POST, prefix, PATH6, 'json', option, 'URLSearchParams'),
        $path: (option?: { method?: 'get'; query: Methods12['get']['query'] } | { method: 'post'; query: Methods12['post']['query'] }) =>
          `${prefix}${PATH6}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
      },
      _articleId_json: (val1: number | string) => {
        const prefix1 = `${PATH1}/${val1}.json`

        return {
          $get: (option?: { config?: RequestInit }) =>
            send<Methods13['get']['resBody']>(f, GET, prefix, prefix1, 'json', option),
          $path: () => `${prefix}${prefix1}`
        }
      },
      users: {
        _userId: (val2: string) => {
          const prefix2 = `${PATH7}/${val2}`

          return {
            $get: (option: { query: Methods14['get']['query'], headers: Methods14['get']['reqHeaders'], config?: RequestInit }) =>
              send<Methods14['get']['resBody']>(f, GET, prefix, prefix2, 'json', option),
            $post: (option: { query: Methods14['post']['query'], config?: RequestInit }) =>
              send<Methods14['post']['resBody']>(f, POST, prefix, prefix2, 'json', option),
            $path: (option?: { method?: 'get'; query: Methods14['get']['query'] } | { method: 'post'; query: Methods14['post']['query'] }) =>
              `${prefix}${prefix2}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
          }
        }
      },
      $get: (option?: { query?: Methods5['get']['query'], config?: RequestInit }) =>
        send<Methods5['get']['resBody'], BasicHeaders, Methods5['get']['status']>(f, GET, prefix, PATH1, 'json', option),
      $path: (option?: { method?: 'get'; query: Methods5['get']['query'] }) =>
        `${prefix}${PATH1}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
    },
    v2_0: {
      $get: (option: { query: Methods15['get']['query'], headers: Methods15['get']['reqHeaders'], config?: RequestInit }) =>
        send<Methods15['get']['resBody'], Methods15['get']['resHeaders'], Methods15['get']['status']>(f, GET, prefix, PATH8, 'text', option),
      $path: (option?: { method?: 'get'; query: Methods15['get']['query'] }) =>
        `${prefix}${PATH8}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
    },
    $get: (option?: { query?: Methods0['get']['query'], headers?: Methods0['get']['reqHeaders'], config?: RequestInit }) =>
      send<Methods0['get']['resBody']>(f, GET, prefix, '', 'formData', option),
    $post: (option: { body: Methods0['post']['reqBody'], query: Methods0['post']['query'], headers?: Methods0['post']['reqHeaders'], config?: RequestInit }) =>
      send<Methods0['post']['resBody']>(f, POST, prefix, '', 'arrayBuffer', option),
    $put: (option: { query: Methods0['put']['query'], config?: RequestInit }) =>
      send<Methods0['put']['resBody'], Methods0['put']['resHeaders'], Methods0['put']['status']>(f, PUT, prefix, '', 'json', option),
    $delete: (option: { query: Methods0['delete']['query'], config?: RequestInit }) =>
      send<void, Methods0['delete']['resHeaders'], Methods0['delete']['status']>(f, DELETE, prefix, '', 'void', option),
    $path: (option?: { method?: 'get'; query: Methods0['get']['query'] } | { method: 'post'; query: Methods0['post']['query'] } | { method: 'put'; query: Methods0['put']['query'] } | { method: 'delete'; query: Methods0['delete']['query'] }) =>
      `${prefix}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
