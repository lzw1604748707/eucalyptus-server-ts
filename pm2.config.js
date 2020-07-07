module.exports = {
  apps: [
    {
      // 指定解释器
      // interpreter: `${process.env.HOME ||
      //   process.env.USERPROFILE}/.config/yarn/global/node_modules/.bin/ts-node`,
      // 解释器参数 -P 表示项目路径，会自动使用项目的 tsconfig.json
      // interpreter_args: '-P ./src -r tsconfig-paths/register',
      cwd: './',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      },
      kill_timeout: 10000,
      name: 'app',
      script: './src/app.ts',
      wait_ready: true,
      watch: true,
      ignore_watch: ['node_modules']
    }
  ]
}
