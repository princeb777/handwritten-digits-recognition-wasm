# 🧠 Handwritten Digit Recognition (WASM Inference Engine)

> [!IMPORTANT]
> **This repository is a dedicated WebAssembly (WASM) frontend display.** It showcases a high-performance, real-time browser inference engine.
> 
> **For the core machine learning codebase**—including the custom dataset loader, manual backpropagation logic, loss function calculations, and the full training pipeline written from scratch in pure Rust—please visit the main repository: 
> 👉 **[princeb777/handwritten-digits-recognition](https://github.com/princeb777/handwritten-digits-recognition)**

🚀 **[TRY THE LIVE DEMO HERE!](https://princeb777.github.io/handwritten-digits-recognition-wasm/)** 🚀

A high-performance handwritten digit recognition system built entirely in **Rust**, implementing a neural network **from scratch without any ML libraries**.

> ⚡ Focus: High-Performance Systems Engineering | Bare-Metal Machine Learning | WebAssembly FFI

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
git clone https://github.com/princeb777/handwritten-digits-recognition-wasm.git
cd handwritten-digits-recognition-wasm/web
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

## 🎯 Why This Project Stands Out to Recruiters

**Typical ML Portfolios:**
* Rely heavily on high-level Python wrappers (TensorFlow/PyTorch)
* Abstract away the underlying mathematics and memory management
* Require heavy server-side backends for inference

**This Engineering Project:**
* **Bare-Metal ML:** Builds a neural network completely from scratch in pure Rust, proving a deep mathematical understanding of linear algebra and forward propagation.
* **Systems Architecture:** Demonstrates strong low-level memory management and static array optimization, resulting in zero-allocation inference loops.
* **Full-Stack WebAssembly:** Cross-compiles the Rust engine to WebAssembly, binding it natively to a TypeScript frontend via zero-cost abstractions for instantaneous, client-side browser execution.
* **No Black Boxes:** Owns the entire pipeline from pixel extraction to the final Softmax activation.

---

## 👨‍💻 Author

**Prince Banjare**

* Rust | Machine Learning | Systems Programming
* Interested in high-performance AI systems

---

## ⭐ Support

If you like this project:

⭐ Star this repo
