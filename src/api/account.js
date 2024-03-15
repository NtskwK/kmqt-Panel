import request from '@/utils/request'

export function getMemberList(params) {
  return request({
    url: '/users/',
    method: 'get',
    params
  })
}

