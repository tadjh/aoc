fn main() {
    let input = aoc::get_input();
    let mut result = aoc::string_to_grid(input);
    let ops: Vec<char> = result
        .pop()
        .unwrap()
        .into_iter()
        .filter(|&c| !c.is_whitespace())
        .collect();

    let output = check(ops, result);

    println!("output: {:?}", output);
}

fn check(ops: Vec<char>, values: Vec<Vec<char>>) -> u64 {
    let mut total = 0;
    println!("{:?}", ops);

    let cols = values[0].len();
    let rows = values.len();

    // if num == "" {
    //     i += 1;
    //     continue;
    // }

    let mut start = 0;

    for op in ops {
        let mut nums: Vec<u64> = vec![];
        for col in start..cols {
            let mut num: Vec<char> = vec![];
            for row in 0..rows {
                num.push(values[row][col]);
            }
            let str = num.into_iter().collect::<String>().trim().to_string();

            if str == "" {
                start = col + 1;
                break;
            }

            let number: u64 = str.parse().unwrap();
            println!("{number}");
            nums.push(number);
        }

        if op == '*' {
            let value = nums.iter().product::<u64>();
            println!("product: {value}");
            total += value;
        } else if op == '+' {
            let value = nums.iter().sum::<u64>();
            println!("sum: {value}");
            total += value;
        } else {
            panic!("Unreachable");
        }
    }

    //     let num = values.iter().map(|line| line[i]).collect::<String>().trim();
    //     match num.parse() {}

    //     let nums: Vec<u64> = values
    //         .iter()
    //         .map(|x| aoc::string_to_integer(x[i]))
    //         .collect();
    //     if ops[i] == "*" {
    //         total += nums.iter().product::<u64>();
    //     } else if ops[i] == "+" {
    //         total += nums.iter().sum::<u64>();
    //     } else {
    //         panic!("Unreachable");
    //     }
    // }
    total
}
