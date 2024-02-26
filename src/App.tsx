import React, { useEffect } from "react";
import "./App.css";
import { chars, charModel } from "./utils/helper";
import { Multiselect } from "multiselect-react-dropdown";

const searchKeyInName = (name: string, searchKey: string): React.ReactNode => {
  const index = name.toLowerCase().indexOf(searchKey.toLowerCase());
  if (index < 0) {
    return <span style={{ fontSize: "1.2rem" }}>{name}</span>;
  }
  const boldSearchKey = name.slice(index, index + searchKey.length);
  const normalSearchKey =
    searchKey.charAt(0).toUpperCase() + searchKey.slice(1);
  return (
    <span style={{ fontSize: "1.2rem" }}>
      {name.slice(0, index)}
      <b>{boldSearchKey}</b>
      {name
        .slice(index + searchKey.length)
        .replace(boldSearchKey, normalSearchKey)}
    </span>
  );
};

const charInfoCard = (char: charModel) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        maxHeight: "20rem",
        position: "relative",
        borderRadius: "1rem",
        overflow: "hidden",
        // backgroundColor: "#35c9dd",
        color: "white",
        minHeight: "20rem",
      }}
    >
      <div
        style={{
          height: "1rem",
          width: "1rem",
          position: "absolute",
          top: ".5rem",
          right: ".5rem",
          backgroundColor: char.status === "Alive" ? "greenyellow" : "red",
          borderRadius: "100%",
          border: "2px solid white",
          boxShadow: "0px 0px 3px 1px rgba(255,255,255,0.75)",
          zIndex: 1,
        }}
      ></div>
      <div
        className="bg-image"
        style={{
          backgroundImage: `url(${char.image})`,
        }}
      ></div>
      <div className="bg-text">
        <span className="text-right-padding">{char.name}</span>
        <span className="text-right-padding">{char.species}</span>
        <span className="text-right-padding">{char.gender}</span>
        <span className="text-right-padding">{`${
          char.episode.length +
          (char.episode.length === 1 ? " Episode" : " Episodes")
        }`}</span>
      </div>
    </div>
  );
};

const selectStyle = {
  multiselectContainer: {},
  searchBox: { borderRadius: "10px", padding: ".5rem" },
  option: { display: "flex" },
  optionContainer: { borderRadius: "10px" },
  inputField: { fontSize: "1.2rem" },
  chips: {
    fontSize: "1.2rem",
    padding: ".4rem",
    backgroundColor: "#e3e4ee",
    color: "black",
    marginBottom: ".4rem",
  },
};

function App() {
  const [selectedOptions, setSelectedOptions] = React.useState<charModel[]>([]);
  const [options, setOptions] = React.useState<charModel[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [search, setSearch] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");

  const fetchData = async () => {
    setLoading(true);
    const optionsData = await chars();
    console.log("optionsData", optionsData.results);
    setOptions(optionsData.results);
    setLoading(false);
  };
  const searchInChars = async () => {
    setLoading(true);
    const optionsData = await chars(search);
    setOptions(optionsData.results);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (search.length > 1) {
      searchInChars();
    } else {
      fetchData();
    }
  }, [search]);

  const decoreOptions = (charName: string) => {
    if (charName.length > 0) {
      const option = options.find(({ name }) => name === charName);
      console.log("optios: ", option);
      if (option) {
        const decore = (
          <div className="list-item">
            <img
              src={option.image}
              height={40}
              style={{ borderRadius: ".6rem" }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: ".2rem",
              }}
            >
              {search.length > 0 ? (
                searchKeyInName(option.name, search)
              ) : (
                <span style={{ fontSize: "1.2rem" }}>{option.name}</span>
              )}
              {}
              <span style={{ fontSize: ".8rem" }}>
                {option.episode.length || "Unknown"}{" "}
                {option.episode.length === 1 ? " Episode" : " Episodes"}
              </span>
            </div>
          </div>
        );
        return decore;
      } else {
        return (
          <div style={{ fontSize: "10px" }}>
            {search.length > 0 ? searchKeyInName(charName, search) : charName}
          </div>
        );
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="mainDiv">
          <Multiselect
            placeholder=""
            loading={loading}
            options={options}
            showCheckbox
            selectedValues={selectedOptions}
            displayValue="name"
            emptyRecordMsg="There is nothing here"
            showArrow
            keepSearchTerm
            closeOnSelect={false}
            closeIcon="close"
            onSelect={setSelectedOptions}
            avoidHighlightFirstOption
            onRemove={function noRefCheck() {}}
            onSearch={(key: string) => setSearch(key)}
            style={selectStyle}
            optionValueDecorator={(item) => decoreOptions(item)}
            // selectedValueDecorator={(item) => decoreOptionsForSelected(item)}
          />
          {/* This field is for fun, I like Rick And Morty! */}
          <span style={{ fontSize: "1.6rem", fontWeight: "600" }}>
            Selected Character(s):{" "}
          </span>
          {selectedOptions.length > 0 && (
            <div className="grid grid-cols" style={{ gap: "1rem" }}>
              {selectedOptions.map((char: any) => {
                return charInfoCard(char);
              })}
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
