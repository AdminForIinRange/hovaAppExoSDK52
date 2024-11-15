import { useEffect, useRef, useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Pressable,
  Image,
} from "react-native";

import { CustomButton } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import male from "../../assets/svg/male.svg";
import female from "../../assets/svg/female.svg";
import other from "../../assets/svg/other.svg";

import { images } from "../../constants";

function GenderInput() {
  const { gender, setGender } = useGlobalContext();
  const [errorCode, setErrorCode] = useState("");

  const handleGenderSelect = (selectedGender) => {
    setGender(selectedGender);
    setErrorCode(""); // Clear error when gender is selected
  };

  const boxStyles = (selected) =>
    `mt-6 flex-col border-2 w-[110px] border-[#D1D4DE] h-[150px] px-4 rounded-2xl items-center justify-center p-2  ${
      selected ? "bg-slate-200" : ""
    }`;

  const submit = () => {
    setErrorCode(null);

    if (!gender) {
      setErrorCode("Please select your gender");
      return;
    }

    router.push("/phoneInput"); // Replace "/nextStep" with the actual route
  };

  return (
    <SafeAreaView className="bg-white h-full p-2.5">
      <ScrollView>
        <View
          className="w-full flex h-full px-4 my-6"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          <Text className="text-[36px] font-semibold text-primary">
            How do you identify?
          </Text>

          <Text className="text-[20px] mt-5 font-pmedium text-secondary w-[80%]">
            Please make sure it matches your ID Card
          </Text>

          {/* Gender Selection Boxes */}
          <View className="flex-row gap-[10px] justify-center items-center mt-[100px]">
            <Pressable
              onPress={() => handleGenderSelect("Male")}
              className={boxStyles(gender === "Male")}
            >
              <Image
                source={images.male}
                alt="female"
                resizeMode="contain"
                className=" w-[60px] h-[60px]"
              />
              <Text className="text-[14px] font-medium mt-[25px]">Male</Text>
            </Pressable>

            <Pressable
              onPress={() => handleGenderSelect("Female")}
              className={boxStyles(gender === "Female")}
            >
              <Image
                source={images.female}
                alt="female"
                resizeMode="contain"
                className=" w-[60px] h-[60px]"
              />
              <Text className="text-[14px] font-medium mt-[25px]">Female</Text>
            </Pressable>

            <Pressable
              onPress={() => handleGenderSelect("Non-binary")}
              className={boxStyles(gender === "Non-binary")}
            >
              <Image
                source={images.nonBinary}
                alt="female"
                resizeMode="contain"
                className=" w-[60px] h-[60px]"
              />
              <Text className="text-[14px] font-medium mt-[25px]">
                Non-binary
              </Text>
            </Pressable>
          </View>

          {/* Error Message */}
          {errorCode && (
            <View className="flex-col w-full h-[45px] items-center justify-center bg-red-100 font-pextrabold rounded-xl mt-[10]">
              <Text className="font-semibold text-red-500">{errorCode}</Text>
            </View>
          )}

          <CustomButton
            title="Continue"
            handlePress={submit}
            containerStyles="mt-[100px]"
            textColor="white"
            buttonBackgroundColor="#0162F1"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default GenderInput;
