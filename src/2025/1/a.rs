use std::fs;

const FILE_NAME: &str = "test.txt";

fn main() {
    let contents = fs::read_to_string(FILE_NAME).expect("Should have been able to read the file");
    println!("{contents}");
}