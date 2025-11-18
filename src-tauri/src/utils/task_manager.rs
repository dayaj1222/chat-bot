use serde::{Deserialize, Serialize};
use anyhow::Result;
use std::path::PathBuf;
use std::fs::File;
use std::io::{Read, Write};

#[derive(Serialize, Deserialize, Clone)]
pub struct Task {
    #[serde(default)]
    pub id: i32,
    pub task: String,
}

fn get_tasks_path() -> PathBuf {
    // Save in current directory for now - predictable and easy to find
    let path = PathBuf::from("./tasks.json");
    println!("[DEBUG] Tasks file path: {:?}", path.canonicalize().unwrap_or(path.clone()));
    path
}

fn create_file() -> Result<()> {
    let path = get_tasks_path();
    println!("[DEBUG] Creating tasks file at: {:?}", path);
    let mut file = File::create(path)?;
    file.write_all(b"[]")?;
    Ok(())
}

pub fn read_tasks() -> Result<Vec<Task>> {
    let path = get_tasks_path();
    
    if !path.exists() {
        println!("[DEBUG] Tasks file doesn't exist, creating new one");
        create_file()?;
    }
    
    println!("[DEBUG] Reading tasks from: {:?}", path);
    let mut file = File::open(&path)?;
    let mut data = String::new();
    file.read_to_string(&mut data)?;
    
    if data.trim().is_empty() {
        println!("[DEBUG] Tasks file is empty, returning empty vec");
        return Ok(Vec::new());
    }
    
    let tasks: Vec<Task> = serde_json::from_str(data.trim())?;
    println!("[DEBUG] Read {} tasks", tasks.len());
    Ok(tasks)
}

pub fn write_task(mut task: Task) -> Result<()> {
    let mut tasks = read_tasks()?;
    let next_id = tasks.iter().map(|t| t.id).max().unwrap_or(0) + 1;
    task.id = next_id;
    println!("[DEBUG] Writing task with ID: {}", next_id);
    tasks.push(task);
    
    let path = get_tasks_path();
    let mut file = File::create(&path)?;
    let json = serde_json::to_string_pretty(&tasks)?;
    file.write_all(json.as_bytes())?;
    println!("[DEBUG] Task saved successfully to: {:?}", path);
    Ok(())
}
