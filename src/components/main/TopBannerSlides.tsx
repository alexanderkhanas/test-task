import { BookSlide } from "../../types";
import { Dimensions, Image, View, TouchableOpacity } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";
import { useCallback, useRef } from "react";
import { useRouter } from "expo-router";

type Props = {
  slides: BookSlide[];
};

const width = Dimensions.get("window").width;

const TopBannerSlides = ({ slides }: Props) => {
  const ref = useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);
  const router = useRouter();

  const navigateToDetail = useCallback(
    (id: number) => router.push(`detail/${id}`),
    [],
  );

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
          <TouchableOpacity
            onPress={() => navigateToDetail(item.book_id)}
            style={{
              flex: 1,
            }}
          >
            <Image style={{ flex: 1, borderRadius: 20 }} src={item.cover} />
          </TouchableOpacity>
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

export default TopBannerSlides;
