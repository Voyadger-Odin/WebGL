// src/main.ts
const canvas = document.getElementById('spectrum');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('start');
const statusEl = document.getElementById('status');

const FFT_SIZE = 1024; // Должно быть степенью двойки
let gpuBuffer;
let resultBuffer;
let device;
let queue;
let pipeline;

// Инициализация WebGPU
async function initWebGPU() {
  if (!navigator.gpu) {
    statusEl.textContent = 'WebGPU не поддерживается';
    return false;
  }

  const adapter = await navigator.gpu.requestAdapter();
  if (!adapter) {
    statusEl.textContent = 'Не удалось получить GPU-адаптер';
    return false;
  }

  device = await adapter.requestDevice();
  queue = device.queue;
  statusEl.textContent = 'WebGPU готов';

  startBtn.disabled = false;
  return true;
}

// Компилируем compute шейдер для FFT (упрощённый пример)
async function createFFTPipeline() {
  const wgslShader = `
    struct InputOutput {
      data: array<vec2<f32>>;
    };
    @group(0) @binding(0) var<storage, read_write> io: InputOutput;

    fn reverseBits(n: u32, bits: u32) -> u32 {
      var reversed = 0u;
      for (var i = 0u; i < bits; i = i + 1u) {
        reversed = (reversed << 1u) | (n & 1u);
        n = n >> 1u;
      }
      return reversed;
    }

    fn bitReverseCopy(input: array<vec2<f32>>, output: array<vec2<f32>>) {
      let n = arrayLength(&input);
      let logN = 10; // log2(1024)
      for (var i = 0u; i < n; i = i + 1u) {
        let j = reverseBits(i, logN);
        output[j] = input[i];
      }
    }

    @compute @workgroup_size(64)
    fn fft(@builtin(global_invocation_id) globalId : vec3<u32>) {
      let n = arrayLength(&io.data);
      if (globalId.x >= u32(n)) { return; }

      // Здесь должен быть полный алгоритм БПФ
      // Для демонстрации просто копируем вход
      // Реальная реализация требует нескольких проходов
    }
  `;

  const module = device.createShaderModule({ code: wgslShader });

  pipeline = device.createComputePipeline({
    layout: 'auto',
    compute: {
      module,
      entryPoint: 'fft',
    },
  });
}

// Запуск анализа с микрофона
async function startAnalysis() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const audioContext = new AudioContext();
  const source = audioContext.createMediaStreamSource(stream);
  const analyser = audioContext.createAnalyser();
  analyser.fftSize = FFT_SIZE * 2; // Float32Array будет FFT_SIZE точек
  source.connect(analyser);

  const dataArray = new Float32Array(FFT_SIZE);

  // Создаём буферы
  gpuBuffer = device.createBuffer({
    size: FFT_SIZE * 8, // 2 float на комплексное число
    usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST | GPUBufferUsage.COPY_SRC,
  });

  resultBuffer = device.createBuffer({
    size: FFT_SIZE * 8,
    usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC,
    mappedAtCreation: true,
  });
  new Float32Array(resultBuffer.getMappedRange()).fill(0);
  resultBuffer.unmap();

  await createFFTPipeline();

  function analyze() {
    analyser.getFloatTimeDomainData(dataArray);

    // Преобразуем в комплексные числа (re = значение, im = 0)
    const complexInput = new Float32Array(FFT_SIZE * 2);
    for (let i = 0; i < FFT_SIZE; i++) {
      complexInput[i * 2] = dataArray[i]; // real
      complexInput[i * 2 + 1] = 0; // imaginary
    }

    // Копируем на GPU
    device.queue.writeBuffer(gpuBuffer, 0, complexInput);

    // Выполняем compute pass
    const commandEncoder = device.createCommandEncoder();
    const pass = commandEncoder.beginComputePass();
    pass.setPipeline(pipeline);
    pass.setBindGroup(
      0,
      device.createBindGroup({
        layout: pipeline.getBindGroupLayout(0),
        entries: [{ binding: 0, resource: { buffer: gpuBuffer } }],
      }),
    );
    pass.dispatchWorkgroups(Math.ceil(FFT_SIZE / 64));
    pass.end();

    // Копируем результат обратно
    commandEncoder.copyBufferToBuffer(gpuBuffer, 0, resultBuffer, 0, FFT_SIZE * 8);
    device.queue.submit([commandEncoder.finish()]);

    // Читаем результат (упрощённо)
    resultBuffer.mapAsync(GPUMapMode.READ).then(() => {
      const result = new Float32Array(resultBuffer.getMappedRange());
      const magnitudes = [];
      for (let i = 0; i < FFT_SIZE; i++) {
        const re = result[i * 2];
        const im = result[i * 2 + 1];
        magnitudes.push(Math.sqrt(re * re + im * im));
      }
      drawSpectrum(magnitudes);
      resultBuffer.unmap();
    });

    requestAnimationFrame(analyze);
  }

  analyze();
}

function drawSpectrum(magnitudes) {
  const max = Math.max(...magnitudes) || 1;
  ctx.fillStyle = '#111';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const barWidth = canvas.width / magnitudes.length;
  for (let i = 0; i < magnitudes.length; i++) {
    const height = (magnitudes[i] / max) * canvas.height * 0.9;
    const x = i * barWidth;
    const y = canvas.height - height;
    const hue = (i / magnitudes.length) * 240;
    ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.fillRect(x, y, barWidth - 1, height);
  }
}

// Инициализация
(async () => {
  if (await initWebGPU()) {
    startBtn.onclick = startAnalysis;
  }
})();
