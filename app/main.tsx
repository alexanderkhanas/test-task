import { ScrollView, StyleSheet, View } from "react-native";
import BooksCarousel from "../src/components/main-screen/BooksCarousel";
import { data } from "../src/firebase";
import { colors } from "../src/theme";
import { useEffect, useMemo } from "react";
import { Book } from "../src/types";
import BooksCategory from "../src/components/main-screen/BooksCategory";

const Main = () => {
  const booksByGenre = useMemo(() => {
    const temp: { [key: string]: Book[] } = {};
    data.books.forEach((book) => {
      if (!temp[book.genre]) temp[book.genre] = [book];
      else temp[book.genre].push(book);
    });
    return temp;
  }, []);

  useEffect(() => {
    // console.log("remote config", firebase.remoteConfig().getAll());
  }, []);

  return (
    <ScrollView style={styles.container}>
      <BooksCarousel slides={data.top_banner_slides} />
      <View style={{ flex: 1 }}>
        {Object.entries(booksByGenre).map(([genre, books]) => (
          <BooksCategory key={`${genre}-genre`} genre={genre} books={books} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    paddingHorizontal: 15,
  },
});

export default Main;
