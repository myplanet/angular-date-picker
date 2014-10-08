(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([ 'module', 'angular' ], function (module, angular) {
            module.exports = factory(angular);
        });
    } else {
        if (!root.mp) {
            root.mp = {};
        }

        root.mp.datePicker = factory(root.angular);
    }
}(this, function (angular) {
    'use strict';

    return angular.module('mp.datePicker', []).directive('date-picker', [ '$window', function ($window) {
        // Introduce custom elements for IE8
        $window.document.createElement('date-picker');

        var tmpl = ''
+ '<div class="angular-date-picker">'
+ '    <div class="_month">'
+ '        <button type="button" class="_previous" title="Previous Month" ng-click="changeMonthBy(-1)">&laquo;</button>'
+ '        {{ months[month].shortName }} {{ year }}'
+ '        <button type="button" class="_next" title="Next Month" ng-click="changeMonthBy(1)">&raquo;</button>'
+ '    </div>'
+ '    <div class="_days" ng-mousedown="pickDay($event)">'
+ '        <div class="_day-of-week" ng-repeat="dayOfWeek in daysOfWeek">{{ dayOfWeek.letter }}</div>'
+ '        <div class="_day -padding" ng-repeat="day in leadingDays">{{ day }}</div>'
+ '        <div class="_day -selectable" ng-repeat="day in days" ng-class="{ \'-selected\': (day === selectedDay), \'-today\': (day === today) }" title="{{ day === today ? \'Today\' : \'\' }}">{{ day }}</div>'
+ '        <div class="_day -padding" ng-repeat="day in trailingDays">{{ day }}</div>'
+ '    </div>'
+ '</div>'
        ;

        return {
            restrict: 'AE',
            template: tmpl,
            replace: true,
            require: '?ngModel',
            scope: {
                onDateSelected: '&',
                formatDate: '=',
                parseDate: '='
            },

            link: function ($scope, $element, $attributes, ngModel) {
                // Slices of this are used for ngRepeat
                var days = [],
                    selectedDate = null;

                for (var i = 1; i <= 31; i++) {
                    days.push(i);
                }

                $scope.months = [{
                    shortName: 'Jan'
                }, {
                    shortName: 'Feb'
                }, {
                    shortName: 'Mar'
                }, {
                    shortName: 'Apr'
                }, {
                    shortName: 'May'
                }, {
                    shortName: 'Jun'
                }, {
                    shortName: 'Jul'
                }, {
                    shortName: 'Aug'
                }, {
                    shortName: 'Sep'
                }, {
                    shortName: 'Oct'
                }, {
                    shortName: 'Nov'
                }, {
                    shortName: 'Dec'
                }];

                $scope.daysOfWeek = [{
                    letter: 'S'
                }, {
                    letter: 'M'
                }, {
                    letter: 'T'
                }, {
                    letter: 'W'
                }, {
                    letter: 'T'
                }, {
                    letter: 'F'
                }, {
                    letter: 'S'
                }];

                function setYearAndMonth(date) {
                    $scope.year = date.getFullYear();
                    $scope.month = date.getMonth();

                    var now = new Date();

                    $scope.today = now.getFullYear() === $scope.year && now.getMonth() === $scope.month
                        ? now.getDate()
                        : null;

                    $scope.selectedDay = selectedDate
                            && selectedDate.getFullYear() === $scope.year
                            && selectedDate.getMonth() === $scope.month
                        ? selectedDate.getDate()
                        : null;

                    var firstDayOfMonth = new Date($scope.year, $scope.month, 1),
                        lastDayOfMonth = new Date($scope.year, $scope.month + 1, 0),
                        lastDayOfPreviousMonth = new Date($scope.year, $scope.month, 0),
                        daysInMonth = lastDayOfMonth.getDate(),
                        daysInLastMonth = lastDayOfPreviousMonth.getDate(),
                        dayOfWeek = firstDayOfMonth.getDay(),
                        leadingDays = dayOfWeek || 7; // Ensure there are always leading days to give context

                    $scope.leadingDays = days.slice(- leadingDays - (31 - daysInLastMonth), daysInLastMonth);
                    $scope.days = days.slice(0, daysInMonth);
                    // Ensure a total of 6 rows to maintain height consistency
                    $scope.trailingDays = days.slice(0, 6 * 7 - (leadingDays + daysInMonth));
                }

                // Default to current year and month
                setYearAndMonth(new Date());

                if (ngModel) {
                    ngModel.$render = function () {
                        selectedDate = ngModel.$viewValue
                            ? $scope.parseDate
                                ? $scope.parseDate(ngModel.$viewValue)
                                : new Date(ngModel.$viewValue)
                            : null;

                        if (selectedDate && !isNaN(selectedDate)) {
                            setYearAndMonth(selectedDate);
                        } else {
                            // Bad input, stay on current year and month, but reset selected date
                            $scope.selectedDay = null;
                        }
                    };
                }

                $scope.changeMonthBy = function (amount) {
                    var date = new Date($scope.year, $scope.month + amount, 1);
                    setYearAndMonth(date);
                };

                $scope.pickDay = function (evt) {
                    var target = angular.element(evt.target);

                    if (target.hasClass('-selectable')) {
                        var day = parseInt(target.text(), 10);

                        $scope.selectedDay = day;
                        selectedDate = new Date($scope.year, $scope.month, day);

                        if (ngModel) {
                            ngModel.$setViewValue(
                                $scope.formatDate
                                    ? $scope.formatDate(selectedDate)
                                    : selectedDate.toLocaleDateString()
                            );
                        }

                        $scope.onDateSelected();

                        evt.preventDefault();
                    }
                };
            }
        };
    }]);
}));
