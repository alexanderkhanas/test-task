import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { Book } from "../../types";

type Props = {
  genre: string;
  books: Book[];
};

const BooksCategory = ({ genre, books }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{genre}</Text>
      <FlatList
        data={books}
        horizontal
        renderItem={({ item }) => (
          <View style={{ paddingRight: 10 }}>
            <Image style={styles.bookCover} src={item.cover_url} />
            <Text style={styles.bookAuthor}>{item.author}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
    marginTop: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 700,
    color: "#FFFFFF",
  },
  bookCover: {
    width: 120,
    height: 160,
    borderRadius: 16,
  },
  bookAuthor: {
    color: "#FFFFFFB2",
    fontSize: 16,
    marginTop: 5,
    fontWeight: 600,
  },
  gap: {
    gap: 5,
  },
});

export default BooksCategory;
