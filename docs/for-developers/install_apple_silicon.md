
# Mac (Apple silicon) Installation Guide

This guide outlines the steps to install *TreePPL* and its dependencies on MacOS.

## 1. System Prerequisites

### Command Line Tools

Install Apple's Command Line Tools (if not already installed):

```bash
xcode-select --install
```

If they are already installed, a message will inform you about this.

### Homebrew and Required Packages

If you don’t have [Homebrew](https://brew.sh/) installed, install it using:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

If Homebrew is already installed, consider running the following commands to update and upgrade the installed packages:

```bash
brew update
brew upgrade
```

Next, install the necessary packages:

```bash
brew install opam openblas libomp fftw
```

Finally, set some environment variables needed when compiling owl:

```bash
export OWL_LDFLAGS="-L/opt/homebrew/opt/libomp/lib -lomp"
export OWL_CPPFLAGS="-Xpreprocessor -fopenmp"
```


## 2. Installing OCaml, Miking, and TreePPL (local user installation)

We’ll use Opam to manage OCaml versions and packages locally.

### Initialize Opam and Install Dependencies

```bash
opam init --bare
opam update
opam switch create treeppl-ocaml 5.3.0
eval $(opam env --switch=treeppl-ocaml)
opam install dune ocamlfind linenoise menhir owl
```

Opam supports multiple OCaml environments via switches; the number refers to the OCaml version. TreePPL expects the *treeppl-ocaml* switch to be active:

```bash
eval $(opam env --switch=treeppl-ocaml)
```

To automatically activate it when opening a new shell, add the above line to your `~/.zshrc`. We are basing the switch on version 5.3.0 of OCaml as this is the latest version we have tested thoroughly but we are not aware of any issues with more recent versions of OCaml.


### Set Up Environment Variables

Add the following lines to your `~/.zshrc`:

```bash
export PATH="$HOME/.local/bin:$PATH"
export MCORE_LIBS=stdlib="$HOME/.local/lib/mcore/stdlib":coreppl="$HOME/.local/src/coreppl":treeppl="$HOME/.local/src/treeppl"
```

### Install Miking, Miking DPPL, and TreePPL

These commands will clone the repositories and install the tools locally. Run them from your desired directory:

```bash
git clone https://github.com/miking-lang/miking.git
cd miking
make clean
make
make install
cd ..
```

```bash
git clone https://github.com/miking-lang/miking-dppl.git
cd miking-dppl
make clean
make
make install
cd ..
```

```bash
git clone https://github.com/treeppl/treeppl.git
cd treeppl
make clean
make
make install
cd ..
```

## 3. Verifying the Installation

### Check if `tpplc` is Installed

Open a new terminal and run:

```bash
tpplc --help
```

You should see the TreePPL compiler's help text.

### Run a Sample Model

Compile and run the coin model:

```bash
tpplc ~/.local/src/treeppl/models/lang/coin.tppl --output coin
./coin ~/.local/src/treeppl/models/lang/data/testdata_coin.json
```

You should see a stream of JSON-formatted samples.
