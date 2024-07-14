import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import UserChat from "../../../components/UserChat";
import { Ionicons } from "@expo/vector-icons";

const index = () => {
  const router = useRouter();
  const [userId, setUserId] = useState(""); 
  const [profiles, setProfiles] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("auth");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };

    fetchUser();
  }, []);

  const fetchUserFollowers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/users/${userId}/followers`
      );

      const userFollowers = response.data.followers;

      setFollowers(userFollowers);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const fetchUserFollowing = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/users/${userId}/following`
      );

      const userFollowing = response.data.following;

      setFollowing(userFollowing);
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserFollowers();
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchUserFollowing();
    }
  }, [userId]);

  useFocusEffect(
    useCallback(() => {
      if (userId) {
        fetchUserFollowers();
      }
    }, [])
  );
  console.log("followers", followers)
  console.log("following", following)
  return (
    <View style={{ backgroundColor: "white", flex: 1, padding: 10 }}>
    <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "500" }}>CHATS</Text>
        <Ionicons name="chatbox-ellipses-outline" size={25} color="black" />
    </View>
    <View>
      {following?.map((item, index) => (
        <UserChat key={index} userId={userId} item={item} />
      ))}
      {followers?.map((item, index) => (
        <UserChat key={index} userId={userId} item={item} />
      ))}
    </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});