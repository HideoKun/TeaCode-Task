import axios from "axios";
import { prop, sortBy } from "ramda";
import { URL } from "../Consts";
import { RawClient } from "../Types";

const sortClientsByLastName = sortBy(prop<RawClient, "last_name">("last_name"));

export const fetchSortedClients = (setter: CallableFunction) =>
  axios({
    method: "get",
    url: URL,
  })
    .then(({ data }) => setter(sortClientsByLastName(data as RawClient[])))
    .catch((error) => {
      // handle error
      console.log(error);
    });

export const fetchUserImage = (url: string) =>
  axios({
    method: "get",
    responseType: "blob",
    url,
  });
