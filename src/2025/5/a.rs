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
    let ingredients: Vec<u64> = paragraphs[1]
        .lines()
        .map(|item| aoc::string_to_integer(item))
        .collect();

    let output = check_ranges(ranges.clone(), ingredients.clone())
        .iter()
        .filter(|&x| *x)
        .count();

    println!(
        "ranges:\r\n{:?}\ningredients:\r\n{:?}\r\n{:?}",
        ranges, ingredients, output
    );
}

fn to_inclusive_range(start: u64, end: u64) -> Range<u64> {
    start..end + 1
}

fn check_ranges(ranges: Vec<Range<u64>>, ingredients: Vec<u64>) -> Vec<bool> {
    let mut result: Vec<bool> = vec![false; ingredients.len()];

    for (i, ingredient) in ingredients.iter().enumerate() {
        for range in &ranges {
            if range.contains(ingredient) {
                result[i] = true;
                break;
            }
        }
    }

    result
}
