---
layout: default
id: r
sidebar_position: 5
---

# R interface

`treepplr` is an interface for using the TreePPL program. All functions start
with `tp_` to easily distinguish them from functions from other packages.

The three necessary parts for doing analysis with TreePPL are: model, data and 
inference machinery. 

## Model

You can choose a model in TreePPL language from our 
[library](https://treeppl.org/docs/model-library) or you can write your own model.

To list all available models in our library, use `tp_model_library()` to retrieve
the models within the [TreePPL github repository](https://github.com/treeppl/treeppl/tree/main/models). 

```r
model_lib <- tp_model_library()
````
To use one of these models you just need its name in `model_lib$model_name`.

If you want to use your own custom model, you will need to write it in TreePPL 
language and pass it to an R object that contains either the full path to the 
`.tppl` file containing the model, or a string with the full model.

```r
# import a model from file
model_path <- "path/to/my_model.tppl"
```

## Data

<!-- waiting -->
<!-- Each model accepts specific data types. There is a helper function that tells -->
<!-- you which data input a given model needs. -->

<!-- ```{r} -->
<!-- tp_expected_input() -->
<!-- ``` -->

TreePPL only reads a custom JSON format, so `treepplr` converts a variety of
input data to this format and writes to file, which will then be used by TreePPL.
Here are some examples:

```r
# for models that only need a phylogenetic tree
phylo <- ape::read.tree(file = "path/to/your/file.tre")
data_path <- tp_data(data_input = phylo)

# or sequence data
fasta_file <- "path/to/your/file.fasta"
data_path <- tp_data(data_input = fasta_file)
```

As for models, you can also use test datasets from the TreePPL library by passing
the name of the model (we'll come back to this later).

## Inference method

TreePPL offers a variety of inference methods. Different methods work best for
different models. See the [model library](https://treeppl.org/docs/model-library)
for our recommendations of which inference methods to choose for each model.

<!-- waiting -->
<!-- For a full list of inference methods supported by TreePPL run: -->

<!-- ```{r} -->
<!-- tp_compile_options() -->
<!-- ``` -->


## Compilation

Once you have chosen the model and the inference method you want to use, you can
compile your model to en executable that also contains the necessary machinery
to run the chosen inference method.

```r
# Using a model from the library and a Sequential Monte Carlo method
exe_path <- tp_compile(model = "crbd", method = "smc-apf", particles = 10000)

# Using a custom model and a Markov chain Monte Carlo method
exe_path <- tp_compile(model = model_path, method = "mcmc-lightweight",
                       iterations = 10000)
```


## Running 

Now you are ready to run your analysis. All you have to do is to pass your data
to the compiled executable and choose how many independent runs you want to do.

```r
output <- tp_run(compiled_model = exe_path, data = data_path, n_runs = 4)
```

<!-- ## Convergence -->

<!-- ## Post-processing -->

