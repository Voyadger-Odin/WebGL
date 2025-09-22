'use client';

import { useEffect } from 'react';

async function runOnGPU() {
  const adapter = await navigator.gpu.requestAdapter();
  if (!adapter) throw new Error('Нет подходящего GPU адаптера');

  const device = await adapter.requestDevice();

  const arrayA = new Float32Array([1, 2, 3, 4, 5]);
  const arrayB = new Float32Array([10, 20, 30, 40, 50]);
  const output = new Float32Array(arrayA.length);

  // Буферы на GPU
  const bufferA = device.createBuffer({
    size: arrayA.byteLength,
    usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
  });
  const bufferB = device.createBuffer({
    size: arrayB.byteLength,
    usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
  });
  const bufferOut = device.createBuffer({
    size: output.byteLength,
    usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC,
  });

  // Загружаем данные
  device.queue.writeBuffer(bufferA, 0, arrayA);
  device.queue.writeBuffer(bufferB, 0, arrayB);

  // WGSL шейдер
  const shader = `
    @group(0) @binding(0) var<storage, read> a : array<f32>;
    @group(0) @binding(1) var<storage, read> b : array<f32>;
    @group(0) @binding(2) var<storage, read_write> out : array<f32>;

    @compute @workgroup_size(1) fn main(
      @builtin(global_invocation_id) id : vec3<u32>
    ) {
      let i = id.x;
      if (i < ${output.length}) {
        out[i] = a[i] + b[i];
      }
    }
  `;

  const _module = device.createShaderModule({ code: shader });

  const pipeline = device.createComputePipeline({
    layout: 'auto',
    compute: { _module, entryPoint: 'main' },
  });

  const bindGroup = device.createBindGroup({
    layout: pipeline.getBindGroupLayout(0),
    entries: [
      { binding: 0, resource: { buffer: bufferA } },
      { binding: 1, resource: { buffer: bufferB } },
      { binding: 2, resource: { buffer: bufferOut } },
    ],
  });

  const commandEncoder = device.createCommandEncoder();
  const passEncoder = commandEncoder.beginComputePass();
  passEncoder.setPipeline(pipeline);
  passEncoder.setBindGroup(0, bindGroup);
  passEncoder.dispatchWorkgroups(output.length);
  passEncoder.end();

  // Копируем результат обратно
  commandEncoder.copyBufferToBuffer(
    bufferOut,
    0,
    device.queue.getQueue().createBuffer({
      size: output.byteLength,
      usage: GPUBufferUsage.MAP_READ | GPUBufferUsage.COPY_DST,
    }),
    0,
    output.byteLength,
  );

  device.queue.submit([commandEncoder.finish()]);

  // Чтение результата
  const resultBuffer = await device.queue.onSubmittedWorkDone();
  const resultGpuBuffer = device.queue.getQueue().getBuffer(resultBuffer);
  await resultGpuBuffer.mapAsync(GPUMapMode.READ);
  const resultArray = new Float32Array(resultGpuBuffer.getMappedRange());
  console.log('Результат на GPU:', Array.from(resultArray)); // [11, 22, 33, 44, 55]
}

export const MainPage = () => {
  useEffect(() => {
    runOnGPU().catch(console.error);
  }, []);

  return <div className={'relative'}>...</div>;
};
