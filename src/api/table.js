import request from '@/utils/request'

export function getMemberList(params) {
  return request({
    url: '/users/',
    method: 'get',
    params
  })
}


export function getProgramList(params) {
  return request({
    url: '/programs/',
    method: 'get',
    params
  })
}
