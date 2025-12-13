fn main() {
    let input = aoc::get_input();
    let paragraphs = aoc::input_to_paragraphs(input);
    let ranges: Vec<Vec<u32>> = paragraphs[0]
        .lines()
        .map(|line| {
            line.split("-")
                .map(|item| aoc::string_to_integer(item))
                .collect()
        })
        .collect();
    let ingredients: Vec<u32> = paragraphs[1]
        .lines()
        .map(|item| aoc::string_to_integer(item))
        .collect();

    println!("ranges:\r\n{:?}\ningredients:\r\n{:?}", ranges, ingredients);
}
