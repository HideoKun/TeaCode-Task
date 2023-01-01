import { memo, useEffect, useState } from "react";
import { ListChildComponentProps } from "react-window";
import { BehaviorSubject, debounceTime, distinctUntilChanged } from "rxjs";
import { DEBOUNCE_TIME } from "../Consts";
import { Client } from "../Types";
import { ClientView } from "./ClientView";

interface Props extends ListChildComponentProps {
  data: Client[];
}

export const VirtualizedRow = memo(
  ({ index, style, isScrolling, data }: Props) => {
    const [isScrollingEmitter$] = useState(
      () => new BehaviorSubject(!!isScrolling) // '!!' ts type fix
    );
    const [isScrolling$] = useState(() =>
      isScrollingEmitter$.pipe(
        debounceTime(DEBOUNCE_TIME),
        distinctUntilChanged()
      )
    );

    useEffect(() => {
      isScrollingEmitter$.next(!!isScrolling);
    }, [isScrollingEmitter$, isScrolling]);

    return (
      <div key={index} style={style}>
        <ClientView
          {...{ key: index, client: data[index], isScrolling$, index }}
        />
      </div>
    );
  }
);
