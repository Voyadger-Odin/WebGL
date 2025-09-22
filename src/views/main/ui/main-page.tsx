'use client';

import dynamic from 'next/dynamic';

const GpuCalculator = dynamic(() => import('@/widgets/gpu-test/gpu-calculator'), {
  ssr: true,
  loading: () => <p>Загрузка GPU...</p>,
});

export const MainPage = () => {
  return (
    <div className={'flex flex-col gap-4 font-jetbrains'}>
      <h3>Обработка массива на GPU/CPU</h3>
      <GpuCalculator />
    </div>
  );
};
