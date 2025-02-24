import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BooksHorizontalList from "../common/BooksHorizontalList";
import { colors } from "../../theme";
import { type Book } from "../../types";

type Props = {
  book: Book;
  recommendedBooks: Book[];
};

const DetailBookBody = ({ book, recommendedBooks }: Props) => {
  return (
    <View style={styles.bookBodyContainer}>
      <ScrollView style={styles.bookBody}>
        <View style={styles.bookInfo}>
          {[
            [book.views, "Readers"],
            [book.likes, "Likes"],
            [book.quotes, "Quotes"],
            [book.genre, "Genre"],
          ].map(([value, label]) => (
            <View key={`info-item-${label}`} style={styles.bookInfoItem}>
              <Text style={styles.bookInfoItemValue}>{value}</Text>
              <Text style={styles.bookInfoItemLabel}>{label}</Text>
            </View>
          ))}
        </View>
        <View style={styles.bookSection}>
          <Text style={styles.bookSectionTitle}>Summary</Text>
          <Text style={styles.bookSummaryBody}>{book.summary}</Text>
        </View>
        {!!recommendedBooks.length && (
          <View style={styles.bookSection}>
            <Text style={styles.bookSectionTitle}>You will also like</Text>
            <BooksHorizontalList
              books={recommendedBooks}
              textColor={colors.textDarkGrey}
            />
          </View>
        )}
      </ScrollView>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Read Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bookBodyContainer: {
    backgroundColor: "white",
    flex: 1,
    padding: 15,
    paddingTop: 0,
    marginTop: 15,
  },
  bookBody: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 15,
  },
  bookSection: {
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: colors.textLightGrey,
  },
  bookSectionTitle: {
    fontFamily: "NunitoSans_700Bold",
    fontSize: 20,
    marginBottom: 5,
    color: colors.textBlack,
  },
  bookSummaryBody: {
    fontFamily: "NunitoSans_600SemiBold",
    fontSize: 14,
    letterSpacing: 0.15,
    color: colors.textDarkGrey,
  },
  button: {
    marginTop: 10,
    padding: 16,
    maxWidth: 270,
    width: "100%",
    backgroundColor: colors.pink,
    alignSelf: "center",
    borderRadius: 30,
  },
  buttonText: {
    color: "white",
    fontFamily: "NunitoSans_800ExtraBold",
    fontSize: 16,
    textAlign: "center",
  },
  bookInfo: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingBottom: 10,
  },
  bookInfoItem: {
    alignItems: "center",
  },
  bookInfoItemValue: {
    fontSize: 18,
    fontFamily: "NunitoSans_700Bold",
    color: "black",
  },
  bookInfoItemLabel: {
    fontFamily: "NunitoSans_600SemiBold",
    fontSize: 12,
    color: colors.textLightGrey,
  },
});

export default DetailBookBody;
