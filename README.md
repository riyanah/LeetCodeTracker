# LeetCode Submission Tracker

This project is a React Native application designed to visualize your LeetCode submissions on a calendar. It highlights the days you made submissions, tracks your streaks, and displays rest days, giving you a clear view of your coding activity over time.

## Features

- **Calendar View**: Displays a calendar with highlighted days where LeetCode submissions were made.
- **Streak Tracking**: Shows the number of weeks you have consistently made submissions.
- **Rest Days Tracking**: Displays the number of consecutive days you haven't made a submission.
- **Custom Styling**: Provides a dark-themed UI with customizable components to match your preferred style.

## Installation

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo CLI](https://expo.dev/)

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/riyanah/leetcode-tracker.git
   cd leetcode-tracker
   ```

2. Install dependencies:
   `npm install` or ` yarn install`

3. Set your LeetCode username:

Create a .env file in the root directory of your project and add your LeetCode username:

```
LEETCODE_USERNAME=riyanahmed
```

Or, set it directly in app.config.js:

```javascript
export default () => ({
  expo: {
    name: "YourAppName",
    slug: "your-app-slug",
    version: "1.0.0",
    extra: {
      LEETCODE_USERNAME: "your_leetcode_username",
    },
  },
});
```

Replace "your_leetcode_username" with your actual LeetCode username.

4. Start the project:

```bash
Copy code
npx expo start
```

Usage
Once the project is running, you will be able to see a calendar that displays your LeetCode submissions. The top of the screen shows your current streak (in weeks) and the number of rest days.

API Integration
The API call for fetching LeetCode submission data is made using the username stored in your environment variables. The code snippet for the API call looks like this:

```javascript
const response = await fetch(
  `https://leetcode-api-faisalshohag.vercel.app/${Constants.expoConfig.extra.LEETCODE_USERNAME}` // or LEETCODE_USERNAME from @env if using dotenv
);
```

License
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgements
React Native Calendars for the calendar component.
Expo for providing an easy-to-use development platform for React Native.
LeetCode API by Faisal Shohag for the submission data API.
