import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Image,
    Pressable,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";
import * as Animatable from "react-native-animatable";

const Profile = ({ item, isEven, userId, setProfiles }) => {
    const [liked, setLiked] = useState(false);
    const handleFollow = async (selectedUserId) => {
        try {
          setLiked(true);
          await axios.post("http://localhost:3000/follow", {
            currentUserId: userId,
            selectedUserId: selectedUserId,
          });
    
          setTimeout(() => {
            setProfiles((prevProfiles) =>
              prevProfiles.filter((profile) => profile._id !== selectedUserId)
            );
            setLiked(false);
          }, 200);
        } catch (error) {
          console.log("error liking", error);
        }
      };
    if (isEven) {
        return (
            <View style={{ padding: 12, backgroundColor: "#F0F8FF" }}>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 50 }}>
                        <View>
                            <Text style={{ fontSize: 17, fontWeight: "600" }}>
                                {item?.name}
                            </Text>
                            <Text
                                style={{
                                    width: 200,
                                    marginTop: 15,
                                    fontSize: 18,
                                    lineHeight: 24,
                                    fontFamily: "Optima",
                                    marginBottom: 8,
                                }}
                            >
                                {item?.bio}
                            </Text>
                            <View style={{ flexDirection: "row", alignItems: "center", }}>
                                <Text style={{
                                    fontWeight: 'bold',
                                    marginBottom: 5,
                                    marginRight: 5,
                                }}>Age:</Text>
                                <Text style={{
                                    marginBottom: 5,
                                    marginRight: 5,
                                }}>{item?.age}</Text>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center", }}>
                                <Text style={{
                                    fontWeight: 'bold',
                                    marginBottom: 5,
                                    marginRight: 5,
                                }}>Height:</Text>
                                <Text style={{
                                    marginBottom: 5,
                                    marginRight: 5,
                                }}>{item?.height}</Text>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center", }}>
                                <Text style={{
                                    fontWeight: 'bold',
                                    marginBottom: 5,
                                    marginRight: 5,
                                }}>Weight:</Text>
                                <Text style={{
                                    marginBottom: 5,
                                    marginRight: 5,
                                }}>{item?.weight}</Text>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center", }}>
                                <Text style={{
                                    fontWeight: 'bold',
                                    marginBottom: 5,
                                    marginRight: 5,
                                }}>Goal:</Text>
                                <Text style={{
                                    marginBottom: 5,
                                    marginRight: 5,
                                }}>{item?.goal}</Text>
                            </View>
                            <Pressable
                             onPress={() => handleFollow(item?._id)}
                                style={{
                                    width: 50,
                                    height: 30,
                                    backgroundColor: "#72A6DB",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginTop: 30,
                                    borderRadius: 7,
                                }}
                            >
                                <Text>Follow</Text>
                            </Pressable>
                        </View>

                        <Image
                            style={{
                                width: 100,
                                height: 100,
                                resizeMode: "cover",
                                borderRadius: 500,
                            }}
                            source={{ uri: item?.profilePicture }}
                        />
                    </View>
                </ScrollView>
                <View style={{ marginVertical: 15 }} />
            </View>
        );
    } else {
        return (
            <View style={{ padding: 12, backgroundColor: "#FFFFFF" }}>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 50 }}>
                    <Image
                            style={{
                                width: 100,
                                height: 100,
                                resizeMode: "cover",
                                borderRadius: 500,
                            }}
                            source={{ uri: item?.profilePicture }}
                        />
                        <View>
                        <Text style={{ fontSize: 17, fontWeight: "600" }}>
                                {item?.name}
                            </Text>
                            <Text
                                style={{
                                    width: 200,
                                    marginTop: 15,
                                    fontSize: 18,
                                    lineHeight: 24,
                                    fontFamily: "Optima",
                                    marginBottom: 8,
                                }}
                            >
                                {item?.bio}
                            </Text>
                            <View style={{ flexDirection: "row", alignItems: "center", }}>
                                <Text style={{
                                    fontWeight: 'bold',
                                    marginBottom: 5,
                                    marginRight: 5,
                                }}>Age:</Text>
                                <Text style={{
                                    marginBottom: 5,
                                    marginRight: 5,
                                }}>{item?.age}</Text>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center", }}>
                                <Text style={{
                                    fontWeight: 'bold',
                                    marginBottom: 5,
                                    marginRight: 5,
                                }}>Height:</Text>
                                <Text style={{
                                    marginBottom: 5,
                                    marginRight: 5,
                                }}>{item?.height}</Text>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center", }}>
                                <Text style={{
                                    fontWeight: 'bold',
                                    marginBottom: 5,
                                    marginRight: 5,
                                }}>Weight:</Text>
                                <Text style={{
                                    marginBottom: 5,
                                    marginRight: 5,
                                }}>{item?.weight}</Text>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center", }}>
                                <Text style={{
                                    fontWeight: 'bold',
                                    marginBottom: 5,
                                    marginRight: 5,
                                }}>Goal:</Text>
                                <Text style={{
                                    marginBottom: 5,
                                    marginRight: 5,
                                }}>{item?.goal}</Text>
                            </View>
                            <Pressable
                            onPress={() => handleFollow(item?._id)}
                                style={{
                                    width: 50,
                                    height: 30,
                                    backgroundColor: "#72A6DB",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginTop: 30,
                                    borderRadius: 7,
                                }}
                            >
                                <Text>Follow</Text>
                            </Pressable>
                        </View>
                    </View>
                </ScrollView>
                <View style={{ marginVertical: 15 }} />
            </View>
        );
    }
};

export default Profile;

const styles = StyleSheet.create({});