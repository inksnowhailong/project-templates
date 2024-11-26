// 定义组合式函数的返回类型
interface UseCaptcha {
  countdown: Ref<number>;
  isCounting: Ref<boolean>;
  startCountdown: () => void;
}

export function useCaptcha(): UseCaptcha {
  // 定义验证码倒计时的状态
  const countdown = ref<number>(0);
  const isCounting = ref<boolean>(false);

  // 启动倒计时的函数
  const startCountdown = () => {
    if (isCounting.value) return;

    // 倒计时开始
    isCounting.value = true;
    countdown.value = 60;

    // 使用 setInterval 实现倒计时
    const interval = setInterval(() => {
      countdown.value -= 1;
      if (countdown.value <= 0) {
        clearInterval(interval);
        isCounting.value = false; // 倒计时结束，允许再次获取验证码
      }
    }, 1000);
  };

  return {
    countdown,
    isCounting,
    startCountdown,
  };
}

/**
 * 获取当前时间
 */

export function getCurrentTime(dateNum?: number): string {
  const date = new Date(dateNum || Date.now());
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour =`0${date.getHours()}`.slice(-2); ;
  const minute = `0${date.getMinutes()}`.slice(-2);
  const second = `0${date.getSeconds()}`.slice(-2);

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

// 防抖
export function debounce(fn: Function, delay: number) {
  let timer: any = null;
  return function (this: any) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, delay);
  };
}
