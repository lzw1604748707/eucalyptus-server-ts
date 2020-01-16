import axios, {AxiosRequestConfig, AxiosPromise, AxiosInstance} from 'axios'

export interface ApiRequestConfig extends AxiosRequestConfig {
  api: string
  param: Record<string, any>
  config: AxiosRequestConfig
}
export default class CallApi {
  /**
   *
   * @param config Axios配置参数
   */
  public constructor(config: AxiosRequestConfig) {
    axios.defaults = {...axios.defaults, ...config}
  }

  /**
   * 暴露出去的请求方法
   * @param api  请求地址
   * @method method  请求类型
   * @param param  请求参数
   * @param config  请求其他配置（参考Axios）
   */
  public callApi({api, method = 'post', param, config = {}}: ApiRequestConfig) {
    const $ = axios.create(config)
    this.addInterceptors($)
    const requestData = ['post', 'put', 'patch'].includes(method)
      ? {data: param}
      : {params: param}
    return $({url: api, method, ...requestData})
  }

  /**
   *
   * @param instance axios的实例
   */
  private addInterceptors(instance: AxiosInstance) {
    // 请求拦截器
    instance.interceptors.request.use(
      config => config,
      error => Promise.reject(error)
    )

    // 响应拦截器
    instance.interceptors.response.use(
      // 请求成功
      res => Promise.resolve(res.data),
      // 请求失败
      error => {
        const {response} = error
        if (response) {
          // 请求已发出，但是不在2xx的范围
          console.error(`状态：${response.status},消息：${response.message}`)
          return Promise.reject(response)
        } else {
          return Promise.reject(error)
        }
      }
    )
  }
}
