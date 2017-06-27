/**
 * Created by Vikash Gupta on 12-Jun-17.
 */
app.service("toDoListService", function ($http) {

    this.saveInDB = function (taskName, taskStatus) {
        var tempObj = {
            "taskName": taskName,
            "taskStatus": taskStatus
        };
        $http({
            method: "POST",
            url: "http://localhost:5000/api/v1/toDoApp",
            data: tempObj
        }).then(function (result) {
            console.log("SUCCESS", +result);
        })
    };
    this.removeFromDB = function (id) {
        $http({
            method: "delete",
            url: "http://localhost:5000/api/v1/toDoApp/" + id,
            data: id
        }).then(function (response) {
        })
    };
    this.updateInDB=function(id,dataObject){
        $http({
            method:"put",
            url:"http://localhost:5000/api/v1/toDoApp/"+id,
            data:dataObject
        }).then(function (success) {
            
        })
    }
    this.addInList = function (array, taskName, taskStatus) {
        array.push(taskName);
        this.saveInDB(taskName, taskStatus);
    };
    this.updateInList = function () {

    };

    this.removeFromList = function (listName, $index, taskStatus, taskList) {
        listName.splice($index, 1);
        var counter = 0;
        for (var i = 0; taskList.length; i++) {
            if (taskList[i].taskStatus == taskStatus) {
                console.log(taskList[i].taskStatus);
                if (counter == $index) {
                    var id = taskList[i]._id;
                    this.removeFromDB(id);
                    break;
                }
                else {
                    counter++;
                }
            }
        }
    };
    this.dndMoveEvent = function (array, $index, listNameInLocalStorage) {
        var newData = [];
        array.splice($index, 1);
        angular.forEach(array, function (val, index) {
            val.Order = index + 1;
            newData.push(val);
        })
        console.log(newData);

        //this.saveInDB(listNameInLocalStorage,newData);
    };


});