use std::fs;

fn main() {
    let contents = fs::read_to_string("test.txt").expect("Should have been able to read the file");
    let lines: Vec<&str> = contents.split("\n").collect();
    println!("{:?}", lines);
}
