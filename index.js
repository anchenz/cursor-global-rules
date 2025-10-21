#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const os = require("os"); // 使用内置os模块

// 提交规范内容（不变）
const commitRules = `# ================== Git 提交规范 ==================
1. commit message 格式遵循约定式提交规范，格式为: <type>: <描述>
2. type 必须使用规范的英文类型，描述必须使用中文撰写。
3. 类型（type）包括但不限于:
   - feat: 新增功能
   - fix: 修复 bug
   - docs: 文档变更
   - style: 代码格式调整(不影响功能)
   - refactor: 代码重构(既不是新增功能，也不是修复 bug)
   - perf: 性能优化
   - test: 测试相关
   - build: 构建系统或外部依赖的变更
   - chore: 其他变更(构建过程或辅助工具的变更)
   - ci: CI/CD 相关变更
   - revert: 回滚之前的提交
4. 示例:
   - feat: 添加用户登录页面
   - fix: 修复主题切换时的闪烁问题
   - docs: 更新多语言配置说明
   - style: 调整登录页面按钮样式
   - refactor: 重构用户认证逻辑
5. 描述应简洁明了，说明本次提交的主要变更内容。
6. 如果是破坏性变更，在 type 后添加 !，如: feat!: 重构认证系统架构
# ==================================================`;

// 确定Cursor的全局配置目录（修改这里）
function getCursorGlobalDir() {
  const home = os.homedir(); // 使用内置方法获取用户目录

  if (process.platform === "win32") {
    return path.join(home, "AppData", "Roaming", "Cursor");
  } else if (process.platform === "darwin") {
    return path.join(home, "Library", "Application Support", "Cursor");
  } else {
    // Linux
    return path.join(home, ".config", "Cursor");
  }
}

// 主函数（不变）
async function main() {
  try {
    const cursorDir = getCursorGlobalDir();
    const rulesPath = path.join(cursorDir, ".cursorrules");

    if (!fs.existsSync(cursorDir)) {
      fs.mkdirSync(cursorDir, { recursive: true });
      console.log(`创建了Cursor配置目录: ${cursorDir}`);
    }

    fs.writeFileSync(rulesPath, commitRules, "utf8");
    console.log(`成功将提交规范写入全局Cursor配置: ${rulesPath}`);
    console.log("现在所有项目都将使用这个全局提交规范");
  } catch (error) {
    console.error("设置全局提交规范时出错:", error.message);
    process.exit(1);
  }
}

main();
