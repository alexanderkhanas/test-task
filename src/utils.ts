import {
  Extrapolation,
  interpolate,
  useSharedValue,
} from "react-native-reanimated";
import type { IComputedDirectionTypes } from "react-native-reanimated-carousel";
import { Animated, ViewStyle } from "react-native";

interface TBaseConfig {
  size: number;
  vertical: boolean;
}

export interface ILayoutConfig {
  /**
   * control prev/next item offset.
   * @default 100
   */
  parallaxScrollingOffset?: number;
  /**
   * control prev/current/next item offset.
   * @default 0.8
   */
  parallaxScrollingScale?: number;
  /**
   * control prev/next item offset.
   * @default Math.pow(parallaxScrollingScale, 2)
   */
  parallaxAdjacentItemScale?: number;
}

export type TParallaxModeProps = IComputedDirectionTypes<{
  /**
   * Carousel Animated transitions.
   */
  mode?: "parallax";
  modeConfig?: ILayoutConfig;
}>;

export const parallaxLayout = (
  baseConfig: TBaseConfig,
  modeConfig: ILayoutConfig = {},
) => {
  const { size, vertical } = baseConfig;
  const {
    parallaxScrollingOffset = 100,
    parallaxScrollingScale = 0.8,
    parallaxAdjacentItemScale = parallaxScrollingScale ** 2,
  } = modeConfig;

  return (value: number) => {
    "worklet";
    const translate = interpolate(
      value,
      [-1, 0, 1],
      [-size + parallaxScrollingOffset, 0, size - parallaxScrollingOffset],
    );

    const zIndex = interpolate(
      value,
      [-1, 0, 1],
      [0, size, 0],
      Extrapolation.CLAMP,
    );

    const scale = interpolate(
      value,
      [-1, 0, 1],
      [
        parallaxAdjacentItemScale,
        parallaxScrollingScale,
        parallaxAdjacentItemScale,
      ],
      Extrapolation.CLAMP,
    );

    return {
      transform: [
        vertical
          ? {
              translateY: translate,
            }
          : {
              translateX: translate,
            },
        {
          scale,
        },
      ],
      zIndex,
    };
  };
};

export const nFormatter = (num: number, digits = 1) => {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const regexp = /\.0+$|(?<=\.[0-9]*[1-9])0+$/;
  const item = lookup.findLast((item) => num >= item.value);
  return item
    ? (num / item.value).toFixed(digits).replace(regexp, "").concat(item.symbol)
    : "0";
};
