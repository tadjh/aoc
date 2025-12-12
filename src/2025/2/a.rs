use std::fs;
use std::i64;

fn main() {
    let contents = fs::read_to_string("test.txt").expect("Should have been able to read the file");
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
    let max = str.len() / 2;
    let source = &str[0..max];
    let test = &str[max..];

    if source == test {
        println!("repeated {source}{test}");
        return true;
    }
    return false;
}

// fn is_leading_zero(id: i64) -> bool {
//     let str = id.to_string();
//     let first = &str[0..1];
//     if first == "0" {
//         return true;
//     }
//     return false;
// }

fn check_id(id: i64) -> i64 {
    if is_repeated(id) {
        return id;
    }

    // if is_leading_zero(id) {
    //     return id;
    // }
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
    loop {
        let result = check_id(id);
        if result != 0 {
            invalid += 1;
        }
        total += result;

        id += 1;

        if id > range[1] {
            break;
        }
    }
    Range { invalid, total }
}
