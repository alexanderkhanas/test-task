import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  View,
  Text,
} from "react-native";
import { colors } from "../../theme";
import { StatusBar } from "expo-status-bar";
import Animated, {
  Easing,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { useEffect, useState } from "react";

type Props = {
  onFinish?: () => void;
  animationEnded: boolean;
};

const dimensions = Dimensions.get("window");
const LOADER_WIDTH = 50;
const WINDOW_WIDTH = dimensions.width;
const WINDOW_HEIGHT = dimensions.height;

const CustomSplashScreen = ({ animationEnded, onFinish }: Props) => {
  const style = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withRepeat(
            withSequence(
              withTiming(0 - LOADER_WIDTH, {
                duration: 0,
                easing: Easing.linear,
              }),
              withTiming(WINDOW_WIDTH + LOADER_WIDTH, {
                duration: 1500,
                easing: Easing.linear,
              }),
            ),
            0 - LOADER_WIDTH,
            false,
          ),
        },
      ],
    };
  });

  useEffect(() => {
    setTimeout(() => onFinish(), 2000);
  }, []);

  return (
    !animationEnded && (
      <ImageBackground
        style={styles.background}
        source={require("../../assets/splash-background.png")}
      >
        <StatusBar hidden />
        <Text style={styles.title}>Book App</Text>
        <Text style={styles.subtitle}>Welcome to Book App</Text>
        <View style={styles.loadingContainer}>
          <Animated.View style={[styles.loadingLine, style]} />
        </View>
      </ImageBackground>
    )
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    zIndex: 50,
    position: "absolute",
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    paddingHorizontal: 50,
    paddingBottom: 90,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF33",
    maxHeight: 6,
    width: "100%",
    borderRadius: 5,
    overflow: "hidden",
  },
  loadingLine: {
    height: 6,
    width: LOADER_WIDTH,
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
  },
  title: {
    color: colors.pink,
    fontWeight: 700,
    fontSize: 52,
    fontFamily: "georgia",
    fontStyle: "italic",
  },
  subtitle: {
    color: colors.textWhite,
    fontFamily: "NunitoSans_700Bold",
    fontSize: 24,
    marginBottom: 40,
  },
});

export default CustomSplashScreen;
