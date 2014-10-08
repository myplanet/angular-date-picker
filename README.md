angular-calendar
================

A lightweight calendar component for Angular


## Usage

```
bower install angular-calendar
```

```
angular.module('app', [ 'mp.calendar' ]);
```

### As an element
```
<calendar></calendar>
```

### As an attribute
```
<div calendar></div>
```

### Model binding
```
<label>
    Start Date
    <input type="text ng-model="startDate" />
    <calendar ng-model="startDate"></calendar>
</label>
```
