import axios from "axios";

export interface charModel {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export const chars = (searchKey: string = "") => {
  try {
    return axios
      .get(
        "https://rickandmortyapi.com/api/character" +
          (searchKey.length > 0 ? `/?name=${searchKey}` : "")
      )
      .then((resp: any) => {
        console.log(resp);
        return resp.data;
      })
      .catch((e: any) => {
        console.error("Error: ", e.response.data);
        return [];
      });
  } catch (e: any) {
    console.error("Error: ", e);
    return e.error;
  }
};
