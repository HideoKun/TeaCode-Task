import { findIndex, propEq } from "ramda";
import { ACTION_TYPES } from "../Consts";
import { ActionType, AppState } from "../Types";

export const initialState: AppState = {
  clients: [],
  filteredClients: [],
  searchValue: "",
};

export const reducer = (state: AppState, action: ActionType): AppState => {
  switch (action.type) {
    case ACTION_TYPES.setData:
      return { ...state, clients: action.payload };

    case ACTION_TYPES.seCachedAvatar:
      const id = findIndex(propEq("id", action.payload.id), state.clients);
      state.clients[id].cachedAvatar = action.payload.image;
      state.clients[id] = { ...state.clients[id] };

      return { ...state, clients: [...state.clients] };

    case ACTION_TYPES.toggleClientSelection:
      const _id = findIndex(propEq("id", action.payload.id), state.clients);

      state.clients[_id].isSelected = action.payload.isSelected;
      state.clients[_id] = { ...state.clients[_id] };

      return { ...state, clients: [...state.clients] };

    case ACTION_TYPES.setSearchValue:
      return { ...state, searchValue: action.payload };

    default:
      throw new Error();
  }
};

// Action Creators

export const setSearchValueAction = (payload: string) => ({
  type: ACTION_TYPES.setSearchValue,
  payload,
});

export const setCachedAvatarAction = (image: Blob, id: number) => ({
  type: ACTION_TYPES.seCachedAvatar,
  payload: { image, id },
});

export const toggleClientSelectionAction = (
  id: number,
  isSelected: boolean
) => ({
  type: ACTION_TYPES.toggleClientSelection,
  payload: { id, isSelected },
});
