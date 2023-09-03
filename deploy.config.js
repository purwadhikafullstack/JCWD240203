module.exports = {
  apps: [
    {
      name: "JCWD-2402-03", // Format JCWD-{batchcode}-{groupnumber}
      script: "./projects/server/src/index.js",
      env: {
        NODE_ENV: "production",
        PORT: 8243,
      },
      time: true,
    },
  ],
};
