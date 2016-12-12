import { Observable, Observer } from 'rxjs'
import * as fs from 'fs'

const readFile = (path: string, encoding: string = 'utf-8') => (
  Observable.create((observer: Observer<string>) => {
    fs.readFile(path, encoding, (err: Error, file: string) => {

      if (err) {
        return observer.error(err)
      }

      observer.next(file)
      observer.complete()
    })
  })
)

export default readFile
