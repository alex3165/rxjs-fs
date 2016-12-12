import { Observable, Observer } from 'rxjs'
import * as fs from 'fs'
import mkdir from './mkdir'

const writeFile = (path: string, file: string) => {
  const dirs = path.split('/')
  if (dirs[0] === '.') {
    dirs.pop()
  }

  const makeDirsObs = Observable.from(dirs)
    .scan((a, b) => `${a}/${b}`)
    .flatMap(mkdir)
    .onErrorResumeNext(Observable.empty())

  const writeFileObs = Observable.create((observer: Observer<string>) => {

    fs.writeFile(path, file, (err: Error, file: string) => {

      if (err) {
        return observer.error(err)
      }

      observer.next(file)
      observer.complete()
    })
  })

  return makeDirsObs.ignoreElements().concat(writeFileObs)
}

export default writeFile
