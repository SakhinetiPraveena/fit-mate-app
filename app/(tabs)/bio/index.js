import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, Text, Image, StyleSheet, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const index = () => {
  const [userId, setUserId] = useState("");
  const [name,setName] =useState("");
  const [age,setAge] = useState("");
  const [bio,setBio]= useState("");
  const [height,setHeight]= useState("");
  const [weight,setWeight]= useState("");
  const [goal,setGoal]= useState("");
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [profilePicture,setProfilePicture]= useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("auth");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      setUserId(userId); 
    };

    fetchUser();
  }, []);
  const fetchUserDescription = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/users/${userId}`);
      console.log(response);
      const user = response.data;

      setName(user?.user?.name);
      setBio(user?.user?.bio);
      setAge(user?.user?.age);
      setHeight(user?.user?.height);
      setWeight(user?.user?.weight);
      setGoal(user?.user?.goal);
      setFollowers(user?.user?.followers);
      setFollowing(user?.user?.following);
      setProfilePicture(user?.user?.profilePicture);

    } catch (error) {
      console.log("Error fetching user description", error);
    }
  };
  useEffect(() => {
    if (userId) {
      fetchUserDescription();
    }
  }, [userId]);
  return (

    <SafeAreaView style={styles.container}>
      <Feather style={styles.editIcon} name="edit" size={24} color="black" />
      <ScrollView>
        <View style={styles.profileHeader}>
          <View style={styles.profilePicContainer}>
            <Image source={{ uri: profilePicture || "https://imgs.search.brave.com/7_-25qcHnU9PLXYYiiK-IwkQx93yFpp__txSD1are3s/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAwLzY0LzY3LzYz/LzM2MF9GXzY0Njc2/MzgzX0xkYm1oaU5N/NllwemIzRk00UFB1/RlA5ckhlN3JpOEp1/LmpwZw" }} style={styles.profilePic} />
            <Text style={styles.username}>{name}</Text>
            <Text style={styles.bio}>{bio}</Text> 
          </View>
          <View style={styles.profileStats}> 
            <View style={styles.stat}>
              <Text style={styles.statCount}>{followers.length}</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statCount}>{following.length}</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
          </View>
        </View> 
          <View style={styles.details}>
            <View style={styles.row}>
              <Text style={styles.label}>Age:</Text>
              <Text>{age}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Height:</Text>
              <Text>{height}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Weight:</Text>
              <Text>{weight}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Goal:</Text>
              <Text>{goal}</Text>
            </View>
          </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default index

const styles = StyleSheet.create({
  editIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    margin: 10,
    fontSize: 16,
    color: '#000',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileHeader: {
    flexDirection: 'row',
    marginTop: 40,
    marginLeft: 20,
    alignItems: 'center',
  },
  profilePicContainer: {
    flex: 1,
    alignItems: 'center',
  },
  profilePic: {
    width: 85,
    height: 85,
    borderRadius: 50,
  },
  profileStats: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  stat: {
    alignItems: 'center',
  },
  statCount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  username: {
    margin: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  bio: {
    fontSize: 14,
    color: '#666',
  },
  details: {
    marginTop: 20,
    alignItems: 'center',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    marginRight:5,
  },
  row:{
    flex: 2,
    flexDirection: 'row',
    margin: 10,
  }
});

