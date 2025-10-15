# 后端快速开始

在开始之前，我们假定您已经:
- 熟悉后端开发流程
- 熟悉 Java
- 熟悉数据库，比如 PostgresQL
- 熟悉 Spring全家桶
- 熟悉 Mybatis Plus
- 熟悉 Java 构建工具，比如 Maven

## 准备

参考[环境搭建](environment-setup.md)章节

## 下载项目

```bash
git clone  https://github.com/lishangbu/orange
```

## 新建数据库

如果搭建数据库时没有指定默认数据库，那么需要手动初始化一个orange的数据库。

## 生成JWT密钥对

通过执行scripts下的rsa-key-pair.sh脚本可以生成一对RSA密钥对用于jwt验签。

## 安装依赖

项目推荐使用maven wrapper进行项目管理:

在**项目根目录**运行一次以下命令即可自动验证代码并下载jar依赖:

```bash
./mvnw clean verify
```

## 启动项目

一切正常的话，此时就可以启动项目了，数据库会在启动时自动创建并完成脚本变更。

运行 orange-application/orange-admin-server下的AvalonAdminApplication即可。

默认端口为8080，启动成功后可以通过`http://localhost:8080`访问项目。
