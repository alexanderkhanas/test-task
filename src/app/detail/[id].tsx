import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useEffect, useMemo, useState } from "react";
import DetailCarousel from "../../components/detail/DetailCarousel";
import { useAssets } from "expo-asset";
import { StatusBar } from "expo-status-bar";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import BackIcon from "../../assets/back-icon.svg";
import DetailBookBody from "../../components/detail/DetailBookBody";
import { useStore } from "../../store";

const DetailScreen = () => {
  const { youWillLikeSection, detailCarouselBooks, fetchDetailData } =
    useStore();
  const [activeBookIdx, setActiveBookIdx] = useState<number>(0);

  const activeBook = detailCarouselBooks[activeBookIdx];
  const router = useRouter();

  const { id } = useLocalSearchParams<{ id: string }>();

  const goBack = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };

  const recommendedBooks = useMemo(
    () =>
      detailCarouselBooks.filter((book) =>
        youWillLikeSection.includes(book.id),
      ),
    [youWillLikeSection, detailCarouselBooks],
  );

  const [assets, error] = useAssets([
    require("../../assets/top-header-img.png"),
  ]);

  useEffect(() => {
    const foundIndex = detailCarouselBooks.findIndex((book) => book.id === +id);
    if (foundIndex >= 0) {
      setActiveBookIdx(foundIndex);
    }
  }, [id, detailCarouselBooks]);

  useEffect(() => {
    fetchDetailData();
  }, []);
  return !!assets ? (
    <ImageBackground style={styles.container} source={assets[0]}>
      <SafeAreaView style={styles.inner}>
        <TouchableOpacity onPress={goBack} style={styles.backIcon}>
          <BackIcon fill="#fff" width={21} height={14} />
        </TouchableOpacity>
        <StatusBar style="light" backgroundColor="rgba(0, 0, 0, 0.0)" />
        <DetailCarousel
          books={detailCarouselBooks}
          activeBookIdx={activeBookIdx}
          setActiveBookIdx={setActiveBookIdx}
        />
        {!!activeBook && (
          <>
            <View style={styles.bookHeading}>
              <Text style={styles.bookName}>{activeBook.name}</Text>
              <Text style={styles.bookAuthor}>{activeBook.author}</Text>
            </View>
            <DetailBookBody
              book={activeBook}
              recommendedBooks={recommendedBooks}
            />
          </>
        )}
      </SafeAreaView>
    </ImageBackground>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    position: "relative",
    flex: 1,
  },
  inner: {
    position: "relative",
    flex: 1,
  },
  backIcon: {
    position: "absolute",
    left: 15,
    zIndex: 50,
    top: 30,
    padding: 5,
  },
  bookHeading: {
    alignItems: "center",
  },
  bookName: {
    fontFamily: "NunitoSans_700Bold",
    fontSize: 20,
    fontWeight: 700,
    color: "white",
  },
  bookAuthor: {
    fontFamily: "NunitoSans_400Regular",
    fontSize: 14,
    color: "white",
  },
});

export default DetailScreen;
