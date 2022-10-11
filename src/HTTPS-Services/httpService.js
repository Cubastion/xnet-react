import { trackPromise } from 'react-promise-tracker';
import Authentication from './Authentication';
const joinURL = (baseURL, url) => {
  return `${baseURL}/${url}`;
};

class HttpService {
  loginInfo;
  constructor() {
    this.domain = process.env.NODE_ENV === "production" ? "/api/v1" : "https://eca.cubastion.net/api/v1";
  }
  request(url, method = "POST", data = null, formflag) {
    var headers = {}
    if (!formflag){
      headers = {
        Accept: "application/json",
        "Content-type": "application/json",
        'Cache-Control': 'no-cache',
      };
    }
    url = joinURL(this.domain, url);
    const options = {
      headers,
      method,
      redirect: "follow",
    };
    if (localStorage.getItem("AUTH_TOKEN")) {
      headers.token = localStorage.getItem("AUTH_TOKEN");
    }
    if (data && formflag) {
      options.body = data;
    } else if (data) options.body = JSON.stringify({ ...data });
    return fetch(url, options);
  }

  async post(url, data, formflag = false,formData=false) {
    const method = "POST";
    const res = await this.request(url, method, data, formflag,formData);
    let response=await res.json();
    await new Authentication().validate(response);
    return response;
  }
  async get(url, id = null) {
    const method = "GET";
    if (id) url = `${url}/${id}`;
    const res = await trackPromise(this.request(url, method));
    let response=await res.json();
    await new Authentication().validate(response);
    return response;
  }
  async put(url, data, formflag = false) {
    console.log(data);
    const method = "PUT";
    const res = await trackPromise(this.request(url, method, data, formflag));
    let response=await res.json();
    await new Authentication().validate(response);
    return response;
  }
  async delete(url, formflag = false) {
    const method = "DELETE";
    const res = await trackPromise(this.request(url, method, formflag));
    let response = await res.json();
    await new Authentication().validate(response);
    return response;
  }
  async search(url, type) {
    const method = "GET";
    let res="";
    if (type) {res = await this.request(url, method)};
    if (!type) {res = await trackPromise(this.request(url, method))};
    let response=await res.json();
    await new Authentication().validate(response);
    return response;
  }
  // getWL ---> get without loader
  async getWL(url, id = null) {
    const method = "GET";
    if (id) url = `${url}/${id}`;
    const res = await this.request(url, method);
    let response=await res.json();
    await new Authentication().validate(response);
    return response;
  }

}
export default HttpService;
