# Functional programming languages

Functional programming languages focus on expressing computation as function transformations rather than as instructions. One main feature of functional languages is immutability. That means the result of evaluating an expression can be stored as a named value but you can't change the value of this named value.

### Exemple
```python
# TreePPL code
# x store the result of evaluating 200 as a integer
let x = 200;
# Not possible to change 200 for 100
x = 100; (Error)
# Need to store 100 in a other named value
let y = 100;
```

## Comparison (in C++)

### Imperatif

```c

// Fill a vector with 
// 100 values draw from a normal distribution of parameters mu and sigma

std::mt19937_64 seed_generator
std::normal_distribution norm_dist(mu, sigma);
std::vector<double> data;

int data_size = 100;

for (int i = 0; i < data_size; ++i)
{
    data[i] = norm_dist(seed_generator);
}

```

### Functionnal

```c

// Define function

std::vector<double> fill_vec(int index, int max_index, std::vector<double> vec,
  std::normal_distribution distrib, std::mt19937_64& seed)
  {
    if (index < max_index)
    {
        vec.emplace_back(distrib(seed));
        return fill_vec(index + 1, max_index, vec, distrib(seed));
    }
    else
    {
        return vec;
    }
  };

// Create synthetic data using function fill_vec
// 100 values draw from a normal distribution of parameters mu and sigma

std::mt19937_64 seed_generator
std::normal_distribution norm_dist(mu, sigma);
int data_size = 100

// First turn, index is 0 and vector is void [] 
// Second turn, index is 1 and vector : [X1]
// Third turn, index is 2 and vector : [X1, X2], etc
std::vector<double> data = fill_vec(0, data_size, std::vector<double>(), norm_dist, seed_generator);

```
