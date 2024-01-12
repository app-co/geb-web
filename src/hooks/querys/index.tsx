/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from 'react-query'

import { IRelation } from '../../dtos'
import {
  requestGetAllRelation,
  requestGetAllUsers,
  requestGetMetrics,
} from '../../services/requests'

export function useUser(hub: string) {
  const get = useQuery('get-all-users', () => requestGetAllUsers(hub))

  return { getAllUser: get.data, fetchAllUser: get.refetch }
}

export function useRelation() {
  const get = useQuery('get-all-users', requestGetAllRelation)
  const metric = useQuery('get-metric', requestGetMetrics)

  return {
    getAllRelation: get.data as IRelation[],
    fetchAllRelation: get.refetch,
    getMetric: metric.data,
    fetchMetric: metric.refetch,
  }
}
