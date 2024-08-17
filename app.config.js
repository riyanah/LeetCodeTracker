export default () => ({
  expo: {
    name: "LeetCodeTracker",
    slug: "LeetCodeTracker",
    version: "1.0.0",
    extra: {
      LEETCODE_USERNAME: process.env.LEETCODE_USERNAME || "default_username",
    },
  },
});
