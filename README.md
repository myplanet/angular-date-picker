# angular-date-picker

A lightweight calendar component for Angular


## Usage

```
bower install angular-date-picker
```

```
angular.module('app', [ 'mp.datePicker' ]);
```

### As an element
```
<date-picker></date-picker>
```

### As an attribute
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
