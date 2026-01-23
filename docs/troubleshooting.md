---
id: troubleshooting
sidebar_position: 11
---

# Troubleshooting

Here we collect a few tips on how to solve problems you may encounter when installing or running TreePPL. If you cannout solve your problem using any of the tips listed here, please open an issue on TreePPL's [github repo](https://https://github.com/treeppl/treeppl).
If you find errors or have suggestions for improvement in the documentation, report it to the [web site repo](https://github.com/treeppl/treeppl.github.io).
You can also contribute to addressing the issue(s) yourself.See instructions [here](for-developers/index.md).

## Installation

### Installing the python package on MacOS with homebrew

`brew install python` will make python available using the command `python3`. Similarly, `pip` will be available as `pip3`. However, Homebrew will print an error message if you try to install the TreePPL package using `pip3 install <name_of_file.whl>`.

The message that is printed by Homebrew will recommend you to install and run the package in a virtual environment. The message also gives you all the instructions you need in order to do so. In short, navigate to a directory you wish to use for your TreePPL projects, and then use the following commands:

```
... % python3 -m venv env
... % source env/bin/activate
(env) ... % pip install <name_of_file.whl>
```
You can use any name for your environment, but it is customary to choose `env`.

To use TreePPL through the python package, run
```
(env) ... % python
>>> import treeppl
```

At the end of your session, deactivate your virtual environment using
```
>>> quit
(env) ... % deactivate
... % 
```
This will bring you back to your terminal window.


