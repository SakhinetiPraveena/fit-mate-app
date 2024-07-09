import { StyleSheet, Text, View, Pressable, Image,SafeAreaView ,KeyboardAvoidingView} from "react-native";
import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";

const selectGender = () => {
  const router = useRouter();
  const [gender, setGender] = useState("");
  const { name, email, password } = useLocalSearchParams();

  return (
    <View style={{ flex: 1, backgroundColor: "white", paddingtop: 12 }}>
      <View style={{padding:60}}></View>
      <Text style={{ fontSize: 16, fontWeight: "500",alignSelf:"center" }}>Select your gender</Text>
      <Pressable
        onPress={() => setGender("male")}
        style={{
          backgroundColor: gender == "male" ? "#72A6DB" : "#F0F0F0",
          padding: 12,
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          marginTop: 25,
          borderRadius: 5,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "500" }}>Male</Text>
        <Image
          style={{ width: 50, height: 50 }}
          source={{
            uri: "https://cdn-icons-png.flaticon.com/128/3573/3573617.png",
          }}
        />
      </Pressable>

      <Pressable
        onPress={() => setGender("female")}
        style={{
          backgroundColor: gender == "female" ? "#72A6DB" : "#F0F0F0",
          padding: 12,
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          marginTop: 25,
          borderRadius: 5
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "500" }}>Female</Text>
        <Image
          style={{ width: 50, height: 50 }}
          source={{
            uri: "https://cdn-icons-png.flaticon.com/128/3877/3877811.png",
          }}
        />
      </Pressable>

      <Pressable
        onPress={() => setGender("other")}
        style={{
          backgroundColor: gender == "other" ? "#72A6DB" : "#F0F0F0",
          padding: 12,
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          marginTop: 25,
          borderRadius: 5
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "500" }}>Prefer not to say</Text>
        <Image
          style={{ width: 50, height: 50 }}
        />
      </Pressable>

      {gender && (
        <Pressable
        onPress={() => router.push({ pathname: "/selectGoal" ,params: { name, email, password,gender }})}
          style={{
            marginTop: 25,
            backgroundColor: "#72A6DB",
            padding: 12,
            borderRadius: 4,
            width:100,
            alignSelf:"center"
          }}
        >
          <Text
            style={{ textAlign: "center", color: "white", fontWeight: "600" }}
          >
            Next
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default selectGender;

const styles = StyleSheet.create({});
