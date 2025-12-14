fn main() {
    let input = aoc::get_input();
    let mut result: Vec<Vec<&str>> = input
        .lines()
        .map(|line| line.split(" ").filter(|x| *x != "").collect())
        .collect();
    let ops: Vec<&str> = result.pop().unwrap();

    let output = check(ops, result);

    println!("output: {:?}", output);
}

fn check(ops: Vec<&str>, values: Vec<Vec<&str>>) -> u64 {
    let mut total = 0;
    for i in 0..ops.len() {
        let nums: Vec<u64> = values
            .iter()
            .map(|x| aoc::string_to_integer(x[i]))
            .collect();
        if ops[i] == "*" {
            total += nums.iter().product::<u64>();
        } else if ops[i] == "+" {
            total += nums.iter().sum::<u64>();
        } else {
            panic!("Unreachable");
        }
    }
    total
}
