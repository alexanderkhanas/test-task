import { Book, BookSlide } from "../../types";
import {
  Dimensions,
  FlatList,
  ImageBackground,
  Image,
  View,
} from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";
import { useMemo, useRef } from "react";

type Props = {
  slides: BookSlide[];
};

const width = Dimensions.get("window").width;

const BooksCarousel = ({ slides }: Props) => {
  const ref = useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      /**
       * Calculate the difference between the current index and the target index
       * to ensure that the carousel scrolls to the nearest index
       */
      count: index - progress.value,
      animated: true,
    });
  };
  return (
    <View>
      <Carousel
        ref={ref}
        width={width - 30}
        height={160}
        autoPlay
        autoPlayInterval={3000}
        data={slides}
        onProgressChange={progress}
        renderItem={({ index, item }) => (
          <View
            style={{
              flex: 1,
            }}
          >
            <Image style={{ flex: 1, borderRadius: 20 }} src={item.cover} />
          </View>
        )}
      />

      <Pagination.Basic
        progress={progress}
        data={slides}
        activeDotStyle={{ backgroundColor: "#D0006E" }}
        dotStyle={{ backgroundColor: "#C1C2CA", borderRadius: 50 }}
        containerStyle={{ gap: 5, marginTop: -20 }}
        onPress={onPressPagination}
      />
    </View>
  );
};

export default BooksCarousel;
