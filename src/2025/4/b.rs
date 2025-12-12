fn main() {
    let contents = aoc::get_input();
    let mut update = Update {
        grid: contents
            .lines()
            .map(|line| line.chars().collect())
            .collect(),
        total: i32::MAX,
    };
    let mut total = 0;
    print_grid(&update);

    while update.total > 0 {
        update = update_grid(&update.grid);

        if update.total > 0 {
            total += update.total;
            println!();
            print_grid(&update);
        }

        let reset: Vec<Vec<char>> = update
            .grid
            .iter()
            .map(|row| {
                row.iter()
                    .map(|col| if *col == 'x' { '.' } else { *col })
                    .collect()
            })
            .collect();

        update.grid = reset;
    }
    println!();
    println!("total: {}", total)
}

fn check_position(grid: &Vec<Vec<char>>, char: char, i: usize, j: usize) -> i32 {
    // println!("{:?} {char} {:?}", grid[i][j], grid[i][j] == char);
    (grid[i][j] == char) as i32
}

fn check_adjacent(grid: &Vec<Vec<char>>, i: usize, j: usize, max_i: usize, max_j: usize) -> bool {
    let char = '@';
    let mut count = 0;
    let i_bound = max_i - 1;
    let j_bound = max_j - 1;

    // println!("here 0 {i} {j}");

    if grid[i][j] != char {
        return false;
    }

    // top left
    if i > 0 && j > 0 {
        // println!("top left {i} {j}");
        count += check_position(&grid, char, i - 1, j - 1);
    }

    // top
    if i > 0 {
        // println!("top {i} {j}");
        count += check_position(&grid, char, i - 1, j);
    }

    // top right
    if i > 0 && j < j_bound {
        // println!("top right {i} {j}");
        count += check_position(&grid, char, i - 1, j + 1);
    }

    // right
    if j < j_bound {
        // println!("right {i} {j}");
        count += check_position(&grid, char, i, j + 1);
    }

    // bottom right
    if i < i_bound && j < j_bound {
        // println!("bottom right {i} {j}");
        count += check_position(&grid, char, i + 1, j + 1);
    }

    // bottom
    if i < i_bound {
        // println!("bottom {i} {j}");
        count += check_position(&grid, char, i + 1, j);
    }

    // bottom left
    if i < i_bound && j > 0 {
        // println!("bottom left {i} {j}");
        count += check_position(&grid, char, i + 1, j - 1);
    }

    // left
    if j > 0 {
        // println!("left {i} {j}");
        count += check_position(&grid, char, i, j - 1);
    }

    if count < 4 {
        // println!("i: {i}, j: {j}, count: {count}");
        return true;
    }

    return false;
}

struct Update {
    grid: Vec<Vec<char>>,
    total: i32,
}

fn update_grid(grid: &Vec<Vec<char>>) -> Update {
    let mut next = grid.clone();
    let max_i = grid.len();
    let max_j = grid[0].len();
    let mut total = 0;

    let mut i = 0;
    while i < max_i {
        let mut j = 0;
        while j < max_j {
            // println!("{i} {j} {max_j}");
            if check_adjacent(&grid, i, j, max_i, max_j) {
                next[i][j] = 'x';
                total += 1;
            }
            j += 1;
        }
        i += 1;
    }
    Update { total, grid: next }
}

fn print_grid(update: &Update) {
    let str: String = update
        .grid
        .iter()
        .map(|row| row.iter().collect::<String>())
        .collect::<Vec<String>>()
        .join("\r\n");
    if update.total == 1 {
        println!("Remove {:?} roll of paper:", update.total);
    } else if update.total == i32::MAX {
        println!("Initial state:");
    } else {
        println!("Remove {:?} rolls of paper:", update.total);
    }
    println!("{}", str);
}
