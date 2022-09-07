import {lstat, readdir} from 'node:fs/promises'
import {copyFileSync} from 'node:fs'
import {join, resolve} from 'node:path'

const deepReadDir = async (dirPath) => await Promise.all(
  (await readdir(dirPath)).map(async (entity) => {
    const path = join(dirPath, entity)
    return (await lstat(path)).isDirectory() ? await deepReadDir(path) : path
  }),
)


async function copyFiles(){
    (await deepReadDir('./build/client')).flat(Number.POSITIVE_INFINITY)
    .forEach(f=>{
        const src = resolve(f)
        const dest = resolve('dist', f)
        try {
            copyFileSync(src, dest)
        } catch (error) {
            console.log(error);
        }
    })
}

copyFiles()
