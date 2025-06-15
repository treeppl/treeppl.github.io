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

Notes for existing TreePPL users:

- We no longer require `gcc` as the default compiler. If you have manually linked `cc` to `gcc`, please remove the symlink.
- If OpenBLAS was previously installed via Homebrew, uninstall it before continuing:
  
  ```bash
  brew uninstall openblas
  ```

### Installing OpenBLAS from Source

Download and install OpenBLAS manually:

```bash
wget https://github.com/OpenMathLib/OpenBLAS/releases/download/v0.3.29/OpenBLAS-0.3.29.zip
unzip OpenBLAS-0.3.29.zip
cd OpenBLAS-0.3.29
make
sudo make install
```
This installs OpenBLAS to `/opt/OpenBLAS`.

## 2. Installing OCaml, Miking, and TreePPL (local user installation)

We’ll use Opam to manage OCaml versions and packages locally.

### Initialize Opam and Install Dependencies

```bash
opam init -y --bare
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
make
make install
cd ..
```

```bash
git clone https://github.com/treeppl/miking-dppl.git
cd miking-dppl
make
make install
cd ..
```

```bash
git clone https://github.com/treeppl/treeppl.git
cd treeppl
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
