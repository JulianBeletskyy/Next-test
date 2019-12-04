import { API_URL } from '../config'
import fetch from 'isomorphic-unfetch'

const makeJson = async (response, status) => {
  const json = await response.json()
  return Promise.resolve({...json, statusCode: status})
}

const responseHandler = () => async response => {
  const contentType = response.headers.get('content-type')
  if (contentType && contentType.indexOf('application/json') !== -1) {
    const promise = makeJson(response, response.status)
    return promise
  }
  return Promise.resolve({statusCode: response.status})
}

const getHeader = () => ({
  'Content-Type': 'application/json',
  'Accept': 'application/json',
})

export const get = (url) => {
	return fetch(`${API_URL}/${url}`, {
		method: 'get',
		headers: getHeader(),
	})
	.then(responseHandler())
}

export const post = (url, body) => {
	return fetch(`${API_URL}/${url}`, {
		method: 'post',
		headers: getHeader(),
		body: JSON.stringify(body)
	})
	.then(responseHandler())
}

export const put = (url, body) => {
	return fetch(`${API_URL}/${url}`, {
		method: 'put',
		headers: getHeader(),
		body: JSON.stringify(body)
	})
	.then(responseHandler())
}