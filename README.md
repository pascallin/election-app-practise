[toc]

## 投票APP

### 部署运行
##### 环境要求
- docker
- docker-compose
##### 启动命令
`docker-compose up -d`
##### 停止命令
`docker-compose down`

### 测试
```
npm i
npm run test
```

### 技术选型
- http框架使用koa
- 数据库使用mysql，ORM使用knex
- 缓存使用redis
- 数据校验使用joi
- Unit Test使用mocha

### API说明

#### API表格
URL | 方法 | 说明
---|---|---
/election | get | 获取选举信息
/election | put | 更新选举
/election/vote | post | 用户进行选举投票
/election/votes | get | 实时获取选举投票数
/candidate | get | 获取选举候选人列表
/candidate/:id | get | 获取单个候选人信息
/candidate/:id | put | 更新候选人
/candidate/:id | delete | 删除候选人
/user/register | post | 用户注册
/user/validate | get | 用户邮箱验证
/user/login | post | 用户登录

#### API响应格式
成功时
```
{
	code: 20000,
	data: {
		...
	}
}
```
失败时
```
{
	code: 10001 // except 20000
	message: '...'
}
```