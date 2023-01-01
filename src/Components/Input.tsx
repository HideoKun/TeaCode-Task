import { ChangeEvent, memo } from "react";

interface Props {
  value: string;
  onChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Search = memo(({ value, onChangeHandler }: Props) => {
  return (
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="ClientSearch"
        >
          Client Search
        </label>
        <input
          value={value}
          onChange={onChangeHandler}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="ClientSearch"
          type="text"
          placeholder="Pls type first/ last name... "
        />
      </div>
    </form>
  );
});
