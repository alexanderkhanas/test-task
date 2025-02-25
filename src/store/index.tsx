import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import firebase from "@react-native-firebase/app";
import { Book, BookSlide } from "../types";
import remoteConfig from "@react-native-firebase/remote-config";
import {
  NunitoSans_400Regular,
  NunitoSans_600SemiBold,
  NunitoSans_700Bold,
  NunitoSans_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/nunito-sans";

globalThis.RNFB_SILENCE_MODULAR_DEPRECATION_WARNINGS = true;

const StoreContext = createContext<{
  books: Book[];
  topBannerSlides: BookSlide[];
  detailCarouselBooks: Book[];
  youWillLikeSection: number[];
  fetchJsonData: () => void;
  fetchDetailData: () => void;
}>({
  books: [],
  topBannerSlides: [],
  detailCarouselBooks: [],
  fetchJsonData: () => {},
  fetchDetailData: () => {},
  youWillLikeSection: [],
});

remoteConfig().settings.minimumFetchIntervalMillis = 3600000;

export const useStore = () => useContext(StoreContext);

const StoreWrapper = ({ children }: { children: ReactNode }) => {
  const [firebaseInitialized, setFirebaseInitialized] = useState(true);

  const [jsonData, setJsonData] = useState<{
    books: Book[];
    top_banner_slides: BookSlide[];
    you_will_like_section: number[];
  }>({ books: [], top_banner_slides: [], you_will_like_section: [] });
  const [detailCarouselBooks, setDetailCarouselBooks] = useState<Book[]>([]);

  const fetchJsonData = useCallback(() => {
    remoteConfig()
      .fetchAndActivate()
      .then(() =>
        setJsonData(
          JSON.parse(remoteConfig().getValue("json_data").asString()),
        ),
      );
  }, []);

  const fetchDetailData = useCallback(() => {
    remoteConfig()
      .fetchAndActivate()
      .then(() => {
        setDetailCarouselBooks(
          JSON.parse(remoteConfig().getValue("details_carousel").asString())
            .books,
        );
      });
  }, []);

  const [fontsLoaded] = useFonts({
    NunitoSans_400Regular,
    NunitoSans_600SemiBold,
    NunitoSans_700Bold,
    NunitoSans_800ExtraBold,
  });

  useEffect(() => {
    if (!firebase.apps.length) {
      firebase
        .initializeApp({
          projectId: "book-app-cc0a8",
          apiKey: "AIzaSyBNwpiSeMuovdEmIwYrjRvBTJ77to1XCVE",
          appId: "1:161428970931:android:8d66b60990bb62ba15bfc6",
          databaseURL: "https://book-app-cc0a8.firebaseio.com",
          messagingSenderId: "161428970931",
          storageBucket: "book-app-cc0a8.appspot.com",
        })
        .then(() => setFirebaseInitialized(true))
        .catch(console.error);
    } else {
      setFirebaseInitialized(true);
    }
  }, []);
  return (
    <StoreContext.Provider
      value={{
        fetchJsonData,
        fetchDetailData,
        topBannerSlides: jsonData.top_banner_slides,
        youWillLikeSection: jsonData.you_will_like_section,
        books: jsonData.books,
        detailCarouselBooks: detailCarouselBooks,
      }}
    >
      {firebaseInitialized && fontsLoaded && children}
    </StoreContext.Provider>
  );
};

export default StoreWrapper;
