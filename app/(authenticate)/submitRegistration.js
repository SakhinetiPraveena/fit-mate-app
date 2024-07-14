import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    Pressable,
    TextInput,
    KeyboardAvoidingView,
    Alert,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useRouter, useNavigation, useLocalSearchParams } from "expo-router";
import axios from "axios";

const submitRegistration = () => {

    const router = useRouter();
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [age, setAge] = useState("");
    const [bio,setBio] = useState("");

    const { name, email, password, gender, goal } = useLocalSearchParams();
    const handleRegister = () => {
        // console.log(name,email,password,gender,goal,age,height,weight);
        const user = {
          name: name,
          email: email,
          password: password,
          gender: gender,
          goal: goal,
          age: age, 
          height: height,
          weight: weight,
          bio: bio,
        };
        // send a POST  request to the backend API to register the user
        axios
          .post("http://localhost:3000/register", user)
          .then((response) => {
            console.log(response);
            Alert.alert(
              "Registration successful",
              "You have been registered Successfully"
            );
            setAge("");
            setHeight("");
            setWeight("");
            setBio("");
            router.replace("/login")
          })
          .catch((error) => {
            Alert.alert(
              "Registration Error",
              "An error occurred while registering"
            );
            console.log("registration failed", error);
          });
      };
    return (
        <KeyboardAvoidingView>
            <View style={{ padding: 40 }}></View>
            <View style={{ margin: 20 }}>
                <Text style={{ fontSize: 16, fontWeight: "500", marginTop: 30 }}>Age:</Text>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 5,
                        backgroundColor: "#72A6DB",
                        paddingVertical: 5,
                        borderRadius: 5,
                        marginTop: 10,
                    }}
                >
                    <View style={{ marginLeft: 20 }}></View>
                    <TextInput
                        value={age}
                        keyboardType="numeric"
                        onChangeText={(text) => setAge(text)}
                        placeholder="Enter your age"
                        placeholderTextColor={"white"}
                        style={{
                            color: "white",
                            marginVertical: 10,
                            width: 300,
                            fontSize: height ? 17 : 17,
                        }}
                    />
                </View>

                <Text style={{ fontSize: 16, fontWeight: "500", marginTop: 30 }}>Height(cm):</Text>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 5,
                        backgroundColor: "#72A6DB",
                        paddingVertical: 5,
                        borderRadius: 5,
                        marginTop: 10,
                    }}
                >
                    <View style={{ marginLeft: 20 }}></View>
                    <TextInput
                        value={height}
                        keyboardType="numeric"
                        onChangeText={(text) => setHeight(text)}
                        placeholder="Enter your height"
                        placeholderTextColor={"white"}
                        style={{
                            color: "white",
                            marginVertical: 10,
                            width: 300,
                            fontSize: height ? 17 : 17,
                        }}
                    />
                </View>

                <Text style={{ fontSize: 16, fontWeight: "500", marginTop: 30 }}>Weight(Kg):</Text>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 5,
                        backgroundColor: "#72A6DB",
                        paddingVertical: 5,
                        borderRadius: 5,
                        marginTop: 10,
                    }}
                >
                    <View style={{ marginLeft: 20 }}></View>
                    <TextInput
                        value={weight}
                        keyboardType="numeric"
                        onChangeText={(text) => setWeight(text)}
                        placeholder="Enter your weight"
                        placeholderTextColor={"white"}
                        style={{
                            color: "white",
                            marginVertical: 10,
                            width: 300,
                            fontSize: weight ? 17 : 17,
                        }}
                    />
                </View>

                <Text style={{ fontSize: 16, fontWeight: "500", marginTop: 30 }}>Bio:</Text>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 5,
                        backgroundColor: "#72A6DB",
                        paddingVertical: 5,
                        borderRadius: 5,
                        marginTop: 10,
                    }}
                >
                    <View style={{ marginLeft: 20 }}></View>
                    <TextInput
                        value={bio}
                        onChangeText={(text) => setBio(text)}
                        placeholder="Enter your bio"
                        placeholderTextColor={"white"}
                        style={{
                            color: "white",
                            marginVertical: 10,
                            width: 300,
                            fontSize: height ? 17 : 17,
                        }}
                    />
                </View>

                <View style={{ marginTop: 50 }} />

                <Pressable
                    onPress={handleRegister}
                    style={{
                        width: 200,
                        backgroundColor: "#72A6DB",
                        borderRadius: 6,
                        marginLeft: "auto",
                        marginRight: "auto",
                        padding: 15,
                    }} 
                >
                    <Text
                        style={{
                            textAlign: "center",
                            color: "white",
                            fontSize: 16,
                            fontWeight: "bold",
                        }}
                    >
                        Register
                    </Text>
                </Pressable>

            </View>
        </KeyboardAvoidingView>
    )
}

export default submitRegistration

const styles = StyleSheet.create({})

