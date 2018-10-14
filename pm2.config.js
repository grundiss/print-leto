module.exports = {
  apps: [
    {
      name: "print-leto",
      script: "npm",
      args: "start",
      watch: true,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
