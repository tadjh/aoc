pub fn get_filename() -> String {
    let args: Vec<String> = std::env::args().collect();
    if args.iter().any(|arg| arg == "-i") {
        return String::from("input.txt");
    }

    if args.iter().any(|arg| arg == "-t") {
        return String::from("test.txt");
    }

    return String::from("test.txt");
}

pub fn get_input() -> String {
    let filename = get_filename();
    std::fs::read_to_string(filename).expect("Should have been able to read the file")
}

pub fn update_input(content: &str) {
    let filename = get_filename();
    std::fs::write(filename, content).expect("Unable to write to the file");
}
