use regex::Regex;

pub fn get_filename() -> String {
    let args: Vec<String> = std::env::args().collect();

    if args.iter().any(|arg| arg == "-i" || arg == "--input") {
        return String::from("input.txt");
    }

    String::from("test.txt")
}

pub fn get_input() -> String {
    let filename = get_filename();
    std::fs::read_to_string(&filename).expect(&format!("Unable to read the file: {}", filename))
}

pub fn update_input(content: &str) {
    let filename = get_filename();
    std::fs::write(&filename, content)
        .expect(&format!("Unable to write to the file: {}", filename));
}

pub fn string_to_grid(str: String) -> Vec<Vec<char>> {
    str.lines().map(|line| line.chars().collect()).collect()
}

pub fn input_to_paragraphs(input: String) -> Vec<String> {
    let re = Regex::new(r"(\r\n|\n|\r){2,}").expect("Invalid regex");
    re.split(&input).map(|s| s.to_string()).collect()
}

pub fn grid_to_string(grid: Vec<Vec<char>>) -> String {
    grid.into_iter()
        .map(String::from_iter)
        .collect::<Vec<String>>()
        .join("\r\n")
}

pub fn string_to_integer(str: &str) -> u32 {
    str.parse::<u32>().expect("Should be a valid integer")
}
