import React from "react";
import { InfoSquared } from "./InfoSquared";

export function Infos() {
  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-10 place-content-center place-items-center">
      <InfoSquared number={5} text={"Edición"} color="bg-primary-green" />
      <InfoSquared
        number={12}
        text={"Conferencistas"}
        color="bg-primary-blue"
      />
      <InfoSquared
        number={20}
        text={"Áreas Involucradas"}
        color="bg-primary-orange"
      />
      <InfoSquared
        number={2200}
        text={"Visualizaciones en Youtube"}
        color="bg-primary-dark-green"
      />
    </div>
  );
}
