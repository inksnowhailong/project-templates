export abstract class LoginBase<T = (...args: any[]) => Promise<any>> {
    public request: T;
    constructor(request: T) {
      this.request = request;
    }

    //    登录相关
    abstract login(...args: any[]): Promise<any>;
    abstract logout(...args: any[]): Promise<any>;
    abstract register(...args: any[]): Promise<any>;

    //   用户信息
    abstract saveUserInfo(...args: any[]): boolean;
    abstract getUserInfo(...args: any[]): Record<string, any> | null;
    abstract requestUserInfo(...args: any[]): Promise<any>;

    //    密码相关
    abstract changePassword(...args: any[]): Promise<any>;
    abstract recoverPassword(...args: any[]): Promise<any>;

    //   Token相关
    abstract saveToken(token: string): void;
    abstract getToken(): string | null;
  }
