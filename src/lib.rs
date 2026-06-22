#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

pub mod network;
pub mod utils;

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
pub struct WasmModel {
    net: network::Network,
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl WasmModel {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        // Embed the weights
        let bytes = include_bytes!("../first.mnistai");
        let net = network::Network::load_default(bytes).expect("Failed to load embedded model");
        Self { net }
    }

    /// Takes a Float32Array of 784 pixels (0.0 to 1.0)
    /// Returns a Float32Array of length 2: [predicted_digit, confidence_percentage]
    #[wasm_bindgen]
    pub fn predict(&self, input: &[f32]) -> js_sys::Float32Array {
        if input.len() != 784 {
            panic!("Expected 784 pixels");
        }

        let mut pixels = [0.0f32; 784];
        pixels.copy_from_slice(input);

        let output = self.net.forward(pixels);
        let (digit, confidence) = utils::from_one_hot(output);

        let result = [digit as f32, confidence];
        let js_array = js_sys::Float32Array::new_with_length(2);
        js_array.copy_from(&result);
        js_array
    }
}
