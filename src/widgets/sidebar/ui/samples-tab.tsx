import { Dispatch, SetStateAction, useState } from 'react';

import { SHADERS_LIST, TShaders } from '@/shared/data/shaders';
import { cn } from '@/shared/lib/utils';
import { ShaderCanvas } from '@/widgets/canvas';

const ShaderTemplateItem = ({
  shader,
  setShaderData,
  mainColor,
}: {
  shader: TShaders;
  setShaderData: Dispatch<SetStateAction<string>>;
  mainColor: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn(
        'bg-[#111] p-2 rounded-lg border border-[#0000]',
        'flex flex-col gap-2',
        'transition cursor-pointer hover:border-[#fff2] hover:scale-105',
      )}
      onClick={() => {
        setShaderData(shader.shader);
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={'aspect-square rounded-md'}>
        <ShaderCanvas
          shaderData={shader.shader}
          inputProps={{
            mainColor: mainColor,
          }}
          size={1000}
          hasActiveReminders={false}
          hasUpcomingReminders={false}
          className={''}
          isRunning={isHovered}
        />
      </div>
      <span className={'text-[14px] font-bold'}>{shader.name}</span>
    </div>
  );
};

interface SamplesTabProps {
  setShaderData: Dispatch<SetStateAction<string>>;
  mainColor: string;
}

export const SamplesTab = ({ setShaderData, mainColor }: SamplesTabProps) => {
  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {SHADERS_LIST.map((shader, index) => {
        return (
          <ShaderTemplateItem
            key={index}
            shader={shader}
            setShaderData={setShaderData}
            mainColor={mainColor}
          />
        );
      })}
    </div>
  );
};
