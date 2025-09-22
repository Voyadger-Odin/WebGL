// components/GpuCalculator.jsx
'use client';

// Важно: этот компонент работает только на клиенте
import { useState } from 'react';
import { GPU } from 'gpu.js';

import { Button } from '@/shared/ui/button';

export default function GpuCalculator() {
  const [calculating, setCalculating] = useState(false);
  const [timeGPU, setTimeGPU] = useState(0);
  const [timeCPU, setTimeCPU] = useState(0);

  const N = 10000000;
  const inputData: number[] = Array.from({ length: N }, (el, index) => index);
  const gpu = new GPU();

  const getResultOnGPU = ({ N, inputData }: { N: number; inputData: number[] }) => {
    const kernel = gpu
      .createKernel(function (a) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return Math.sin(Math.cos(Math.tan(Math.atan(a[this.thread.x]))));
      })
      .setOutput([N]);

    const result = kernel(inputData);

    gpu.destroy(); // Очистка

    return result;
  };

  const getResultOnCPU = ({ N, inputData }: { N: number; inputData: number[] }) => {
    return Array.from({ length: N }, (el, index) =>
      Math.sin(Math.cos(Math.tan(Math.atan(inputData[index])))),
    );
  };

  const handleCalculate = () => {
    const startTimeGPU = performance.now();
    const outputGPU = getResultOnGPU({ N: N, inputData: inputData });
    setTimeGPU(performance.now() - startTimeGPU);
    console.log('outputGPU: ', outputGPU);

    const startTimeCPU = performance.now();
    const outputCPU = getResultOnCPU({ N: N, inputData: inputData });
    setTimeCPU(performance.now() - startTimeCPU);
    console.log('outputCPU: ', outputCPU);
  };

  return (
    <div className={'flex flex-col gap-4'}>
      <Button
        onClick={() => {
          setCalculating(true);
          handleCalculate();
          setCalculating(false);
        }}
        className={'w-fit'}
      >
        Рассчитать
      </Button>
      {calculating ? (
        <div>...</div>
      ) : (
        <div className={'flex flex-row gap-4'}>
          <div>Время GPU: {timeGPU.toFixed(2)} мс</div>
          <div>Время CPU: {timeCPU.toFixed(2)} мс</div>
        </div>
      )}
    </div>
  );
}
