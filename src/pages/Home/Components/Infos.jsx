import "animate.css";
import React from "react";
import { InfoSquared } from "./InfoSquared";
import { ProgressiveInfoSquared } from "./ProgressiveInfoSquared";

export function Infos() {
  return (
    <div className="ml-0  grid grid-cols-2 xl:flex place-content-center place-items-center xl:mt-[-120px] mb-[30px]">
      <ProgressiveInfoSquared
        number={200}
        text={"Ediciones"}
        color="text-primary-green"
        m_top={"mt-0 xl:mt-[0px]"}
        delay={0.2}
      />
      <ProgressiveInfoSquared
        number={500}
        text={"Embajadores a lo largo del tiempo"}
        color="text-primary-blue"
        m_top={"mt-0 xl:mt-[100px]"}
        delay={0.4}
      />
      <ProgressiveInfoSquared
        number={1000}
        text={"Personas asistentes a eventos"}
        color="text-primary-orange"
        m_top={"mt-0 xl:mt-[200px]"}
        delay={0.8}
      />
      <ProgressiveInfoSquared
        number={10000}
        text={"Personas capacitadas y mentorizadas"}
        color="text-primary-dark-green"
        m_top={"mt-0 xl:mt-[300px]"}
        delay={0.9}
import React from 'react';
import { InfoSquared } from './InfoSquared';

export function Infos() {
  return (
    <div className="grid grid-cols-2 grid-rows-2 place-content-center place-items-center gap-10">
      <InfoSquared number={5} text={'Edición'} color="bg-primary-green" />
      <InfoSquared
        number={12}
        text={'Conferencistas'}
        color="bg-primary-blue"
      />
      <InfoSquared
        number={20}
        text={'Áreas Involucradas'}
        color="bg-primary-orange"
      />
      <InfoSquared
        number={2200}
        text={'Visualizaciones en Youtube'}
        color="bg-primary-dark-green"
      />
    </div>
  );
}
