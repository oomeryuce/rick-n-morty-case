import { charModel } from "../utils/helper";

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

export const decoreOptions = (
  charName: string,
  options: charModel[],
  search: string
) => {
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
