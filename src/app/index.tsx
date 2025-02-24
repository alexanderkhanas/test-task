import { ScrollView, StyleSheet, View } from "react-native";
import TopBannerSlides from "../components/main/TopBannerSlides";
import { colors } from "../theme";
import { useEffect, useMemo, useState } from "react";
import { Book, BookSlide } from "../types";
import BooksCategory from "../components/main/BooksCategory";
import remoteConfig from "@react-native-firebase/remote-config";
import CustomSplashScreen from "../components/common/CustomSplashScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const Index = () => {
  const [data, setData] = useState<{
    books: Book[];
    top_banner_slides: BookSlide[];
  }>({ books: [], top_banner_slides: [] });
  const booksByGenre = useMemo(() => {
    const temp: { [key: string]: Book[] } = {};
    data.books.forEach((book) => {
      if (!temp[book.genre]) temp[book.genre] = [book];
      else temp[book.genre].push(book);
    });
    return temp;
  }, [data]);

  useEffect(() => {
    remoteConfig().settings.minimumFetchIntervalMillis = 3600000;
    remoteConfig()
      .fetchAndActivate()
      .then(() => {
        console.log(
          JSON.parse(remoteConfig().getValue("json_data").asString()),
        );
        setData(JSON.parse(remoteConfig().getValue("json_data").asString()));
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.background} style="light" />
      <ScrollView style={styles.inner}>
        <TopBannerSlides slides={data.top_banner_slides} />
        <View style={{ flex: 1 }}>
          {Object.entries(booksByGenre).map(([genre, books]) => (
            <BooksCategory key={`${genre}-genre`} genre={genre} books={books} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    backgroundColor: colors.background,
    flex: 1,
    paddingHorizontal: 15,
  },
});

export default Index;
