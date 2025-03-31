import { AsyncBase } from "../Application";
import { RequestMethod } from "../DTO";

export class Login extends AsyncBase {
  request = this.Requester.request;
  login(data: any) {
    return this.request<string,Record<string,any>>({
      url: "/login",
      method: RequestMethod.POST,
      data
    });
  }
}
