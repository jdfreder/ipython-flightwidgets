# -*- coding: utf-8 -*-

try:
    from setuptools import setup
    from setuptools.command.install import install
except ImportError:
    from distutils.core import setup
    from distutils.core.command.install import install

class InstallCommand(install):
    """Install as noteboook extension"""
    develop = False

    def install_extension(self):
        from os.path import dirname, abspath, join
        from IPython.html.nbextensions import install_nbextension
        from IPython.html.services.config import ConfigManager

        print("Installing nbextension ...")
        flightwidgets = join(dirname(abspath(__file__)), 'flightwidgets', 'js')
        install_nbextension(flightwidgets, destination='flightwidgets', symlink=self.develop, user=True)

    def run(self):
        print "Installing Python module..."
        install.run(self)

        # Install Notebook extension
        self.install_extension()

class DevelopCommand(InstallCommand):
    """Install as noteboook extension"""
    develop = True

from glob import glob 
setup(
    name='flightwidgets',
    version='0.1',
    description='Flight attitude and compass widgets for the Jupyter notebook.',
    author='Jonathan Frederic',
    author_email='jon.freder@gmail.com',
    license='New BSD License',
    url='https://github.com/jdfreder/ipython-flightwidgets',
    keywords='data visualization interactive interaction python ipython widgets widget',
    classifiers=['Development Status :: 4 - Beta',
                 'Programming Language :: Python',
                 'License :: OSI Approved :: MIT License'],
    packages=['flightwidgets', 'flightwidgets/py'],
    include_package_data=True,
    cmdclass={
        'install': InstallCommand,
        'develop': DevelopCommand,
    }
)