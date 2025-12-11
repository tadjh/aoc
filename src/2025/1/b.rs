use std::fs;

fn main() {
    let contents = fs::read_to_string("input.txt").expect("Should have been able to read the file");

    let mut value: i32 = 50;
    let mut zeroes: i32 = 0;

    println!("The dial starts by pointing at {value}");

    for line in contents.lines() {
        let moves: i32 = line[1..]
            .parse()
            .expect("Should have been a valid integer.");
        let result = match &line[0..1] {
            "L" => moves * -1,
            "R" => moves,
            _ => panic!("The dial was not rotated."),
        };
        value = (value + result).rem_euclid(100);
        if value == 0 {
            zeroes += 1;
        }
        println!("The dial is rotated {line} to point at {value}.");
    }
    println!("{:?}", zeroes);
}
