import fs from 'fs'
import path from 'path'
export const flatDirList = (dir: fs.PathLike, encode = 'utf-8'): string[] => {
  let fileUrlList: string[] = []
  const fileList = fs.readdirSync(dir, encode)
  fileList.forEach((file: string | Buffer) => {
    const fileUrl = dir + '' + file
    const stats = fs.lstatSync(fileUrl)
    if (stats.isDirectory()) {
      const childrenFileUrlList = flatDirList(fileUrl + '/')
      fileUrlList = [...fileUrlList, ...childrenFileUrlList]
    } else {
      fileUrlList.push(fileUrl)
    }
  })
  return fileUrlList
}

export const loadModules = async (fileUrlList: string[]): Promise<any[]> => {
  let moduleList: any[] = []
  const fileList = fileUrlList.map(url => ({
    name: path.basename(url, '.ts'),
    url: url.split('.') && url[0]
  }))

  for (const item of fileList) {
    moduleList.push(await import(item.url))
  }
  return moduleList
}
