mod utils;
use utils::{task_manager::{Task, write_task, read_tasks, delete_tasks}, weather::{Weather, get_weather}};

#[tauri::command]
fn save_task(task: Task) -> Result<(), String> {
    write_task(task).map_err(|e| e.to_string())
}

#[tauri::command]
fn view_tasks() -> Result<Vec<Task>, String> {
    read_tasks().map_err(|e| e.to_string())
}

#[tauri::command]
fn clear_tasks() -> Result<(), String> {
    delete_tasks().map_err(|e| e.to_string())
}

#[tauri::command]
async fn fetch_weather(city: String) -> Result<Weather, String> {
    get_weather(&city).await.map_err(|e| e.to_string())
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
        .invoke_handler(tauri::generate_handler![
            save_task, 
            view_tasks, 
            clear_tasks,
            fetch_weather 
        ])
        .run(tauri::generate_context!())
        .expect("error while running Tauri application");
}
