import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    KeyboardAvoidingView,
    TextInput,
    Pressable,
    Alert
  } from "react-native";

  import axios from "axios";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import React, { useState,useEffect } from "react";
  import { MaterialIcons } from "@expo/vector-icons";
  import { AntDesign } from "@expo/vector-icons";
  import { useRouter } from "expo-router"; 
  
  const login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const handleLogin = () => {
      const user = {
        email: email,
        password: password,
      };
      axios.post("http://localhost:3000/login",user).then((response) => {
          console.log(response);
          const token = response.data.token;
          AsyncStorage.setItem("auth",token);
          router.replace("/(tabs)/profile")
      }).catch((error) => {
        console.log("registration failed", error);
      });
    };


    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
      >
        <View style={{ height: 200, backgroundColor: "#72A6DB", width: "100%" }}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 25,
            }}
          >
            <Image
              style={{ width: 250, height: 80, marginTop: 10,}}
              source={require('/Users/sakprave/Desktop/fit-mate-app/pictures/logo.png')}
            />
          </View>
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              fontFamily: "GillSans-SemiBold",
            }}
          >
            Fit Mate
          </Text>
        </View>
  
        <KeyboardAvoidingView>
  
          <View style={{ marginTop: 20 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                backgroundColor: "#72A6DB",
                paddingVertical: 5,
                borderRadius: 5,
                marginTop: 30,
              }}
            >
              <MaterialIcons
                style={{ marginLeft: 8 }}
                name="email"
                size={24}
                color="white"
              />
              <TextInput
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholder="Enter your email"
                placeholderTextColor={"white"}
                style={{
                  color: "white",
                  marginVertical: 10,
                  width: 300,
                  fontSize: password ? 17 : 17,
                }}
              />
            </View>
  
            <View style={{}}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                  backgroundColor: "#72A6DB",
                  paddingVertical: 5,
                  borderRadius: 5,
                  marginTop: 30,
                }}
              >
                <AntDesign
                  style={{ marginLeft: 8 }}
                  name="lock1"
                  size={24}
                  color="white"
                />
                <TextInput
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  secureTextEntry={true}
                  placeholder="Enter your password"
                  style={{
                    color: "white",
                    marginVertical: 10,
                    width: 300,
                    fontSize: password ? 17 : 17,
                  }}
                  placeholderTextColor="white"
                />
              </View>
            </View>
  
  
            <View style={{ marginTop: 50 }} />
  
            <Pressable
             onPress={handleLogin}
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
                Login
              </Text>
            </Pressable>
  
            <Pressable
              onPress={() => router.replace("/register")}
              style={{ marginTop: 12 }}
            >
              <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
                Don't have an account? Sign Up
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  };
  
  export default login;
  
  const styles = StyleSheet.create({});