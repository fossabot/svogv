# ![](https://github.com/joergkrause/svogv/blob/master/guides/logo.png?raw=true) SVOGV Widget and Forms Library

## Introduction

This is a placeholder for the current development state.

I have split up the library into parts to handle the further development better.

The currently available projects are:

* @svogv/bootstrap --> This is an exact copy of the former 'svogv' project. You just change the references and you're set for the future.
* @svogv/material --> The same library using Angular Material 2 and the CDK as an foundation.

## Further steps

There are plans to extend the widget collection later. This will lead to another split as the new widgets will go into another library within the @svogv master folder.

## How to update?

Open your *package.json*. Find the line (the version may differ):

~~~
"svogv": "^0.3.5"
~~~

Change the line to:

~~~
"@svogv/bootstrap": "^0.3.5"
~~~

Refresh your modules:

~~~
npm i
~~~

That's it in the settings. I case you use SystemJs and gulp form you need to change the bundles paths.

In the code it's necessary to change the module source accordingly. 

~~~
import { FormValidatorService, FormValidatorFromJsonService, WindowRef, SvogvModule } from '@svogv/bootstrap';
~~~
