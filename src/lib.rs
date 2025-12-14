pub fn get_filename() -> String {
    let args: Vec<String> = std::env::args().collect();

    if args.iter().any(|arg| arg == "-i" || arg == "--input") {
        return String::from("input.txt");
    }

    String::from("test.txt")
}

pub fn get_input() -> String {
    match std::fs::read_to_string(get_filename()) {
        Ok(file) => file,
        Err(error) => panic!("Problem opening the file: {error:?}"),
    }
}

pub fn update_input(content: &str) -> () {
    match std::fs::write(get_filename(), content) {
        Ok(_) => (),
        Err(error) => panic!("Problem writing to file: {error:?}"),
    }
}

pub fn string_to_grid(str: String) -> Vec<Vec<char>> {
    str.lines().map(|line| line.chars().collect()).collect()
}

pub fn input_to_paragraphs(input: String) -> Vec<String> {
    match regex::Regex::new(r"r\n|\n|\r){2,}") {
        Ok(re) => re.split(&input).map(|s| s.to_string()).collect(),
        Err(error) => panic!("Problem creating regex: {error:?}"),
    }
}

pub fn grid_to_string(grid: Vec<Vec<char>>) -> String {
    grid.into_iter()
        .map(String::from_iter)
        .collect::<Vec<String>>()
        .join("\r\n")
}

pub fn string_to_integer(str: &str) -> u64 {
    match str.parse::<u64>() {
        Ok(num) => num,
        Err(error) => panic!("Problem converting string to u64: {error:?}"),
    }
}
