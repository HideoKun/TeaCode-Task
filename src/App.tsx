import "./output.css";

import { includes } from "ramda";
import { memo, useCallback, useMemo, useReducer } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from "react-window";
import { Search } from "./Components/Input";
import { VirtualizedRow } from "./Components/VirtualizedRow";
import { DispatchContext } from "./Context";
import { useFetchClients, useListSelectedClientsIds } from "./Hooks";
import { initialState, reducer, setSearchValueAction } from "./State";
import { ROW_HEIGHT } from "./Consts";

const Container = memo(() => {
  const [{ clients, searchValue }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useFetchClients(dispatch);
  useListSelectedClientsIds(clients);

  const onChangeSearchHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setSearchValueAction(e.target.value));
    },
    [dispatch]
  );

  const filteredClients = useMemo(
    () =>
      clients.filter(
        (c) =>
          includes(searchValue, c.first_name) ||
          includes(searchValue, c.last_name)
      ),
    [clients, searchValue]
  );

  return (
    <DispatchContext.Provider value={dispatch}>
      <div className="p-10 bg-slate-200 h-full">
        <Search
          {...{ value: searchValue, onChangeHandler: onChangeSearchHandler }}
        />
        <div
          style={{ height: 400 }}
          className="bg-white shadow-md rounded overflow-hidden "
        >
          <AutoSizer>
            {/* I've used useIsScrolling prop to disable loading of avatars while scrolling - fix network error 429 */}
            {({ height, width }) => (
              <List
                height={height}
                itemCount={filteredClients.length}
                itemSize={ROW_HEIGHT}
                width={width}
                itemData={filteredClients}
                useIsScrolling
              >
                {VirtualizedRow}
              </List>
            )}
          </AutoSizer>
        </div>
      </div>
    </DispatchContext.Provider>
  );
});

function App() {
  return <Container />;
}

export default App;
