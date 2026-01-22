
# Mac (Apple silicon) Installation Guide

This guide outlines the steps to install *TreePPL* and its dependencies on MacOS.

## 1. System Prerequisites

### Command Line Tools

Install Apple's Command Line Tools (if not already installed):

```bash
xcode-select --install
```

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
brew install gcc opam wget
```

### Set GCC as the Default cc Compiler for OpenBLAS installation
If GCC is not set as your default cc compiler, create a symlink to ensure it's used:

```bash
# Create a symbolic link to use GCC as the default cc compiler
# Note: Adjust the GCC version if different (e.g., gcc-12)
cd $HOMEBREW_PREFIX/bin && ln -s gcc-12 cc
```

Verify: After this, check that cc points to the correct compiler:
```bash
which cc
```
Open a new terminal window for the changes to take effect.


Notes for existing TreePPL users:

- If OpenBLAS was previously installed via Homebrew, uninstall it before continuing:
  
  ```bash
  brew uninstall openblas
  ```

### Installing OpenBLAS from Source

Download and install OpenBLAS manually:

```bash
wget https://github.com/OpenMathLib/OpenBLAS/releases/download/v0.3.31/OpenBLAS-0.3.31.zip
unzip OpenBLAS-0.3.31.zip
cd OpenBLAS-0.3.31
make
sudo make install
```
This installs OpenBLAS to `/opt/OpenBLAS`.

### Delete the cc symbolic link

```bash
rm $HOMEBREW_PREFIX/bin/cc
```


## 2. Installing OCaml, Miking, and TreePPL (local user installation)

We’ll use Opam to manage OCaml versions and packages locally.

### Initialize Opam and Install Dependencies

```bash
opam init --bare
````

If you get an error, try the command above again without the -y option, then continue. 

```bash
opam update
opam switch create treeppl-ocaml 5.3.0
eval $(opam env --switch=treeppl-ocaml)
export PKG_CONFIG_PATH="/opt/OpenBLAS/lib/pkgconfig:$PKG_CONFIG_PATH"
opam install -y --no-depexts dune ocamlfind linenoise owl menhir
```

Opam supports multiple OCaml environments via switches. TreePPL expects the *treeppl-ocaml* switch to be active:

```bash
eval $(opam env --switch=treeppl-ocaml)
```

To automatically activate it when opening a new shell, add the above line to your `~/.zshrc`.

### Set Up Environment Variables

Add the following lines to your `~/.zshrc`:

```bash
export PATH="$HOME/.local/bin:$PATH"
export MCORE_LIBS=stdlib="$HOME/.local/lib/mcore/stdlib":coreppl="$HOME/.local/src/coreppl":treeppl="$HOME/.local/src/treeppl"
```

### Install Miking, Miking DPPL, and TreePPL

These commands will clone the repositories and install the tools locally. Run them from your desired directory:

```bash
git clone https://github.com/treeppl/miking.git
cd miking
make clean
make
make install
cd ..
```

```bash
git clone https://github.com/treeppl/miking-dppl.git
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
./coin ~/.local/src/treeppl/models/lang/coin.json
```

You should see a stream of JSON-formatted samples.
