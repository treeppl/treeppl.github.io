# Mac (Apple Silicone) Installation Guide

### 1. Check Command Line Tools

Before proceeding, ensure that your Command Line Tools are up-to-date. Run the following in your terminal:
```console
xcode-select --install
```
This will prompt you to install or update the necessary development tools.

### 2. Install Dependencies via Homebrew
To install the required dependencies, use Homebrew. If Homebrew is not installed, you can install it by running:
```console
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
After installing Homebrew, use the following commands to install the necessary packages:

```console
brew install python@3.11  # This installs Python 3.11 and pip3
brew install make gcc openblas
```

#### Set GCC as the Default cc Compiler
If GCC is not set as your default cc compiler, create a symlink to ensure it's used:

```console
# Create a symbolic link to use GCC as the default cc compiler
# Note: Adjust the GCC version if different (e.g., gcc-12)
cd $HOMEBREW_PREFIX/bin && ln -s gcc-12 cc
```

Verify: After this, check that cc points to the correct compiler:
```console
which cc
```
Open a new terminal window if necessary for the changes to take effect.

###  3. Set Up Environment for Compilation
Now, set the required environment variables for the compilation process:

```console
export PKG_CONFIG_PATH="$HOMEBREW_PREFIX/opt/openblas/lib/pkgconfig:${PKG_CONFIG_PATH}"
export OWL_CFLAGS="-g -O3 -Ofast -funroll-loops -ffast-math -DSFMT_MEXP=19937 -fno-strict-aliasing -Wno-tautological-constant-out-of-range-compare"
export OWL_AEOS_CFLAGS="-g -O3 -Ofast -funroll-loops -ffast-math -DSFMT_MEXP=19937 -fno-strict-aliasing"
export EIGENCPP_OPTFLAGS="-Ofast -funroll-loops -ffast-math"
export EIGEN_FLAGS="-O3 -Ofast -funroll-loops -ffast-math"
```

If you want, you can now remove the `cc` symlink created earlier.

### 4. Install Dependencies via Opam
You need to install Opam, the OCaml package manager. If Opam is not installed, follow the installation instructions here:
[Opam Installation Guide](https://opam.ocaml.org/doc/Install.html)

Once `opam` is installed, create a switch for OCaml 5.0.0:

```console
opam update
opam switch create 5.0.0
eval $(opam env)
```

Next, install the required OCaml packages:

```console
opam install dune linenoise
opam install pyml toml lwt owl ocamlformat.0.24.1 dune linenoise
```


### 5. Install Miking and TreePPL
The following script installs **Miking** and **TreePPL** compilers along with the required packages:

```console
# Initialize environment
eval $(opam env)

# Clone and install Miking
git clone https://github.com/treeppl/miking.git
cd miking
make install
cd ..

# Clone and install Miking-DPPL
git clone https://github.com/treeppl/miking-dppl.git
cd miking-dppl
make install
cd ..

# Clone and install TreePPL
git clone https://github.com/treeppl/treeppl.git
cd treeppl
make install
cd ..

# Clone and install TreePPL-Python
git clone https://github.com/vsenderov/treeppl-python.git
cd treeppl-python
pip install -e .
pip install matplotlib seaborn
```

This script will create four directories (`miking`, `miking-dppl`, `treeppl` and `treeppl-python`) where you execute the script and instruct you how to set up the environment variables. If you don’t plan to work on TreePPL development, you can safely remove the `miking` and `miking-dppl` directories after the installation:

```console
rm -rf miking/ miking-dppl/
```

### 6. Customize Your Environment
To ensure your environment is set up correctly every time you open a terminal, add the necessary environment variables to your `~/.zshrc` file:

Edit your `~/.zshrc` file:
```console
nano ~/.zshrc
```
Then, add the following lines at the end of the file:
```console
## Customizations for TreePPL
eval $(opam env)
export PATH="$HOME/.local/bin:$PATH"
export MCORE_LIBS="coreppl=$HOME/.local/src/coreppl/"
export MCORE_LIBS="$MCORE_LIBS:treeppl=$HOME/.local/src/treeppl/"
```
Save and close the file (in `nano`, press `CTRL + X`, then `Y`, and `ENTER`).

To apply the changes, either close and reopen the terminal or run:
```console
source ~/.zshrc
```

### 7. Test Your Installation

To verify that the installation worked correctly, restart your terminal session and run:
```console
tpplc
```

You should see the manual page for the tpplc compiler.

To further verify the setup, you can run the example `coin.py` located in the `treeppl-python` directory:

```console
cd treeppl-python/examples
python3 coin.py
```

If you are using a graphical terminal, a plot showing the inferred coin distribution should appear. If not, you can open the generated image file `coin_outcomes_plot.png`:
```console
open coin_outcomes_plot.png
```
Once you have verified the output, you can delete the image:
```console
rm coin_outcomes_plot.png
```