use std::fs;
use std::i64;

fn main() {
    let contents = fs::read_to_string("input.txt").expect("Should have been able to read the file");
    let mut total: i64 = 0;
    let ranges: Vec<i64> = contents
        .split(",")
        .map(|entry| {
            let range = entry
                .split("-")
                .map(|num| num.parse::<i64>().expect("Valid integer"))
                .collect::<Vec<i64>>();
            let result = check_range(range.clone());
            total += result.total;
            result.invalid
        })
        .collect();
    println!("{:?}, count: {total}", ranges);
}

fn is_repeated(id: i64) -> bool {
    let str = id.to_string();
    let mut i = 1;
    let max = str.len() / 2;
    while i < max + 1 {
        let source = &str[0..i];

        if str.len() % source.len() != 0 {
            i += 1;
            continue;
        }

        let test = (0..str.len())
            .step_by(source.len())
            .all(|x| &str[x..x + source.len()] == source);

        if test {
            println!("str: {str}, source: {source}, test: {:?}", test);
            return true;
        }
        i += 1;
    }
    return false;
}

fn check_id(id: i64) -> i64 {
    if is_repeated(id) {
        return id;
    }

    return 0;
}

struct Range {
    invalid: i64,
    total: i64,
}

fn check_range(range: Vec<i64>) -> Range {
    let mut id = range[0];
    let mut invalid = 0;
    let mut total: i64 = 0;
    while id <= range[1] {
        let result = check_id(id);
        if result != 0 {
            invalid += 1;
        }
        total += result;

        id += 1;
    }
    Range { invalid, total }
}
