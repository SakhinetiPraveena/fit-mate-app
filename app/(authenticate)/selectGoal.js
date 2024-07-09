import { StyleSheet, Text, View, Pressable, Image, SafeAreaView, KeyboardAvoidingView } from "react-native";
import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";

const selectGoal = () => {
    const router = useRouter();
    const [goal, setGoal] = useState("");
    const { name, email, password, gender } = useLocalSearchParams();
    return (
        <View style={{ flex: 1, backgroundColor: "white", paddingtop: 12 }}>
            <View style={{ padding: 60 }}></View>
            <Text style={{ fontSize: 16, fontWeight: "500", alignSelf: "center" }}>Select your goal</Text>
            <Pressable
                onPress={() => setGoal("Gain Muscle")}
                style={{
                    backgroundColor: goal == "Gain Muscle" ? "#72A6DB" : "#F0F0F0",
                    padding: 12,
                    justifyContent: "space-between",
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 25,
                    borderRadius: 5,
                }}
            >
                <Text style={{ fontSize: 16, fontWeight: "500" }}>Gain Muscle</Text>
                <Image
                    style={{ width: 50, height: 50 }}
                    source={{
                        uri: "https://cdn-icons-png.flaticon.com/128/11437/11437948.png",
                    }}
                />
            </Pressable>

            <Pressable
                onPress={() => setGoal("Lose Weight")}
                style={{
                    backgroundColor: goal == "Lose Weight" ? "#72A6DB" : "#F0F0F0",
                    padding: 12,
                    justifyContent: "space-between",
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 25,
                    borderRadius: 5
                }}
            >
                <Text style={{ fontSize: 16, fontWeight: "500" }}>Lose Weight</Text>
                <Image
                    style={{ width: 50, height: 50 }}
                    source={{
                        uri: "https://cdn-icons-png.flaticon.com/128/9958/9958634.png",
                    }}
                />
            </Pressable>

            <Pressable
                onPress={() => setGoal("Stay Fit")}
                style={{
                    backgroundColor: goal == "Stay Fit" ? "#72A6DB" : "#F0F0F0",
                    padding: 12,
                    justifyContent: "space-between",
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 25,
                    borderRadius: 5
                }}
            >
                <Text style={{ fontSize: 16, fontWeight: "500" }}>Stay Fit</Text>
                <Image
                    style={{ width: 50, height: 50 }}
                    source={{
                        uri: "https://cdn-icons-png.flaticon.com/128/9998/9998212.png",
                    }}
                />
            </Pressable>

            {goal && (
                <Pressable
                 onPress={() => router.push({ pathname: "/submitRegistration" ,params: { name, email, password,gender,goal }})}
                    style={{
                        marginTop: 25,
                        backgroundColor: "#72A6DB",
                        padding: 12,
                        borderRadius: 4,
                        width: 100,
                        alignSelf: "center"
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
    )
};

export default selectGoal