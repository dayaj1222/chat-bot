mod utils;
use utils::task_manager::{Task, write_task, read_tasks};

#[tauri::command]
fn save_task(task: Task) -> Result<(), String> {
    write_task(task).map_err(|e| e.to_string())
}

#[tauri::command]
fn view_tasks() -> Result<Vec<Task>, String> {
    read_tasks().map_err(|e| e.to_string())
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
        .invoke_handler(tauri::generate_handler![save_task, view_tasks])
        .run(tauri::generate_context!())
        .expect("error while running Tauri application");
}
