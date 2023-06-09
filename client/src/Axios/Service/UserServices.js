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

export const PendingFriends = async (token) => {
  try {
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axiosClientInstance.get("/pendingFriends", config);
    return data;
  } catch (error) {
    return error;
  }
};

export const AcceptRequest = async (token, FId) => {
  try {
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axiosClientInstance.get(
      `/acceptRequest/${FId}`,
      config
    );
    return data;
  } catch (error) {
    return error;
  }
};

export const GetAllFriends = async (token) => {
  try {
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axiosClientInstance.get("/getAllFriends", config);
    return data;
  } catch (error) {
    return error;
  }
};

export const GetAllChat = async (token, FId) => {
  try {
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axiosClientInstance.get(
      `/getAllMessage/${FId}`,
      config
    );
    return data;
  } catch (error) {
    return error;
  }
};

export const sendChatMessage = async (token, value) => {
  try {
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axiosClientInstance.post("/sendChat", value, config);
    return data;
  } catch (error) {
    return error;
  }
};

export const GetProfile = async (token) => {
  try {
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axiosClientInstance.get("/profile", config);
    return data;
  } catch (error) {
    return error;
  }
};
export const UpdateProfile = async (token, values) => {
  try {
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axiosClientInstance.put("/edit", values, config);
    return data;
  } catch (error) {
    return error;
  }
};
export const RejectRequest = async (token, FId) => {
  try {
    let value = {};
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axiosClientInstance.put(
      `/reject/${FId}`,
      value,
      config
    );
    return data;
  } catch (error) {
    return error;
  }
};
