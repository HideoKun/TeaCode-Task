import { Dispatch, useEffect } from "react";
import { fetchSortedClients } from "../Services";
import { Client } from "../Types";
import { getSelectedClientsIds } from "../Utils";

export const useFetchClients = (dispatch: Dispatch<any>) => {
  useEffect(() => {
    const setData = (payload: Client[]) =>
      dispatch({ type: "setData", payload });

    fetchSortedClients(setData);
  }, [dispatch]);
};

export const useListSelectedClientsIds = (clients: Client[]) => {
  useEffect(() => {
    const ids = getSelectedClientsIds(clients);
    // it is build as hook to avoid side effects in reducer
    ids.length &&
      console.log(`Selected clients: ${getSelectedClientsIds(clients)}`);
  }, [clients]);
};
