fn main() {
    let contents = aoc::get_input();
    let grid = aoc::string_to_grid(contents);

    let total = tally_banks(grid);

    println!("{:?}", total);
}
#[derive(Debug)]
struct Digit {
    char: char,
    pos: usize,
}

fn find_highest_digit(bank: &Vec<char>, remain: usize, start: usize) -> Digit {
    let mut max = 0;
    let mut pos = 0;
    let mut i = start;
    while i < bank.len() - remain {
        let num = bank[i].to_digit(10).expect("Should be a valid integer");
        if num > max {
            max = num;
            pos = i;
            // println!("max: {max}, pos: {pos}, num: {:?}", bank[i]);
        }
        // println!("max: {max}, {:?}", bank[i]);
        i += 1;
    }
    Digit {
        char: char::from_digit(max, 10).expect("Should be a valid char"),
        pos,
    }
}

fn find_joltage(bank: Vec<char>, digits: usize) -> u32 {
    let mut i: usize = digits;
    let mut joltage: Vec<char> = vec![];
    let mut start = 0;
    while i > 0 {
        let digit = find_highest_digit(&bank, i - 1, start);
        // println!("{:?}", digit);
        joltage.push(digit.char);
        start = digit.pos + 1;
        i -= 1;
    }
    let jolts: String = joltage.into_iter().collect();
    let jolt = jolts.parse().expect("Should be valid u32");
    println!("joltage: {jolt}");
    jolt
}

fn tally_banks(grid: Vec<Vec<char>>) -> u32 {
    let mut total: u32 = 0;
    let mut i: usize = 0;
    while i < grid.len() {
        total += find_joltage(grid[i].clone(), 2);
        i += 1;
    }
    total
}
