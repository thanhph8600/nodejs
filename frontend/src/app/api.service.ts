import axios from "axios";
import { AxiosRequestConfig, AxiosResponse } from 'axios';

class ConnetData {
  private request = axios.create({
    baseURL: 'http://localhost:3000/api/',
    paramsSerializer: (params) => {
      return Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&');
    },
  });

  constructor() {}

  get = async (path: string, options: AxiosRequestConfig = {}) => {
    try {
      const response = await this.request.get(path, options);
      return response.data;
    } catch (error:any) {
      return 0
    }
  };

  async post(path: string, data: any = {}): Promise<any> {
    try {
      const options = {  
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      }};
      const response: AxiosResponse = await this.request.post(path, data, options);
      return response; // Assuming you want to return the response data
    } catch (error:any) {
        return error.response
    }
  }
}

export default new ConnetData