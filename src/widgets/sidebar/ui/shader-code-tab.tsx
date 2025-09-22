import { Dispatch, SetStateAction } from 'react';

import { CodeEditor } from '@/widgets/code-editor';

interface ShaderCodeTabProps {
  shaderData: string;
  setShaderData: Dispatch<SetStateAction<string>>;
}

export const ShaderCodeTab = ({ shaderData, setShaderData }: ShaderCodeTabProps) => {
  const handleInputShader = (value: string) => {
    setShaderData(value);
  };

  return (
    <div className={'w-full h-full'}>
      <CodeEditor value={shaderData} onChange={handleInputShader} />
    </div>
  );
};
