use std::cmp;
use std::ops::Range;
fn main() {
    let input = aoc::get_input();
    let paragraphs = aoc::input_to_paragraphs(input);
    let ranges: Vec<Range<u64>> = paragraphs[0]
        .lines()
        .map(|line| {
            let range: Vec<u64> = line
                .split("-")
                .map(|item| aoc::string_to_integer(item))
                .collect();
            to_inclusive_range(range[0], range[1])
        })
        .collect();
    // let ingredients: Vec<u64> = paragraphs[1]
    //     .lines()
    //     .map(|item| aoc::string_to_integer(item))
    //     .collect();

    let mut start_len = ranges.len();
    let mut result = consolidate_ranges(ranges);
    let mut result_len = result.len();
    while result_len < start_len {
        start_len = result_len;
        result = consolidate_ranges(result);
        result_len = result.len();
    }

    let output = count_ranges(result);

    // println!(
    //     "ranges:\r\n{:?}\ningredients:\r\n{:?}\r\n{:?}",
    //     ranges, ingredients, output
    // );
    println!("output: {:?}", output);
}

fn to_inclusive_range(start: u64, end: u64) -> Range<u64> {
    start..end + 1 // ?? keep
}

// fn check_ranges(ranges: Vec<Range<u64>>, ingredients: Vec<u64>) -> Vec<bool> {
//     let mut result: Vec<bool> = vec![false; ingredients.len()];

//     for (i, ingredient) in ingredients.iter().enumerate() {
//         for range in &ranges {
//             if range.contains(ingredient) {
//                 result[i] = true;
//                 break;
//             }
//         }
//     }

//     result
// }

fn combine_ranges(left: Range<u64>, right: Range<u64>) -> Vec<Range<u64>> {
    println!("\t\tcombine: {:?} {:?}", &left, &right);

    // No overlap, nor neighbors
    if left.end < right.start || left.start > right.end {
        return vec![left, right];
    }

    let min = cmp::min(left.start, right.start);
    let max = cmp::max(left.end, right.end);

    return vec![(min..max)];
}

fn consolidate_ranges(ranges: Vec<Range<u64>>) -> Vec<Range<u64>> {
    let mut output: Vec<Range<u64>> = vec![];
    for range in ranges {
        println!("range: {:?}", &range);
        if output.is_empty() {
            output.push(range);
            continue;
        }

        println!("\tlen: {:?}", output.len());
        let mut search = false;
        for i in 0..output.len() {
            let out = output[i].clone();
            let combination = combine_ranges(out, range.clone());

            if combination.len() == 1 {
                output[i] = combination[0].clone();
                println!("\t\tupdate: {:?}", output);
                search = true;
                break;
            }

            // if combination.len() > 1 {
            //     for combo in &combination[1..] {
            //         output.push(combo.clone());
            //     }
            //     println!("\t\tpush: {:?}", output);
            // }
        }
        if !search {
            output.push(range);
        }

        println!("output: {:?}", output);
    }

    output
}

fn count_ranges(ranges: Vec<Range<u64>>) -> usize {
    ranges.iter().map(|range| range.clone().count()).sum()
}
