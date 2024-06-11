# 基于官方的node镜像
FROM node:18 AS build

# 设置工作目录
WORKDIR /webProject

# 将你的项目文件复制到Docker镜像中
COPY . .

# 安装pnpm
RUN npm install -g pnpm

# 安装项目依赖
RUN pnpm install

# 构建项目
RUN npm run build

# 使用nginx镜像
FROM nginx:stable-alpine

# 将构建结果复制到nginx的目录下
COPY --from=build /webProject /app
# 删除 默认的nginx配置文件
RUN rm /etc/nginx/conf.d/default.conf
# 复制自己的配置文件到nginx的conf.d目录下，以使用自己的配置
COPY nginx.conf /etc/nginx/conf.d/
# 暴露端口，使得Docker容器可以访问
EXPOSE 80

# 启动nginx
CMD ["nginx", "-g", "daemon off;"]
