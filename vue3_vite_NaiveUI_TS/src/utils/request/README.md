> #request文档 [toc]

## 升级日志

1. 增加了返回值的泛型
2. 统一了错误处理
3. 支持部分功能（文件流的获取）
4. 优化了类型提示

## Q&A（问与答）

### 如何请求后端文件流格式的接口

```typescript
export const fakeDownloadTest = (
  data = {
    industryInfoLevelThree: '[]',
    parkInfoParkName: '[]',
    keyword: '91310120069385017L',
    page: 1,
    pageSize: 1000
  }
) => {
  return actionRequest(
    {
      baseURL: '',
      url: 'https://xxxxxxxx/down',
      method: 'post',
      data: data,
      responseType: 'blob' // 必要1
    },
    {
      reductDataFormat: false // 必要2
    }
  )
}
```

### 如何局部添加请求头

```typescript
return actionRequest(
  {
    url: '/overview/flwBrandingAdvertManage/pcUpLatestAdvert',
    method: 'get',
    params: data,
    headers: {
      'xj-Test': 'xj-test-value'
    }
  },
  customOptions
) as unknown as Promise<R>
```
