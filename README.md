# angular-date-picker

A lightweight calendar directive for Angular with two-way model binding.


## Usage

### Intallation

Install using Bower:

```
bower install angular-date-picker
```

### Inclusion

The library can be loaded as a global:

```
<script src="bower_components/angular-date-picker/angular-date-picker.js"></script>
```

```
angular.module('app', [ 'mp.datePicker' ]);
```

It can also be loaded as an AMD module:

```
requirejs.config({
    paths: {
        'angular': 'bower_components/angular/angular',
        'angular-date-picker': 'bower_components/angular-date-picker/angular-date-picker'
    },
    shim: {
        'angular': {
            exports: 'angular'
        }
    }
});

require([ 'angular', 'angular-date-picker' ], function (angular) {
    angular.module('app', [ 'mp.datePicker' ]);
});
```

Optionally include default styles (or you can style everything from scratch):

```
<link rel="stylesheet" href="bower_components/angular-date-picker/angular-date-picker.css" />
```

### Usage as an element directive

```
<date-picker></date-picker>
```

### Usage as an attribute directive

```
<div date-picker></div>
```

### Model binding
```
<label>
    Start Date
    <input type="text ng-model="startDate" />
    <date-picker ng-model="startDate"></date-picker>
</label>
```
