/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from 'react-query'

import { IExtratoUser, IRelation } from '../../dtos'
import {
  requestExtratoUser,
  requestGetAllRelation,
  requestGetAllUsers,
  requestGetMetrics,
} from '../../services/requests'

export function useUser(hub: string) {
  const get = useQuery('get-all-users', () => requestGetAllUsers(hub))

  return { getAllUser: get.data, fetchAllUser: get.refetch }
}

export function useExtratoUser(userId: string) {
  const get = useQuery('get-metric-user', () => requestExtratoUser(userId))

  return {
    getEtrato: get.data as IExtratoUser,
    isLoading: get.isLoading,
    fetchAllUser: get.refetch,
  }
}

export function useRelation() {
  const get = useQuery('get-all-users', requestGetAllRelation)
  const metric = useQuery('get-metric', requestGetMetrics)

  return {
    getAllRelation: get.data as IRelation[],
    loadingMetric: metric.isLoading,
    loadingUser: get.isLoading,
    fetchAllRelation: get.refetch,
    getMetric: metric.data,
    fetchMetric: metric.refetch,
  }
}
