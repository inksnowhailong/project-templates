// src/utils/request.ts

import { RequestOptions, ApiResponse } from "@/common/abstract/AsyncBase";
import { userStore } from "@/store/modules/userStore";

/**
 * 封装的 uni.request 请求函数
 * @param options 请求配置
 * @returns Promise<ApiResponse<T>>
 */
const request = <T = any, R = any>(
  options: RequestOptions<T>
): Promise<ApiResponse<R>> => {
  return new Promise((resolve, reject) => {
    if (options.showLoading) {
      uni.showLoading({ title: "加载中..." });
    }

    uni.request({
      url: options.url,
      method: options.method || "GET",
      data: options.data || {},
      header: {
        "Content-Type": "application/json",
        authorization: "Bearer " + userStore.token,
        ...options.header,
      },
      success: (res) => {
        const { statusCode, data } = res;

        if (statusCode === 200 && (data as ApiResponse<R>).code == 0) {

          resolve(data as ApiResponse<R>);
        } else {
          uni.showToast({
            title: `${(data as ApiResponse<R>).message}`,
            icon: "none",
          });
          console.log('error :>> ', data);
          reject(data);
        }
      },
      fail: (error) => {
        uni.showToast({ title: "请求失败", icon: "none" });
        reject(error);
      },
      complete: () => {
        if (options.showLoading) {
          uni.hideLoading();
        }
      },
    });
  });
};

export default request;
