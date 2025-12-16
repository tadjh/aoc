fn main() {
    let input = aoc::get_input();
    let parsed = parse(input, ',');
    let output = score(parsed);

    println!("output: {:?}", output);
}

#[derive(Clone, Copy, Debug)]
struct Coords {
    x: i64,
    y: i64,
    z: i64,
}

fn parse(str: String, delimiter: char) -> Vec<Coords> {
    str.lines()
        .map(|line| {
            let vec: Vec<i64> = line.split(delimiter).map(|x| x.parse().unwrap()).collect();
            Coords {
                x: vec[0],
                y: vec[1],
                z: vec[2],
            }
        })
        .collect()
}

fn score(parsed: Vec<Coords>) -> (i64, Vec<Coords>) {
    let mut lowest: i64 = i64::MAX;
    let mut coords: Vec<Coords> = vec![Coords { x: 0, y: 0, z: 0 }; 2];
    for (i, curr) in parsed.iter().enumerate() {
        let start = i + 1;
        for j in start..parsed.len() {
            let next = &parsed[j];
            let this = distance(curr, next);
            if this < lowest {
                lowest = this;
                coords = vec![*curr, *next];
            }
        }
    }
    (lowest, coords)
}

fn distance(a: &Coords, b: &Coords) -> i64 {
    ((a.x - b.x).pow(2) + (a.y - b.y).pow(2) + (a.z - b.z).pow(2)).isqrt()
}
