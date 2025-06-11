import 'animate.css';
import React from 'react';
import { InfoSquared } from './InfoSquared';
import { ProgressiveInfoSquared } from './ProgressiveInfoSquared';

export function Infos() {
  return (
    <div className="mb-[30px] ml-0 grid grid-cols-2 place-content-center place-items-center xl:mt-[-170px] xl:flex">
      <ProgressiveInfoSquared
        number={200}
        text={'Ediciones'}
        color="text-primary-green"
        m_top={'mt-0 xl:mt-[0px]'}
        delay={0.2}
      />
      <ProgressiveInfoSquared
        number={500}
        text={'Embajadores a lo largo del tiempo'}
        color="text-primary-blue"
        m_top={'mt-0 xl:mt-[100px]'}
        delay={0.4}
      />
      <ProgressiveInfoSquared
        number={1000}
        text={'Personas asistentes a eventos'}
        color="text-primary-orange"
        m_top={'mt-0 xl:mt-[200px]'}
        delay={0.8}
      />
      <ProgressiveInfoSquared
        number={10000}
        text={'Personas capacitadas y mentorizadas'}
        color="text-primary-dark-green"
        m_top={'mt-0 xl:mt-[300px]'}
        delay={0.9}
      />
    </div>
  );
}
