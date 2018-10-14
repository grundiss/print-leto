module.exports = {
  apps: [
    {
      name: "lilenko_ru",
      script: "npm",
      args: "start",
      watch: true,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
