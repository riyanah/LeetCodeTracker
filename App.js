import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Calendar } from "react-native-calendars";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";

export default function App() {
  const [markedDates, setMarkedDates] = useState({});
  const [months, setMonths] = useState([]);
  const [streakWeeks, setStreakWeeks] = useState(0);
  const [restDays, setRestDays] = useState(0);

  useEffect(() => {
    fetchLeetCodeData();
    generateMonths();
  }, []);

  const fetchLeetCodeData = async () => {
    try {
      const response = await fetch(
        "https://leetcode-api-faisalshohag.vercel.app/riyanahmed"
      );
      const data = await response.json();
      markSubmissionDates(data.submissionCalendar);
      calculateStreakAndRestDays(data.submissionCalendar);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const markSubmissionDates = (submissionCalendar) => {
    let dates = {};
    const today = moment().format("YYYY-MM-DD");

    if (submissionCalendar) {
      Object.keys(submissionCalendar).forEach((timestamp) => {
        const submissionDate = new Date(timestamp * 1000)
          .toISOString()
          .split("T")[0];

        dates[submissionDate] = {
          customStyles: {
            container: {
              backgroundColor: "#1E90FF", // Blue color for marked dates
              borderRadius: 50, // Make it circular
              width: 36, // Adjust width to make it circular
              height: 36, // Adjust height to make it circular
              justifyContent: "center",
              alignItems: "center",
            },
            text: {
              color: "white", // Text color on the marked date
              fontWeight: "bold",
            },
          },
        };
      });

      // Ensure today's date is only highlighted if it has a submission
      if (!dates[today]) {
        dates[today] = {
          customStyles: {
            container: {
              borderRadius: 50,
              width: 36,
              height: 36,
              justifyContent: "center",
              alignItems: "center",
              borderColor: "#1E90FF",
              borderWidth: 1, // Border for today's date without submission
            },
            text: {
              color: "#1E90FF",
              fontWeight: "bold",
            },
          },
        };
      }

      setMarkedDates(dates);
    } else {
      console.error("No submissionCalendar data found");
    }
  };

  const calculateStreakAndRestDays = (submissionCalendar) => {
    if (!submissionCalendar) return;

    const dates = Object.keys(submissionCalendar)
      .map((timestamp) => moment.unix(timestamp))
      .sort((a, b) => a - b); // Sort by date

    // Calculate streak weeks
    let currentStreak = 0;
    let maxStreak = 0;
    let lastWeek = null;

    dates.forEach((date) => {
      const weekOfYear = date.isoWeek();
      if (lastWeek === null || weekOfYear === lastWeek + 1) {
        currentStreak += 1;
      } else if (weekOfYear !== lastWeek) {
        maxStreak = Math.max(maxStreak, currentStreak);
        currentStreak = 1;
      }
      lastWeek = weekOfYear;
    });

    maxStreak = Math.max(maxStreak, currentStreak);
    setStreakWeeks(maxStreak);

    // Calculate rest days
    let currentRestDays = 0;
    let maxRestDays = 0;
    let lastDate = dates[0];

    for (let i = 1; i < dates.length; i++) {
      const diff = dates[i].diff(lastDate, "days");
      if (diff > 1) {
        currentRestDays = diff - 1;
        maxRestDays = Math.max(maxRestDays, currentRestDays);
      }
      lastDate = dates[i];
    }

    setRestDays(currentRestDays);
  };

  const generateMonths = () => {
    const currentMonth = moment();
    let monthsArray = [];
    for (let i = 0; i < 12; i++) {
      // Display 12 months
      monthsArray.push(
        currentMonth.clone().subtract(i, "months").format("YYYY-MM")
      );
    }
    setMonths(monthsArray.reverse());
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerItem}>
          <Ionicons name="flame" size={24} color="#FF7F50" />
          <Text style={styles.headerText}>{streakWeeks} weeks</Text>
        </View>
        <View style={styles.headerItem}>
          <Ionicons name="moon" size={24} color="#1E90FF" />
          <Text style={styles.headerText}>{restDays} days Rest</Text>
        </View>
      </View>

      <ScrollView
        style={styles.calendarContainer}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        {months.map((month, index) => (
          <View key={index} style={styles.calendarWrapper}>
            <Text style={styles.calendarHeaderText}>
              {moment(month).format("MMMM YYYY")}
            </Text>
            <Calendar
              current={month}
              markedDates={markedDates}
              markingType={"custom"}
              theme={{
                backgroundColor: "#000000",
                calendarBackground: "#000000",
                textSectionTitleColor: "#A9A9A9",
                selectedDayBackgroundColor: "#1E90FF", // Blue color for today
                selectedDayTextColor: "#FFFFFF", // White text for today
                todayTextColor: "#1E90FF", // Blue text for today
                todayBackgroundColor: "transparent", // No background for today if no submissions
                dayTextColor: "#FFFFFF",
                textDisabledColor: "#4F4F4F",
                monthTextColor: "#FFFFFF",
                indicatorColor: "#FFFFFF",
                textDayFontWeight: "bold", // Make day font bold
                textMonthFontWeight: "bold",
                textDayHeaderFontWeight: "bold",
                textDayFontSize: 16,
                textMonthFontSize: 18,
                textDayHeaderFontSize: 14,
              }}
              hideArrows={true}
              hideDayNames={false} // Show day names
              renderHeader={() => null} // Hide the default header to prevent duplication
              dayComponent={({ date, state }) => (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    width: 36,
                    height: 36,
                    borderRadius: 18,
                    backgroundColor:
                      markedDates[date.dateString] &&
                      markedDates[date.dateString].customStyles.container
                        .backgroundColor,
                  }}
                >
                  <Text
                    style={{
                      color:
                        state === "today"
                          ? "#1E90FF"
                          : state === "disabled"
                          ? "#A9A9A9"
                          : "#FFFFFF",
                      fontWeight: "bold",
                    }}
                  >
                    {date.day}
                  </Text>
                </View>
              )}
            />
          </View>
        ))}
      </ScrollView>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: "#000000", // Set the top bar background to black
    borderBottomWidth: 1,
    borderBottomColor: "#333", // Subtle border to separate from the calendar
  },
  headerItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3A3A3C", // Darker background for the header items
    padding: 10,
    borderRadius: 10,
  },
  headerText: {
    color: "#FFFFFF",
    marginLeft: 8,
    fontSize: 14, // Slightly decrease the font size
    fontWeight: "bold", // Make the text bold like in the screenshot
  },
  calendarWrapper: {
    marginBottom: 20,
  },
  calendarHeaderText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 10,
  },
  calendarContainer: {
    flex: 1,
  },
});
