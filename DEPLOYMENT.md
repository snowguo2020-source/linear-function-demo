# 部署指南：GitHub + Vercel

## 📋 项目已准备就绪

✅ Git 仓库已初始化  
✅ 所有文件已提交  
✅ Vercel 配置文件已创建  

---

## 🚀 部署步骤

### 第一步：创建 GitHub 仓库

1. **打开 GitHub 网站**
   - 访问：https://github.com/new
   - 或点击右上角 `+` 号，选择 `New repository`

2. **填写仓库信息**
   - Repository name（仓库名）：`linear-function-demo`
   - Description（描述）：一次函数 y = kx + b 可视化演示
   - 选择：**Public**（公开）
   - ❌ 不要勾选 "Add a README file"（我们已经有了）
   - ❌ 不要勾选 "Add .gitignore"（我们已经有了）
   - 点击 `Create repository`（创建仓库）

3. **推送代码到 GitHub**

   复制以下命令，在终端中执行：

   ```bash
   cd /Users/clare/Desktop/学生AI营/SnowProject/linear-function-demo
   
   # 添加远程仓库（将 YOUR_USERNAME 替换为你的 GitHub 用户名）
   git remote add origin https://github.com/YOUR_USERNAME/linear-function-demo.git
   
   # 推送代码
   git branch -M main
   git push -u origin main
   ```

   **如果你的 GitHub 用户名是 snowguo2020-source，使用：**
   ```bash
   git remote add origin https://github.com/snowguo2020-source/linear-function-demo.git
   git branch -M main
   git push -u origin main
   ```

---

### 第二步：部署到 Vercel

#### 方式一：通过 Vercel 网站（推荐）

1. **访问 Vercel**
   - 打开：https://vercel.com
   - 点击右上角 `Sign Up` 或 `Log In`
   - 选择 `Continue with GitHub`（用 GitHub 账号登录）

2. **导入项目**
   - 登录后，点击 `Add New...` → `Project`
   - 在 "Import Git Repository" 页面，找到 `linear-function-demo`
   - 点击 `Import`

3. **配置项目**
   - Project Name：`linear-function-demo`（可以自定义）
   - Framework Preset：选择 `Other`
   - Root Directory：`.`（默认）
   - Build Command：留空
   - Output Directory：`.`（默认）
   - 点击 `Deploy`

4. **等待部署完成**
   - Vercel 会自动构建和部署
   - 完成后会显示：🎉 Congratulations!
   - 会生成一个网址，类似：`https://linear-function-demo-xxx.vercel.app`

#### 方式二：通过 Vercel CLI

如果你想使用命令行，可以：

```bash
# 安装 Vercel CLI（如果还没安装）
npm install -g vercel

# 在项目目录下运行
cd /Users/clare/Desktop/学生AI营/SnowProject/linear-function-demo
vercel

# 按提示操作：
# - 用 GitHub 账号登录
# - 确认项目设置
# - 部署完成后会显示网址
```

---

## 🌐 部署后的访问

部署成功后，你会获得：
- **生产环境网址**：`https://linear-function-demo-xxx.vercel.app`
- **自动 HTTPS**：Vercel 自动配置 SSL 证书
- **自动部署**：每次推送到 GitHub 都会自动重新部署

---

## 📝 后续更新

如果需要修改代码并更新网站：

```bash
cd /Users/clare/Desktop/学生AI营/SnowProject/linear-function-demo

# 修改文件后
git add .
git commit -m "更新说明"
git push

# Vercel 会自动检测并重新部署
```

---

## 🔗 快速链接

- **GitHub 新建仓库**：https://github.com/new
- **Vercel 登录**：https://vercel.com/login
- **Vercel 项目导入**：https://vercel.com/new

---

## ❓ 常见问题

### Q: 推送到 GitHub 时需要输入密码？
A: GitHub 已不支持密码认证，需要使用 Personal Access Token (PAT)：
1. 访问：https://github.com/settings/tokens
2. 点击 `Generate new token` → `Generate new token (classic)`
3. 勾选 `repo` 权限
4. 生成后复制 token（只显示一次）
5. 在推送时，用户名输入 GitHub 用户名，密码输入这个 token

### Q: Vercel 部署失败？
A: 检查以下几点：
- 确保 `vercel.json` 文件存在
- 确保所有文件都已推送到 GitHub
- 在 Vercel 设置中检查 Root Directory 是否正确

### Q: 想要自定义域名？
A: 在 Vercel 项目设置中：
1. 进入项目页面
2. 点击 `Settings` → `Domains`
3. 添加你的域名并按提示配置 DNS

---

## 📧 需要帮助？

如果遇到问题，可以：
- 查看 Vercel 文档：https://vercel.com/docs
- 查看 GitHub 文档：https://docs.github.com
- 或者向我询问具体问题

---

**祝部署顺利！🎉**
