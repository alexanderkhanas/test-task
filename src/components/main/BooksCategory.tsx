import { StyleSheet, Text, View } from "react-native";
import { Book } from "../../types";
import BooksHorizontalList from "../common/BooksHorizontalList";

type Props = {
  genre: string;
  books: Book[];
};

const BooksCategory = ({ genre, books }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{genre}</Text>
      <BooksHorizontalList books={books} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
    marginTop: 15,
  },
  title: {
    fontFamily: "NunitoSans_700Bold",
    fontSize: 22,
    color: "#FFFFFF",
  },
});

export default BooksCategory;
