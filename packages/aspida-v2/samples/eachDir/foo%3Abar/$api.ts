/* eslint-disable */
import type { Methods as Methods0 } from '.'
import type { Methods as Methods1 } from './_bar_id@string.json'
import type { Methods as Methods2 } from './_fooId@number%40create'

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
  const PATH0 = '/foo:bar/'
  const PATH1 = '/'
  const GET = 'GET'

  return {
    _bar_id_json: (val0: string) => {
      const prefix0 = `${PATH0}${val0}.json`

      return {
        $get: (option?: { config?: RequestInit }) =>
          send<Methods1['get']['resBody']>(f, GET, prefix, `${prefix0}${PATH1}`, 'text', option),
        $path: () => `${prefix}${prefix0}${PATH1}`
      }
    },
    _fooId_create: (val0: number) => {
      const prefix0 = `${PATH0}${val0}@create`

      return {
        $get: (option?: { config?: RequestInit }) =>
          send<Methods2['get']['resBody']>(f, GET, prefix, `${prefix0}${PATH1}`, 'text', option),
        $path: () => `${prefix}${prefix0}${PATH1}`
      }
    },
    /**
     * @deprecated `_fooId_40create` has been deprecated.
     * Use `_fooId_create` instead
     */
    _fooId_40create: (val0: number) => {
      const prefix0 = `${PATH0}${val0}@create`

      return {
        $get: (option?: { config?: RequestInit }) =>
          send<Methods2['get']['resBody']>(f, GET, prefix, `${prefix0}${PATH1}`, 'text', option),
        $path: () => `${prefix}${prefix0}${PATH1}`
      }
    },
    $get: (option?: { config?: RequestInit }) =>
      send<Methods0['get']['resBody']>(f, GET, prefix, PATH0, 'text', option),
    $path: () => `${prefix}${PATH0}`
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
