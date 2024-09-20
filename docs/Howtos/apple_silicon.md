# Mac (Apple Silicone) Installation Guide

### Step-by-step installation guide

### 1. Note about command line tools

Before proceeding, check that your command line tools are up-to-date. 

### 2. Dependencies
It is most likely necessary to perform the following steps:

```console
# Install gcc and openblas
brew install gcc openblas

# Make sure that you have gcc as your cc compiler (change version from 12 to
# your GCC version if it is different)
cd $HOMEBREW_PREFIX/bin && ln -s gcc-12 cc
```

Now verify that your cc compiler points to the correct location by running `which cc`. You might need to open a new terminal window for this.

Once `cc` points to the correct location, run the following commands to install the remaining dependencies:

```console
export PKG_CONFIG_PATH="$HOMEBREW_PREFIX/opt/openblas/lib/pkgconfig:${PKG_CONFIG_PATH}"
export OWL_CFLAGS="-g -O3 -Ofast -funroll-loops -ffast-math -DSFMT_MEXP=19937 -fno-strict-aliasing -Wno-tautological-constant-out-of-range-compare"
export OWL_AEOS_CFLAGS="-g -O3 -Ofast -funroll-loops -ffast-math -DSFMT_MEXP=19937 -fno-strict-aliasing"
export EIGENCPP_OPTFLAGS="-Ofast -funroll-loops -ffast-math"
export EIGEN_FLAGS="-O3 -Ofast -funroll-loops -ffast-math"


# If opened a new terminal window, make sure to run `eval $(opam env)` first
opam install pyml toml lwt owl ocamlformat.0.24.1
```

You can now remove the `cc` symlink created earlier.

### 3. Opam package manager 
For this install procedure, `opam` is required and `make` is highly recommended.

See the Opam installation guide for how to install Opam on Mac, 
[link here](https://opam.ocaml.org/doc/Install.html)

Create the Opam 4.14.0 switch named treeppl:

```console
opam update
opam switch create treeppl 4.14.0
eval $(opam env)
```

Install required dependencies:

```console
opam install dune linenoise
```


### 4. Install Miking
Clone the Miking git repository to a suitable location on your system and enter the directory:

```console
git clone https://github.com/miking-lang/miking.git
cd miking
```

Assuming that you have downloaded the repository and are currently located in that directory, then you can install Miking on your system with `make`:
```console
make install
```

This will install the mi binary under `$HOME/.local/bin`, as well as the standard library under `$HOME/.local/lib`. If not already, make sure that `$HOME/.local/bin` is on your shell's PATH by running the following command directly or adding it to the appropriate .rc-file (e.g. `.bashrc` or `.zshrc`):

```console
export PATH="$HOME/.local/bin:$PATH"
```

### 5. Install Miking-DPPL
Clone the Miking-DPPL git repository to a suitable location on your system and enter the directory:

```console
git clone https://github.com/miking-lang/miking-dppl
cd miking-dppl
make install
```

### 6. Install TreePPL
Clone the TreePPL git repository to a suitable location on your system and enter the directory:

```console
git clone https://github.com/treeppl/treeppl
cd treeppl
make install
```

### 7. Testing you installation

To make sure your startup configurations worked, log out of your session and log back on.  Typing `tpplc` should give you manual page for the `tpplc` compiler.  You can also run a simple `coin.py` example:

```
tpplc
cd treeppl-python/examples
python3 coin.py
```

If you are running a graphics terminal, you will see the inferred coin distribution.  Otherwise, you can open the generated image file `coin_outcomes_plot.png`.  Don’t forget to delete it after that.

```
rm coin_outcomes_plot.png
```
