import { Image, Text, TouchableOpacity, View } from "react-native";
import "./../global.css";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import LottieView from "lottie-react-native";

const TopImage = require("./../assets/images/GiftBoxCard.png");
const BottomImage = require("./../assets/images/RewardSideIMG.png");

const Index = () => {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      router.push("/");
    } else if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
      <LottieView
        source={require("../assets/loading/loading.json")}
        autoPlay
        loop
        style={{ width: 120, height: 120 }}
      />
      <Text className="mt-4 text-lg text-gray-600">Loading...</Text>
    </View>
    );
  }

  return (
    <View className="flex-1 bg-yellow-800" style={{ justifyContent: 'space-between', alignItems: 'center', paddingVertical: 40 }}>
      <View className="absolute top-[-100px] w-[500px] h-[600px] bg-amber-500 rounded-full shadow-lg" />
      <View className="absolute top-0 left-1/2" style={{ transform: [{ translateX: -250 }], zIndex: -1 }}>
      </View>
      {/* Top: Title and Subtitle */}
      <View className="w-full items-center mt-4">
        <Text className="text-[70px] font-bold text-white text-center tracking-wider shadow-lg">
          REWARDLY
        </Text>
        <Text className="text-center mt-2 text-white text-2xl font-semibold">
          Focused on Rewards and Loyalty
        </Text>
      </View>
      {/* Centered Image and tagline - moved image up */}
      <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', width: '100%', marginTop: -10 }}>
        <Image
          source={TopImage}
          className="w-[300px] h-[300px] shadow-lg rounded-full"
          resizeMode="contain"
        />
        
      </View>
      <View className="mb-3 top-[40px]">
        <Text className="text-center mt-2 text-white text-xl font-semibold">
          Smart way to save your Reward Cards
        </Text>
      </View>
      {/* Bottom Button */}
      <View className="w-full top-[50px] justify-center items-center">
        <TouchableOpacity
          onPress={() => router.push("/register")}
          className="bg-amber-500 px-8 py-5 rounded-full"
          style={{
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
          activeOpacity={0.8}>
          <Text className="text-black font-semibold text-2xl drop-shadow-lg">
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
        
      
      <View className="-z-2 top-20">
        <Image
          source={BottomImage}
          className="w-[500px] h-[300px] shadow-lg rounded-full rotate-[-30deg]"
          resizeMode="contain"
        />
      </View>
    </View>
  )
}

export default Index;

