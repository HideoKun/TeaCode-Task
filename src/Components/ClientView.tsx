import { memo, useCallback, useContext } from "react";
import { Observable } from "rxjs";
import { ROW_HEIGHT } from "../Consts";
import { DispatchContext } from "../Context";
import { toggleClientSelectionAction } from "../State";
import { Client } from "../Types";
import { Avatar } from "./Avatar";

type Props = {
  client: Client;
  isScrolling$: Observable<boolean>;
  index: number;
};

const RowStaticStyle = { height: ROW_HEIGHT };

export const ClientView = memo(
  ({
    client: { first_name, last_name, id, avatar, cachedAvatar, isSelected },
    isScrolling$,
    index,
  }: Props) => {
    const dispatch = useContext(DispatchContext);

    const onClickHandler = useCallback(() => {
      dispatch(toggleClientSelectionAction(id, !isSelected));
    }, [dispatch, id, isSelected]);

    return (
      <div
        style={RowStaticStyle}
        className={`flex justify-between fade-in items-center px-4 ${
          index % 2 ? "bg-slate-50" : "bg-white"
        }`}
      >
        <Avatar
          key={id}
          {...{
            first_name,
            last_name,
            avatar,
            cachedAvatar,
            id,
            isScrolling$,
            index,
          }}
        />

        <div>{first_name}</div>
        <div>{last_name}</div>

        <input
          id="default-checkbox"
          type="checkbox"
          value=""
          checked={!!isSelected}
          onChange={onClickHandler}
          className="w-5 h-5 text-slate-300 accent-sky-400 bg-gray-100 rounded border-slate-300 focus:ring-slate-500 focus:ring-1 "
        />
      </div>
    );
  }
);
