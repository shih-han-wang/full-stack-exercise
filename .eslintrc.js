module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-hyphen`
  extends: ["custom"],
  settings: {
    next: {
      rootDir: ["apps/*/"],
    },
  },
};
