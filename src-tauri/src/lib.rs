// src-tauri/src/lib.rs

#[tauri::command]
fn reply() -> String {
    "Hello World!".into()
}

pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![reply])
        .run(tauri::generate_context!())
        .expect("error while running Tauri application");
}
