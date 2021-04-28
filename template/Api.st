import request from '@utils/request'

export const get<% name %>s = (params = {}) => {
  return request({
    url: '/<% name %>s',
    method: 'get',
    params,
  })
}

export const create<% name %> = (data) => {
  return request({
    url: '/<% name %>s',
    method: 'post',
    data,
  })
}

export const get<% name %>Detail = (id: string, params = {}) => {
  return request({
    url: `/<% name %>/${id}`,
    method: 'get',
    params,
  })
}

export const update<% name %> = (id: string, data) => {
  return request({
    url: `/<% name %>/${id}`,
    method: 'put',
    data,
  })
}

export const delete<% name %> = (id: string) => {
  return request({
    url: `/<% name %>/${id}`,
    method: 'delete',
  })
}
