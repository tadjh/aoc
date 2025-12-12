use std::fs;

fn main() {
    let contents = fs::read_to_string("input.txt").expect("Should have been able to read the file");

    let mut curr: i32 = 50;
    let mut acc: i32 = 0;

    println!("The dial starts by pointing at {curr}");

    for line in contents.lines() {
        let parsed = parse_line(curr, acc, line);
        curr = parsed.current;
        acc = parsed.accumulator;
    }
    println!("{:?}", acc);
}

struct Parsed {
    current: i32,
    accumulator: i32,
}

fn parse_line(current: i32, zeroes: i32, line: &str) -> Parsed {
    let direction = &line[0..1];
    let distance = &line[1..]
        .parse()
        .expect("Should have been a valid integer.");
    let value = match direction {
        "L" => current - distance,
        "R" => current + distance,
        _ => panic!("The dial was not rotated."),
    };

    let mut quotient = 0;
    let mut accumulator = 0;

    if current == 0 && value < 0 {
        quotient = value.abs() / 100;
        accumulator += quotient;
    } else if value < 0 {
        quotient = (value.abs() / 100) + 1;
        accumulator += quotient;
    } else if value > 100 {
        quotient = value / 100;
        accumulator += quotient;
    }

    let next = value.rem_euclid(100);

    if next == 0 {
        accumulator += 1;
    }

    // println!(
    //     "value: {value}, distance: {distance}, quotient: {quotient}, accumulator: {accumulator}"
    // );

    if quotient > 0 {
        println!(
            "The dial is rotated {line} to point at {next}; during this rotation, it points at zero {quotient} times."
        );
    } else {
        println!("The dial is rotated {line} to point at {next}.");
    }
    Parsed {
        current: next,
        accumulator: accumulator + zeroes,
    }
}
