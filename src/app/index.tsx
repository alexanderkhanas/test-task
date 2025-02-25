import { ScrollView, StyleSheet, Text, View } from "react-native";
import TopBannerSlides from "../components/main/TopBannerSlides";
import { colors } from "../theme";
import { useEffect, useMemo } from "react";
import { Book } from "../types";
import BooksCategory from "../components/main/BooksCategory";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useStore } from "../store";
import { Colors } from "react-native/Libraries/NewAppScreen";

const Index = () => {
  const { books, topBannerSlides, fetchJsonData } = useStore();

  const booksByGenre = useMemo(() => {
    const temp: { [key: string]: Book[] } = {};
    books.forEach((book) => {
      if (!temp[book.genre]) temp[book.genre] = [book];
      else temp[book.genre].push(book);
    });
    return temp;
  }, [books]);

  useEffect(() => {
    fetchJsonData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.background} style="light" />
      <ScrollView style={styles.inner}>
        <Text style={styles.title}>Library</Text>
        <TopBannerSlides slides={topBannerSlides} />
        <View style={styles.categoriesContainer}>
          {Object.entries(booksByGenre).map(([genre, books]) => (
            <BooksCategory key={`${genre}-genre`} genre={genre} books={books} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontFamily: "NunitoSans_700Bold",
    color: colors.pink2,
    marginBottom: 20,
    marginTop: 10,
  },
  container: {
    flex: 1,
  },
  inner: {
    backgroundColor: colors.background,
    flex: 1,
    paddingHorizontal: 15,
  },
  categoriesContainer: {
    flex: 1,
  },
});

export default Index;
