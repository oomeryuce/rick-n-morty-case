import React, { useEffect } from "react";
import "./App.css";
import { chars, charModel } from "./utils/helper";
import { Multiselect } from "multiselect-react-dropdown";
import { charInfoCard } from "./components/charInfoCard";
import { decoreOptions } from "./components/decorations";

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

  useEffect(() => {
    if (search.length > 1) {
      searchInChars();
    } else {
      fetchData();
    }
  }, [selectedOptions]);

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
            onRemove={setSelectedOptions}
            onSearch={(key: string) => setSearch(key)}
            style={selectStyle}
            optionValueDecorator={(item) =>
              decoreOptions(item, options, search)
            }
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
