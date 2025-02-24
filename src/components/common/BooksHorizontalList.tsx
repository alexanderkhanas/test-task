import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Book, BookId } from "../../types";
import { colors } from "../../theme";
import { useRouter } from "expo-router";

type Props = {
  books: Book[];
  textColor?: string;
};

const BooksHorizontalList = ({
  books,
  textColor = colors.textWhite,
}: Props) => {
  const router = useRouter();

  const navigateToDetail = (id: BookId) => {
    router.push(`/detail/${id}`);
  };

  return (
    <FlatList
      data={books}
      horizontal
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigateToDetail(item.id)}
          style={styles.book}
        >
          <Image style={styles.bookCover} src={item.cover_url} />
          <Text style={[styles.bookTitle, { color: textColor }]}>
            {item.name}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  book: {
    paddingRight: 10,
  },
  bookCover: {
    width: 120,
    height: 160,
    borderRadius: 16,
  },
  bookTitle: {
    fontSize: 16,
    marginTop: 5,
    fontFamily: "NunitoSans_600SemiBold",
  },
});

export default BooksHorizontalList;
