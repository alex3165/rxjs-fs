import { Observable, Observer } from 'rxjs'
import * as fs from 'fs'

const mkdir = (path: string) => (
  Observable.create((observer: Observer<string>) => {
    const complete = (err?: Error) => {
      if (err) {
        return observer.error(err)
      }

      observer.next(path)
      observer.complete()
    }

    const checkExistence = (exists: boolean) => (
      exists ? complete() : fs.mkdir(path, complete)
    )

    fs.exists(path, checkExistence)
  })
)

export default mkdir
