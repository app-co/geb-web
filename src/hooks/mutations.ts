import { useMutation, useQueryClient } from "react-query";
import { showMessage } from "./messageError";
import { PostFetchs } from "./fetchs/posts";
import { GetFetchs } from "./fetchs/gets";
import { PutFetchs } from "./fetchs/put";
import { DelteFetchs } from "./fetchs/delte";
import { Querys } from "./querys";

export class Mutations {
  constructor(
    private get: GetFetchs,
    private post: PostFetchs,
    private put: PutFetchs,
    private del: DelteFetchs,
  ) {

  }

  private resetClient(key: string) {
    const client = useQueryClient()
    return client.invalidateQueries(key)
    // client.resetQueries(key)
  }

  public registerUser() {
    return useMutation(this.post.registerUser, {
      onError: (error) => showMessage(error)
    })
  }

  public session() {
    return useMutation(this.post.session, {
      onError: (error) => showMessage(error),
    })
  }

  public getOnStorage() {
    return useMutation(this.get.getOnStorage)
  }

  public saveOnStorage() {
    return useMutation(this.post.saveOnStorage)
  }

  public deleteOnStorage() {
    return useMutation(this.del.deleteOnStorage)
  }

  public getUserById() {
    return useMutation(this.get.userById, {
      onError: (error) => showMessage(error)
    })
  }

  public registerRelation() {
    const client = useQueryClient()
    return useMutation(this.post.registerRelation, {
      onSuccess: () => {
        client.invalidateQueries('relationsMetricasUser')
        client.invalidateQueries('relationNotvalidBytype')
      },
      onError: (error) => showMessage(error)
    })
  }

  public aproveRelation() {
    const client = useQueryClient()
    return useMutation(this.put.validateRelationship, {
      onError: (error) => showMessage(error),
      onSuccess: () => {
        client.invalidateQueries('relationsMetricasUser')
        client.invalidateQueries('relationForAprovation')
        client.invalidateQueries('relationByReceptor')
        client.invalidateQueries('relationNotvalidBytype')
      }
    })
  }

  public updateProfile() {
    return useMutation(this.post.registerProfile, {
      onError: (error) => showMessage(error),
    })
  }

  public updateUser() {
    return useMutation(this.put.updateUser, {
      onError: (error) => showMessage(error),
    })
  }

  public delRelation() {
    const client = useQueryClient()
    return useMutation(this.del.deleteRelation, {
      onSuccess: () => {
        client.invalidateQueries('relationsMetricasUser')
        client.invalidateQueries('relationForAprovation')
        client.invalidateQueries('relationByReceptor')
        client.invalidateQueries('relationNotvalidBytype')
      },
      onError: (error) => showMessage(error)
    })
  }

  public avaliation() {
    const client = useQueryClient()

    return useMutation(this.post.registerStar, {
      onError: (error) => showMessage(error),
      onSuccess: () => {
        client.invalidateQueries('userByHub')

      }
    })
  }

}