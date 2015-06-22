# -*- coding: utf-8 -*-

try:
    from setuptools import setup
except ImportError:
    from distutils.core import setup


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
)