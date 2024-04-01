import request from '@/utils/request'

export function getProgramList(params) {
  return request({
    url: '/programs/',
    method: 'get',
    params
  })
}
export function getProgram(program_id) {
  return request({
    url: '/programs/' + program_id + '/',
    method: 'get',
  })
}

export function deleteProgramList(program_id) {
  return request({
    url: '/programs/' + program_id + '/',
    method: 'delete',
  })
}

export function createProgramList(data) {
  return request({
    url: '/programs/',
    method: 'post',
    data
  })
}

export function updateProgram(program_id, data) {
  return request({
    url: '/programs/' + program_id + '/',
    method: 'patch',
    data
  })
}
