export default () => ({
  expo: {
    name: "LeetCodeTracker",
    slug: "LeetCodeTracker",
    version: "1.0.0",
    extra: {
      LEETCODE_USERNAME: process.env.LEETCODE_USERNAME,
      eas: {
        projectId: "03c192da-ab10-474d-bf3a-e84586dc823b",
      },
    },
    updates: {
      url: "https://u.expo.dev/03c192da-ab10-474d-bf3a-e84586dc823b",
    },
    runtimeVersion: {
      policy: "appVersion",
    },
    android: {
      package: "com.riyan123.LeetCodeTracker",
    },
    ios: {
      bundleIdentifier: "com.riyan123.LeetCodeTracker",
    },
  },
});
