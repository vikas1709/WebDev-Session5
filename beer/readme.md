
We have data coming from the model. Now put it into the model.

```
<form name="searchBeer">
    <input type="search" placeholder="Search beers" />
    <input type="submit" value="Search">
</form>
```

ng-model - push data into the scope

`<input type="search" placeholder="Search beers" ng-model="beername" />`

{{ beername }}

the data is bound. if we change the data in the model it will change in the view.

###initialize 

$scope.beername = "pilsner"

ng-click

<input type="submit" value="Search" ng-click="search()" />

<input type="submit" value="Search" ng-click="search(beername)" />
