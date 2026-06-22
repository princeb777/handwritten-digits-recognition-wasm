# 🧠 Handwritten Digit Recognition (Rust, From Scratch)

A high-performance handwritten digit recognition system built entirely in **Rust**, implementing a neural network **from scratch without any ML libraries**.

> ⚡ Focus: Systems Programming + Machine Learning + WebAssembly

---

## 🚀 Features

* 🧠 Neural network from scratch (no TensorFlow/PyTorch)
* ⚙️ Manual forward propagation logic
* 🌐 **WebAssembly Port:** Runs directly in your browser with zero latency!
* 🎮 Interactive drawing canvas (Web + Raylib Desktop)
* 💾 Pre-trained embedded model (`.mnistai`)
* ⚡ Optimized Rust implementation

---

## 🏗️ Tech Stack

* **Language:** Rust (Edition 2024)
* **Web Frontend:** WebAssembly (`wasm-bindgen`), Vite, TypeScript, HTML/CSS
* **Desktop Graphics:** raylib
* **Core Concepts:**
  * Feedforward Neural Networks
  * ReLU Activation
  * Softmax
  * Static array computations

---

## 📁 Project Structure

```
.
├── pkg/           # Compiled WebAssembly module
├── src/           # Rust Core (Desktop + WASM)
│   ├── lib.rs     # WebAssembly bindings
│   ├── main.rs    # Desktop CLI + raylib loop
│   ├── network.rs # Neural network logic
│   ├── draw.rs    # Desktop drawing canvas
│   └── utils.rs   # Math utilities
└── web/           # Web Frontend (Vite)
```

---

## 🧠 Model Architecture

| Layer  | Size |
| ------ | ---- |
| Input  | 784  |
| Hidden | 64   |
| Output | 10   |

---

## 🖥️ Running the Web App (Browser)

The neural network runs directly in your browser via WebAssembly, predicting digits in real-time as you draw!

### 1️⃣ Clone & Navigate
```bash
git clone https://github.com/princeb777/handwritten-digits-recognition.git
cd handwritten-digits-recognition/web
```

### 2️⃣ Install Dependencies & Run
Make sure you have Node.js and `pnpm` installed.
```bash
pnpm install
pnpm dev
```
Open your browser to `http://localhost:5173/`. Draw a digit and watch it predict instantly!

---

## 🖥️ Running the Desktop App

You can also run the native desktop application powered by `raylib`.

```bash
cargo run
```

* Draw digit using mouse
* Release mouse → prediction appears in terminal

---

## 🎯 Why This Project Stands Out

**Most ML projects:**
* Use high-level frameworks
* Hide implementation details
* Rely on Python and heavy backends

**This project:**
* Builds everything from scratch in pure Rust
* Compiles down to WebAssembly to run entirely client-side
* Demonstrates deep ML understanding
* Combines systems programming with AI
* Shows strong low-level optimization skills

---

## 👨‍💻 Author

**Prince Banjare**

* Rust | Machine Learning | Systems Programming
* Interested in high-performance AI systems

---

## ⭐ Support

If you like this project:

⭐ Star this repo
