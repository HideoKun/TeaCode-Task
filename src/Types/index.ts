import { ACTION_TYPES } from "../Consts/index";
export interface RawClient {
  id: number;
  first_name: string;
  last_name: string;
  gender: "Male" | "Female";
  email: string;
  avatar: null | string;
}

export interface Client extends RawClient {
  isSelected: Boolean;
  cachedAvatar?: Blob;
}

export type AppState = {
  clients: Client[];
  filteredClients: Client[];
  searchValue: string;
};

export type ActionType = {
  type: keyof typeof ACTION_TYPES;
  payload: any;
};
