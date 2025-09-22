import { Dispatch, SetStateAction } from 'react';
import { HexColorPicker } from 'react-colorful';

import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { Slider } from '@/shared/ui/slider';

interface InputPropsTabProps {
  mainColor: string;
  setMainColor: Dispatch<SetStateAction<string>>;
}

export const InputPropsTab = ({ mainColor, setMainColor }: InputPropsTabProps) => {
  return (
    <div className="flex flex-col gap-6 text-balance p-2 text-[14px]">
      <div className={'flex flex-row'}>
        <div className={'w-[100px] flex justify-center'}>Main color</div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="default">Open popover</Button>
          </PopoverTrigger>
          <PopoverContent className="w-fit bg-black border-[#fff3]">
            <div className="flex flex-col gap-4">
              <HexColorPicker
                color={mainColor}
                onChange={(color) => {
                  setMainColor(color);
                }}
              />
              <Input
                value={mainColor}
                className={'text-white bg-[#111] border-none text-[14px] font-jetbrains'}
                onChange={(e) => {
                  setMainColor(e.target.value);
                }}
              />
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className={'flex flex-row items-center'}>
        <div className={'w-[100px] flex justify-center'}>X</div>
        <div className={'flex-1'}>
          <Slider defaultValue={[33]} max={100} step={1} />
        </div>
      </div>
    </div>
  );
};
