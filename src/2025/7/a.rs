use std::collections::HashSet;
fn main() {
    let input = aoc::get_input();
    let mut parsed = aoc::string_to_grid(input);
    let start = find_start(&parsed);

    match start {
        Some(start) => update(&mut parsed, start),
        None => panic!("Cannot find start!"),
    }
}

fn update(parsed: &mut Vec<Vec<char>>, start: (usize, usize)) {
    let mut prev: Vec<usize> = vec![start.1];
    let mut next: HashSet<usize> = HashSet::new();
    let mut splits: usize = 0;
    for row in start.0..parsed.len() {
        if row + 1 >= parsed.len() {
            break;
        }
        let y = row + 1;

        for col in prev {
            let character = parsed[y][col];

            if character == '^' {
                splits += 1;
                if col > 0 {
                    next.insert(col - 1);
                }

                if col + 1 < parsed[0].len() {
                    next.insert(col + 1);
                }
            } else if character == '.' {
                next.insert(col);
            }
        }

        let mut sorted: Vec<_> = next.clone().into_iter().collect();
        sorted.sort();
        prev = sorted.clone();

        for i in sorted {
            parsed[y][i] = '|';
        }

        next = HashSet::new();
        // let output = aoc::grid_to_string(parsed.to_vec());
        // println!("{output}\n");
    }
    println!("{splits}");
}

fn find_start(parsed: &Vec<Vec<char>>) -> Option<(usize, usize)> {
    for row in 0..parsed.len() {
        for col in 0..parsed[row].len() {
            if parsed[row][col] == 'S' {
                return Some((row, col));
            }
        }
    }
    return None;
}
