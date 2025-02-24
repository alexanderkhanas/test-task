import { Book } from "../../types";
import { Dimensions, Image, View, StyleSheet } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { useSharedValue } from "react-native-reanimated";
import { parallaxLayout } from "../../utils";
import { useEffect } from "react";

type Props = {
  books: Book[];
  activeBookIdx: number;
  setActiveBookIdx: (idx: number) => void;
};

const windowWidth = Dimensions.get("window").width;

const DetailCarousel = ({ books, activeBookIdx, setActiveBookIdx }: Props) => {
  const progress = useSharedValue<number>(0);

  const onSnapToItem = (index: number) => {
    setActiveBookIdx(index);
  };

  useEffect(() => {
    progress.set(activeBookIdx);
  }, [activeBookIdx]);

  return (
    <Carousel
      data={books}
      height={258}
      loop={true}
      pagingEnabled={true}
      snapEnabled={true}
      width={windowWidth / 2}
      style={styles.carousel}
      onSnapToItem={onSnapToItem}
      defaultIndex={activeBookIdx}
      onProgressChange={progress}
      customAnimation={parallaxLayout(
        {
          size: windowWidth / 2,
          vertical: false,
        },
        {
          parallaxScrollingScale: 1,
          parallaxAdjacentItemScale: 0.8,
          parallaxScrollingOffset: 10,
        },
      )}
      renderItem={({ item }) => (
        <View>
          <Image style={styles.image} src={item.cover_url} />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  carousel: {
    width: windowWidth,
    height: 280,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 250,
    borderRadius: 16,
  },
});

export default DetailCarousel;
