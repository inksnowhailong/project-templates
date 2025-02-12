import { useEffect, useState } from "react";

/**
 * @description: 生成随机字符串
 * @return {*}
 */
export function generateRandomString() {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomString = "";
    for (let i = 0; i < 32; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }
    return randomString;
  }
/**
 * @description: 自定义防抖 Hook
 * @param {*} initialValue
 * @param {*} delay
 * @return {*}
 */
export function useDebouncedState(initialValue: any, delay: number) {
    const [value, setValue] = useState(initialValue);
    const [debouncedValue, setDebouncedValue] = useState(initialValue);

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler); // 清理上一次的 timeout
      };
    }, [value, delay]);

    return [debouncedValue, setValue];
  }

