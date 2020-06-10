import axios from 'axios'
import fs from 'fs'
// import {$callApi} from '../../../../app'
class ScheduleService {
  public async reFindBingNewDayImage() {
    return await {url: '我是图片Url'}
  }
  public async reFindAliyunGeoJson() {
    let adcode = 330000
    while (adcode < 340000) {
      const url = `https://geo.datav.aliyun.com/areas_v2/bound/${adcode}.json`
      try {
        if (adcode === 330100) {
          console.log('杭州')
        }
        this.fileDownload(url, adcode + '.json')
      } catch (e) {}
      adcode++
    }
    return '开始加载'
  }

  private fileDownload(url: string, name: string) {
    const filePath = './geojson'
    axios(url, {responseType: 'stream'})
      .then(result => {
        if (name.startsWith('330100')) {
          console.log('hah')
        }

        let writeStream = fs.createWriteStream(`${filePath}/${name}`)
        result.data.pipe(writeStream)
      })
      .catch(_ => {
        if (name.startsWith('330100')) {
          console.log('hah')
        }
        console.log('跳过', name)
      })
  }

  public async checkFolder(path: string, callback = () => {}) {
    await fs.readdir(path, (error, files) => {
      if (error) {
        fs.mkdir(path, function(err) {
          if (err) throw err
          else callback()
        })
      } else {
        callback()
      }
    })
  }
}
export default new ScheduleService()
