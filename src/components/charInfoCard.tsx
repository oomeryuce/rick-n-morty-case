import { charModel } from "../utils/helper";

export const charInfoCard = (char: charModel) => {
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
