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
  import { useRouter } from "expo-router";
  import axios from "axios";
  
  const register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    
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
              source={require('/Users/sakprave/Desktop/my-app-2/pictures/logo.png')}
            />
          </View>
          <Text
            style={{
              marginTop: 20,
              textAlign: "center",
              fontSize: 20,
              fontFamily: "GillSans-SemiBold",
            }}
          >
            Match Mate
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
              <Ionicons
                style={{ marginLeft: 8 }}
                name="person-sharp"
                size={24}
                color="white"
              />
              <TextInput
                value={name}
                onChangeText={(text) => setName(text)}
                placeholder="Enter your name"
                placeholderTextColor={"white"}
                style={{
                  color: "white",
                  marginVertical: 10,
                  width: 300,
                  fontSize: name ? 17 : 17,
                }}
              />
            </View>
  
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
  
            <Pressable
              onPress={() => router.replace("/login")}
              style={{ marginTop: 12 }}
            >
              <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
                Already have an account? Sign In
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  };
  
  export default register;
  
  const styles = StyleSheet.create({});