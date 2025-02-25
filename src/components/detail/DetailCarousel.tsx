import { Book } from "../../types";
import { Dimensions, Image, View, StyleSheet, ViewStyle } from "react-native";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import { useSharedValue } from "react-native-reanimated";
import { parallaxLayout } from "../../utils";
import { useEffect, useRef } from "react";

type Props = {
  books: Book[];
  activeBookIdx: number;
  setActiveBookIdx: (idx: number) => void;
};

const windowWidth = Dimensions.get("window").width;

const DetailCarousel = ({ books, activeBookIdx, setActiveBookIdx }: Props) => {
  const ref = useRef<ICarouselInstance | null>(null);
  const progress = useSharedValue<number>(0);

  const onSnapToItem = (index: number) => {
    setActiveBookIdx(index);
  };

  useEffect(() => {
    progress.set(activeBookIdx);
    ref.current.scrollTo({ index: activeBookIdx });
  }, [activeBookIdx]);

  return (
    <Carousel
      ref={ref}
      data={books}
      height={258}
      loop={false}
      pagingEnabled={true}
      snapEnabled={true}
      width={windowWidth / 2}
      style={styles.carousel}
      onSnapToItem={onSnapToItem}
      defaultIndex={activeBookIdx}
      onProgressChange={progress}
      customAnimation={
        parallaxLayout(
          {
            size: windowWidth / 2,
            vertical: false,
          },
          {
            parallaxScrollingScale: 1,
            parallaxAdjacentItemScale: 0.8,
            parallaxScrollingOffset: 10,
          },
        ) as unknown as () => ViewStyle
      }
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
