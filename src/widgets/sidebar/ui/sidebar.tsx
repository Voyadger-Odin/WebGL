import { Dispatch, SetStateAction } from 'react';

import { cn } from '@/shared/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { InputPropsTab } from '@/widgets/sidebar/ui/input-props-tab';
import { SamplesTab } from '@/widgets/sidebar/ui/samples-tab';
import { ShaderCodeTab } from '@/widgets/sidebar/ui/shader-code-tab';

export const Sidebar = ({
  shaderData,
  setShaderData,
  mainColor,
  setMainColor,
}: {
  shaderData: string;
  setShaderData: Dispatch<SetStateAction<string>>;
  mainColor: string;
  setMainColor: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className={'p-1 h-full overflow-hidden'}>
      <Tabs
        defaultValue="samples"
        className={cn('w-full h-full text-white flex flex-col gap-4 items-start')}
      >
        <TabsList
          className={cn(
            'border-b border-b-[#fff5] rounded-none w-full',
            'items-center justify-start',
          )}
        >
          <TabsTrigger value="samples">Samples</TabsTrigger>
          <TabsTrigger value="input-props">Input props</TabsTrigger>
          <TabsTrigger value="shader-code">Shader code</TabsTrigger>
        </TabsList>
        <div className={'flex-1 w-full overflow-auto'}>
          <TabsContent value="samples">
            <SamplesTab setShaderData={setShaderData} mainColor={mainColor} />
          </TabsContent>
          <TabsContent value="input-props">
            <InputPropsTab mainColor={mainColor} setMainColor={setMainColor} />
          </TabsContent>
          <TabsContent value="shader-code" className={'w-full h-full'}>
            <ShaderCodeTab shaderData={shaderData} setShaderData={setShaderData} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
