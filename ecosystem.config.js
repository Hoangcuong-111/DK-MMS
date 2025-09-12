module.exports = {
  apps: [
    {
      name: "backend",
      cwd: "/home/it/myapp/backend",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
        PORT: 5000
        // Nếu dùng .env thì app của bạn tự load; nếu không, khai báo thêm DB_* ở đây.
      }
    }
  ]
}
