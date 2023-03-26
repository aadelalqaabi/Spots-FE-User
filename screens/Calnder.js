import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  Modal,
} from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import React from "react";
import moment from "moment";
import i18n from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import * as Localization from "expo-localization";
import { View } from "react-native";
import MyAwesomeSplashScreen from "../MyAwesomeSplashScreen";
import { useFonts } from "expo-font";

export default function Calnder({ calendar, setCalendar, day, setDay }) {
  const colorScheme = useColorScheme();
  const today = new Date();
  const formattedToday = moment(today).locale("en").format("YYYY-MM-DD");
  const translations = {
    en: {
      explore: "Explore",
    },
    ar: {
      explore: "اكتشف",
    },
  };
  let [fontsLoaded] = useFonts({
    UbuntuBold: require("../assets/fonts/Ubuntu-Bold.ttf"),
    Ubuntu: require("../assets/fonts/Ubuntu.ttf"),
    Noto: require("../assets/fonts/Noto.ttf"),
    NotoBold: require("../assets/fonts/NotoBold.ttf"),
  });
  if (!fontsLoaded) {
    return <MyAwesomeSplashScreen />;
  }

  i18n.use(initReactI18next).init({
    compatibilityJSON: "v3",
    resources: translations,
    lng: Localization.locale,
    fallbackLng: true,
    interpolation: {
      escapeValue: false,
    },
  });

  LocaleConfig.locales["ar"] = {
    monthNames: [
      "يناير",
      "فبراير",
      "مارس",
      "ابريل",
      "مايو",
      "يونيو",
      "يوليو",
      "اغسطس",
      "سبتمبر",
      "اكتوبر",
      "نوفمبر",
      "ديسمبر",
    ],
    monthNamesShort: [
      "يناير",
      "فبراير",
      "مارس",
      "ابريل",
      "مايو",
      "يونيو",
      "يوليو",
      "اغسطس",
      "سبتمبر",
      "اكتوبر",
      "نوفمبر",
      "ديسمبر",
    ],
    dayNames: ["احد", "اثنين", "ثلاثاء", "اربعاء", "خميس", "جمعة", "سبت"],
    dayNamesShort: ["احد", "اثنين", "ثلاثاء", "اربعاء", "خميس", "جمعة", "سبت"],
    today: "اليوم",
  };
  LocaleConfig.locales["en"] = {
    monthNames: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    monthNamesShort: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    dayNames: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    today: "Today",
  };
  LocaleConfig.defaultLocale =
    i18n.language.split("-")[0] === "en" ? "en" : "ar";
  return (
    <Modal animationType="fade" transparent={true} visible={calendar}>
      <TouchableOpacity
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.6)",
          height: "100%",
          width: "100%",
          position: "absolute",
        }}
        onPress={() => setCalendar(!calendar)}
        activeOpacity={1}
      ></TouchableOpacity>
      <View
        style={{
          width: "90%",
          alignSelf: "center",
          marginTop: "60%",
          position: "absolute",
          zIndex: 99,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Calendar
          initialDate={day}
          minDate={formattedToday}
          enableSwipeMonths={true}
          style={{
            padding: 20,
            borderRadius: 20,
            shadowOffset: { width: 0, height: 0 },
            shadowColor: colorScheme === "dark" ? "#e7e7e7" : "#171717",
            shadowOpacity: 0.1,
            shadowRadius: 5,
            zIndex: 99,
            borderColor: "rgba(0,0,0,0.1)",
            borderWidth: 0.2,
          }}
          onDayPress={(day) => {
            setDay(day.dateString);
            setCalendar(!calendar);
          }}
          theme={{
            calendarBackground: colorScheme === "light" ? "#f1f1f1" : "#1b1b1b",
            selectedDayBackgroundColor: "#e52b51",
            selectedDayTextColor: "#f1f1f1",
            arrowColor: "#e52b51",
            todayTextColor: "#e52b51",
            textDisabledColor: colorScheme === "light" ? "#d9e1e8" : "#353636",
            dayTextColor: colorScheme === "dark" ? "#f1f1f1" : "#1b1b1b",
            monthTextColor: colorScheme === "dark" ? "#f1f1f1" : "#1b1b1b",
            textDayHeaderFontSize: 11,
            textSectionTitleColor:
              colorScheme === "dark" ? "#f1f1f1" : "#1b1b1b",
          }}
          markedDates={{ [day]: { selected: true, selectedColor: "#e52b51" } }}
          key={"calendar"}
        />
        <TouchableOpacity
          style={{
            alignSelf: "center",
            marginTop: "3%",
            backgroundColor: "#e52b51",
            width: "30%",
            borderRadius: 10,
          }}
          onPress={() => {
            setDay(null);
            setCalendar(false);
          }}
        >
          <Text
            style={{
              alignSelf: "center",
              padding: 10,
              color: "#f1f1f1",
              fontFamily:
                i18n.language.split("-")[0] === "en"
                  ? "UbuntuBold"
                  : "NotoBold",
              fontSize: 17,
            }}
          >
            {i18n.language.split("-")[0] === "en" ? "Reset" : "اعادة ضبط"}
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({});
