import './style.css'
import init, { WasmModel } from 'handwritten-digits-recognition'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div id="loading">Initializing Neural Engine...</div>
  
  <div class="info-panel glass-panel">
    <div class="tagline">Built in Rust 🦀</div>
    <h1>Handwritten Digit Recognizer</h1>
    <p>This is a high-performance neural network built entirely from scratch in pure Rust without relying on external ML frameworks like PyTorch or TensorFlow.</p>
    <p>The prediction engine compiles down to WebAssembly, running directly in your browser with zero server latency.</p>
    <p><strong>Architecture:</strong> Feedforward Network (784 → 64 → 10), ReLU Activations, Softmax Output. Embedded custom dataset format.</p>
  </div>

  <div class="interaction-panel glass-panel">
    <div class="canvas-container">
      <div class="canvas-guide"></div>
      <canvas id="drawCanvas" width="280" height="280"></canvas>
    </div>
    <p class="usage-hint">💡 Tip: Draw the digit large and centered inside the dashed box.</p>
    <div class="controls">
      <button id="clearBtn" class="btn-secondary" style="width: 100%;">Clear Canvas</button>
    </div>
    <div id="resultBox" class="result-box">
      <div class="prediction" id="predText">-</div>
      <div class="confidence" id="confText">Draw a digit above</div>
    </div>
  </div>
`

async function setup() {
  // Initialize WASM
  await init()
  const model = new WasmModel()
  
  const loading = document.getElementById('loading')!
  loading.style.opacity = '0'
  setTimeout(() => loading.style.display = 'none', 500)

  const canvas = document.getElementById('drawCanvas') as HTMLCanvasElement
  const ctx = canvas.getContext('2d', { willReadFrequently: true })!
  
  const clearBtn = document.getElementById('clearBtn') as HTMLButtonElement
  const resultBox = document.getElementById('resultBox') as HTMLDivElement
  const predText = document.getElementById('predText') as HTMLDivElement
  const confText = document.getElementById('confText') as HTMLDivElement

  // Set initial black background
  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  
  // Brush settings
  ctx.lineWidth = 20
  ctx.lineCap = 'round'
  ctx.strokeStyle = 'white'

  let isDrawing = false

  function getPos(e: MouseEvent | TouchEvent) {
    const rect = canvas.getBoundingClientRect()
    if ('touches' in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      }
    } else {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
    }
  }

  function startPosition(e: MouseEvent | TouchEvent) {
    isDrawing = true
    draw(e)
  }

  function endPosition() {
    isDrawing = false
    ctx.beginPath()
  }

  function draw(e: MouseEvent | TouchEvent) {
    if (!isDrawing) return
    e.preventDefault() // prevent scrolling on touch
    const pos = getPos(e)
    ctx.lineTo(pos.x, pos.y)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(pos.x, pos.y)
    
    // Live prediction!
    doPrediction()
  }

  // Event listeners
  canvas.addEventListener('mousedown', startPosition)
  canvas.addEventListener('mouseup', endPosition)
  canvas.addEventListener('mousemove', draw)
  canvas.addEventListener('mouseleave', endPosition)

  canvas.addEventListener('touchstart', startPosition, { passive: false })
  canvas.addEventListener('touchend', endPosition)
  canvas.addEventListener('touchmove', draw, { passive: false })

  clearBtn.addEventListener('click', () => {
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    resultBox.classList.remove('visible')
    setTimeout(() => {
      predText.textContent = '-'
      confText.textContent = 'Draw a digit above'
    }, 300)
  })

  function doPrediction() {
    // 1. Scale image down to 28x28
    const scaledCanvas = document.createElement('canvas')
    scaledCanvas.width = 28
    scaledCanvas.height = 28
    const sCtx = scaledCanvas.getContext('2d')!
    
    // Draw scaled
    sCtx.drawImage(canvas, 0, 0, 28, 28)
    
    // 2. Extract pixels
    const imgData = sCtx.getImageData(0, 0, 28, 28)
    const pixels = new Float32Array(784)
    
    for (let i = 0; i < 784; i++) {
      // Data is RGBA. Canvas is grayscale (black bg, white draw)
      // We can just grab the R channel and normalize to 0.0 - 1.0
      pixels[i] = imgData.data[i * 4] / 255.0
    }

    // 3. Predict!
    try {
      const result = model.predict(pixels)
      const digit = result[0]
      const confidence = result[1]

      predText.textContent = `Digit: ${digit}`
      confText.textContent = `Confidence: ${confidence.toFixed(2)}%`
      resultBox.classList.add('visible')
    } catch (e) {
      console.error(e)
      confText.textContent = 'Error during prediction'
      resultBox.classList.add('visible')
    }
  }
}

setup()
