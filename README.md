# 文本网址工具

[中文支持](https://qige.dev) | [英文README](/README-EN.md) | [原作者项目(USPB)](https://github.com/jneeee/uspb)

USPB是**URL缩短器 + 粘贴板**的缩写。

访问者可以提交文本。如果内容以`http`开头，则提供重定向，否则将显示一个包含输入文本的卡片。

它托管在[Deno](https://deno.dev)上，使用[Turso](https://turso.tech/)数据库服务。

[![使用Fresh构建](https://fresh.deno.dev/fresh-badge.svg)](https://fresh.deno.dev)

[演示链接](https://uspb.deno.dev/)

## 使用方法

1. Fork这个仓库
2. 转到[Deno](https://deno.dev)，将其与您的github账户集成。
3. 创建一个项目，使用您刚刚Fork的仓库。
4. 转到[Turso](https://turso.tech/)，这是一个边缘数据库服务。创建您自己的数据库并获取令牌。
```
# 安装turso CLI
curl -sSfL https://get.tur.so/install.sh | bash
# 创建数据库
turso auth login
turso db create mydata

# 获取URL
turso db list

# 获取令牌
turso db tokens create mydata
```
5. 使用以下模式创建表格：
```
# 创建表格
turso db shell mydata
# 在数据库shell中
create table short_url(
  short_code varchar(10) PRIMARY KEY,
  url text not null,
  access_count integer default 0,
  created_at integer default (cast(unixepoch() as int))
);
# 按Ctrl+D退出
```
6. 在Deno项目中设置环境变量，转到项目->设置->环境变量`projects -> Setting -> Environment Variables`。以下是示例：
```
SITE_URL='uspb.deno.dev'
TURSO_URL="libsql://xxx.turso.io"
TURSO_TOKEN="..."
```

## 待办事项(原作者的)

- [ ] 多语言支持(第三方中文汉化已完成)
- [ ] URL访问计数
- [ ] 使用github登录并保存输入历史记录