# Zoo_Land

this an app that predicts what type of animal you have sent and gives documentation about it.

## Install the python environment

Follow the steps in the mini conda docs website:
https://docs.anaconda.com/miniconda/

```
curl https://repo.anaconda.com/miniconda/Miniconda3-latest-Windows-x86_64.exe -o miniconda.exe
start /wait "" miniconda.exe /S
del miniconda.exe
```

## Add conda to your path

First Detect where /miniconda3/condabin folder is and copy the path
the defualt directory on windows is->

Second do the following:
1.Open Control Panel -> System and Security -> System (on Windows) or Terminal (on Linux).

2.Navigate to Environment Variables.

3.Edit the “Path” variable under System variables.

4.Add the path to miniconda installation directory.

5.Save the settings.

## Create a new environment

```
conda create -n zoo_land python=3.12.0
conda activate zoo_land
python pip install -r src/requirements.txt
```

## Install docker

TODO

## Launch the project (local)

```
cd src
./main.py
```
