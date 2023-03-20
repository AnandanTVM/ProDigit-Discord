import { axiosClientInstance } from "../axios";
export const AddFrirndList = async (token) => {
  try {
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axiosClientInstance.get("/addFriendsList", config);
    return data;
  } catch (error) {
    return error;
  }
};
export const AddFrirnd = async (token, FId) => {
  try {
    let vlaue = { friendId: FId };
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axiosClientInstance.post(
      "/addfriend",
      vlaue,
      config
    );
    return data;
  } catch (error) {
    return error;
  }
};
export const RequesedFriends = async (token) => {
  try {
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axiosClientInstance.get("/RequesedFriends", config);
    return data;
  } catch (error) {
    return error;
  }
};
export const AcceptRequest = async (token,FId) => {
  try {
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axiosClientInstance.get(`/acceptRequest/${FId}`, config);
    return data;
  } catch (error) {
    return error;
  }
};
