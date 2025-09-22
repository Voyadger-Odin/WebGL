// ------------------------------------------------------ UTILS ------------------------------------------------------

// memoization of the reversal of different lengths.
var memoizedReversal = {};
var memoizedZeroBuffers = {};

let constructComplexArray = function (signal) {
  var complexSignal = {};

  complexSignal.real = signal.real === undefined ? signal.slice() : signal.real.slice();

  var bufferSize = complexSignal.real.length;

  if (memoizedZeroBuffers[bufferSize] === undefined) {
    memoizedZeroBuffers[bufferSize] = Array.apply(null, Array(bufferSize)).map(
      Number.prototype.valueOf,
      0,
    );
  }

  complexSignal.imag = memoizedZeroBuffers[bufferSize].slice();

  return complexSignal;
};

let bitReverseArray = function (N) {
  if (memoizedReversal[N] === undefined) {
    let maxBinaryLength = (N - 1).toString(2).length; //get the binary length of the largest index.
    let templateBinary = '0'.repeat(maxBinaryLength); //create a template binary of that length.
    let reversed = {};
    for (let n = 0; n < N; n++) {
      let currBinary = n.toString(2); //get binary value of current index.

      //prepend zeros from template to current binary. This makes binary values of all indices have the same length.
      currBinary = templateBinary.substr(currBinary.length) + currBinary;

      currBinary = [...currBinary].reverse().join(''); //reverse
      reversed[n] = parseInt(currBinary, 2); //convert to decimal
    }
    memoizedReversal[N] = reversed; //save
  }
  return memoizedReversal[N];
};

// complex multiplication
let multiply = function (a, b) {
  return {
    real: a.real * b.real - a.imag * b.imag,
    imag: a.real * b.imag + a.imag * b.real,
  };
};

// complex addition
let add = function (a, b) {
  return {
    real: a.real + b.real,
    imag: a.imag + b.imag,
  };
};

// complex subtraction
let subtract = function (a, b) {
  return {
    real: a.real - b.real,
    imag: a.imag - b.imag,
  };
};

// euler's identity e^x = cos(x) + sin(x)
let euler = function (kn, N) {
  let x = (-2 * Math.PI * kn) / N;
  return { real: Math.cos(x), imag: Math.sin(x) };
};

// complex conjugate
let conj = function (a) {
  a.imag *= -1;
  return a;
};

// ------------------------------------------------------ FFT ------------------------------------------------------

// real to complex fft
let fft = function (signal) {
  let complexSignal = {};

  if (signal.real === undefined || signal.imag === undefined) {
    complexSignal = constructComplexArray(signal);
  } else {
    complexSignal.real = signal.real.slice();
    complexSignal.imag = signal.imag.slice();
  }

  const N = complexSignal.real.length;
  const logN = Math.log2(N);

  if (Math.round(logN) != logN) throw new Error('Input size must be a power of 2.');

  if (complexSignal.real.length != complexSignal.imag.length) {
    throw new Error('Real and imaginary components must have the same length.');
  }

  const bitReversedIndices = bitReverseArray(N);

  // sort array
  let ordered = {
    real: [],
    imag: [],
  };

  for (let i = 0; i < N; i++) {
    ordered.real[bitReversedIndices[i]] = complexSignal.real[i];
    ordered.imag[bitReversedIndices[i]] = complexSignal.imag[i];
  }

  for (let i = 0; i < N; i++) {
    complexSignal.real[i] = ordered.real[i];
    complexSignal.imag[i] = ordered.imag[i];
  }
  // iterate over the number of stages
  for (let n = 1; n <= logN; n++) {
    let currN = Math.pow(2, n);

    // find twiddle factors
    for (let k = 0; k < currN / 2; k++) {
      let twiddle = euler(k, currN);

      // on each block of FT, implement the butterfly diagram
      for (let m = 0; m < N / currN; m++) {
        let currEvenIndex = currN * m + k;
        let currOddIndex = currN * m + k + currN / 2;

        let currEvenIndexSample = {
          real: complexSignal.real[currEvenIndex],
          imag: complexSignal.imag[currEvenIndex],
        };
        let currOddIndexSample = {
          real: complexSignal.real[currOddIndex],
          imag: complexSignal.imag[currOddIndex],
        };

        let odd = multiply(twiddle, currOddIndexSample);

        let subtractionResult = subtract(currEvenIndexSample, odd);
        complexSignal.real[currOddIndex] = subtractionResult.real;
        complexSignal.imag[currOddIndex] = subtractionResult.imag;

        let additionResult = add(odd, currEvenIndexSample);
        complexSignal.real[currEvenIndex] = additionResult.real;
        complexSignal.imag[currEvenIndex] = additionResult.imag;
      }
    }
  }

  return complexSignal;
};

// ------------------------------------------------------ MAIN CODE ------------------------------------------------------

const canvas = document.getElementById('spectrum');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');

let analyser;
let dataArray;
let animationId;
let audioContext;

// Размер FFT (должен быть степенью двойки)
const FFT_SIZE = 2048;

// Инициализация Web Audio API
async function initAudio() {
  audioContext = new (window.AudioContext || window.webkitAudioContext)();
  analyser = audioContext.createAnalyser();
  analyser.fftSize = FFT_SIZE;

  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const source = audioContext.createMediaStreamSource(stream);
  source.connect(analyser);

  dataArray = new Float32Array(FFT_SIZE / 2); // Только положительные частоты
}

// Отрисовка спектра
function drawSpectrum() {
  analyser.getFloatTimeDomainData(dataArray); // Получаем временные данные

  // Выполняем FFT
  const spectrum = fft(dataArray);
  const magnitudes = spectrum.real.map((s, index) => {
    const specReal = spectrum.real[index];
    const specImage = spectrum.imag[index];
    return Math.sqrt(specReal ** 2 + specImage ** 2);
  }); // |z| = √(re² + im²)

  // Нормализуем для отображения
  const maxMag = Math.max(...magnitudes);
  const normalized = magnitudes.map((m) => (maxMag ? m / maxMag : 0));

  // Очищаем canvas
  ctx.fillStyle = 'rgb(20, 20, 30)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Рисуем столбики
  const barWidth = canvas.width / normalized.length;
  for (let i = 0; i < normalized.length; i++) {
    const height = normalized[i] * canvas.height * 0.8;
    const x = i * barWidth;
    const y = canvas.height - height;

    // Градиент цвета по частоте
    const hue = (i / normalized.length) * 240; // От синего до красного
    ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.fillRect(x, y, barWidth - 1, height);
  }

  animationId = requestAnimationFrame(drawSpectrum);
}

// Обработчики кнопок
startBtn.onclick = async () => {
  if (!analyser) await initAudio();
  if (audioContext.state === 'suspended') await audioContext.resume();
  drawSpectrum();
};

stopBtn.onclick = () => {
  if (animationId) cancelAnimationFrame(animationId);
  if (audioContext) audioContext.suspend();
};
