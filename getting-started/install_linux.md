---
sidebar_class_name: hidden
---

# Linux Installation Guide

## Ubuntu 22.04.4 LTS (GNU/Linux 6.5.0-41-generic x86_64) running on bare metal using bash with elevated privileges

### 1. System pre-requisites (sudo required)

The following packages are system-wide prerequisites, i.e. they require `sudo` and they can be installed via `apt`:

- unzip
- bubblewrap
- bzip2
- python3-pip
- python3-tk
- m4
- make
- gcc

If your user is not in the `sudoers` (like if you’re on a cluster), you will not be able to install those

```bash
sudo apt install unzip
sudo apt install bubblewrap
sudo apt install bzip2
sudo apt install python3-pip python3-tk
sudo apt install m4 make gcc
```
Opam, the Ocaml package manager is also a pre-requisite.  The recommended installation method script requires elevated privileges, as it defaults `/usr/local/bin`.  If you do not have an existing Opam installation, you can change this by modifying `DEFAUL_BINDIR` inside the script, however, if you do, it will not work.

```bash
bash -c "sh <(curl -fsSL https://opam.ocaml.org/install.sh)"
```
### 2. Installing  compilers (local user installation) and packages

The following compilers have to be installed and can be installed as the local user:

- Ocaml 5 `ocamlc`
- Miking `mi`
- Miking CorePPL `cppl`
- TreePPL compiler `tpplc`
- TreePPL Python package

Here is a script that takes care of the **OCaml 5 installation**:

```bash
#!/usr/bin/env bash
# Tested on Ubuntu 22.04.4 LTS

####################
## Opam and OCaml ##
####################
read -p "Install/reinstall OCaml 5 (Opam required)? " -n 1 -r; echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  ## Clean up
  rm -rf ~/.opam

  ## Install OCaml 5 and standard packages
  opam init -y
  opam update
  opam switch create 5.0.0
  eval $(opam env)
  opam install -y dune linenoise utop ocp-indent merlin

  ## Install packages required in Miking
  opam pin ocamlformat 0.24.1
  opam install -y pyml toml owl
fi
```

:::note

Using a different OCaml version simultaneously with OCaml 5
The above script will create a switch for OCaml 5, but you could use different versions if you need them with `opam switch`.

:::

The following script takes care of the **Miking and TreePPL compilers and packages**:

```bash
eval $(opam env)
git clone -n https://github.com/treeppl/miking.git
cd miking
git checkout 24505bd
make install
export PATH="$HOME/.local/bin:$PATH"
cd ..

git clone -n https://github.com/treeppl/miking-dppl.git
cd miking-dppl
git checkout 70fabcc
make install
export MCORE_LIBS="coreppl=$HOME/.local/src/coreppl/"
cd ..

git clone https://github.com/treeppl/treeppl.git
cd treeppl
make install
export MCORE_LIBS="$MCORE_LIBS:treeppl=$HOME/.local/src/treeppl/"
cd ..

pip install "git+https://github.com/treeppl/treeppl-python#egg=treeppl"

pip install matplotlib seaborn
```

:::note

If `error: externally-managed-environment` arisen, you can use the option `--break-system-packages` to handle it. For more details, read your local python README.venv

:::

This script will create three source directories in the directory where you execute it: `miking`, `miking-dppl` and `treeppl` and instruct you how to set up the environment variables.  If you don’t want to do any TreePPL development, you can remove `miking` and `miking-dppl` install sources, but you don’t have to.

```bash
rm -rf miking/ miking-dppl/
```

Please make sure you add the environment customizations to your startup file `.bashrc`:

```bash
## Customizations for TreePPL
eval $(opam env)
export PATH="$HOME/.local/bin:$PATH"
export MCORE_LIBS="coreppl=$HOME/.local/src/coreppl/"
export MCORE_LIBS="$MCORE_LIBS:treeppl=$HOME/.local/src/treeppl/"
```
### 3. Testing you installation

To make sure your startup configurations worked, log out of your session and log back on.  Typing `tpplc` should give you manual page for the `tpplc` compiler.  You can also run a simple `coin.py` example:

```bash
tpplc
cd treeppl-python/examples
python3 coin.py
```

If you are running a graphics terminal, you will see the inferred coin distribution.  Otherwise, you can open the generated image file `coin_outcomes_plot.png`.  Don’t forget to delete it after that.

```bash
rm coin_outcomes_plot.png
```
