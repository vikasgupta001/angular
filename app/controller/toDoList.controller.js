/**
 * Created by Vikash Gupta on 12-Jun-17.
 */
var app = angular.module("myApp", ['dndLists']);
app.controller("myCtrl", ['$scope', 'toDoListService','$http', function ($scope, toDoListService, $http) {
    $scope.inputTask = "";
    /****Task entered by user in doList*/
    $scope.doListStatus = "";
    /*Variable for status of doList*/
    $scope.doingListStatus = "";
    /*Variable for status of running Task List*/
    $scope.doneListStatus = "";
    /*Variable for status of completed Task List*/
    $scope.models = {
        /* An object of arrays for three task lists*/
        selected: null,
        lists: {
            "newTask": [], "doingTask": [], "doneTask": []
        }
    };
    $scope.error = "";
    $scope.editModeDoList = {"status": false, "index": 0};
    $scope.editModeDoingList = {"status": false, "index": 0};
    $scope.editModeDoneList = {"status": false, "index": 0};
    $scope.editList = [];
    $scope.editText = "";
    $scope.duplicateInNewTask = 0;
    $scope.validateDnD = {"firstArray": [], "secondArray": []};
    /* Checking whether doList have already any previous entry in storage*/
    $scope.taskListFromDB=[];
    $scope.onLoad=function () {
        $http({
            method:'GET',
            url:'http://localhost:5000/api/v1/toDoApp'
        }).then(function (Response) {
            $scope.taskListFromDB=Response.data;
            for(var i=0;i<(Response.data).length;i++)
            {
                if((Response.data)[i].taskStatus=='newTask')
                {
                    $scope.models.lists.newTask.push((Response.data)[i].taskName);
                }
                else if((Response.data)[i].taskStatus=='doingTask')
                {
                    $scope.models.lists.doingTask.push((Response.data)[i].taskName);
                }
                else if((Response.data)[i].taskStatus=='doneTask'){
                    $scope.models.lists.doneTask.push((Response.data)[i].taskName);
                }
            }
        });
    }
    /* *****Event on adding new task to doList******/
    $scope.addToList = function () {
        toDoListService.addInList($scope.models.lists.newTask,$scope.inputTask,"newTask");
        $scope.inputTask = "";
    };
    /*********Edit Task *********/
    $scope.editTask = function (task, $index, List) {
        if (List == $scope.models.lists.newTask) {
            $scope.editModeDoList.status = true;
            $scope.editModeDoList.index = $index;
        }
        else if (List == $scope.models.lists.doingTask) {
            $scope.editModeDoingList.status = true;
            $scope.editModeDoingList.index = $index;
        }
        else {
            $scope.editModeDoneList.status = true;
            $scope.editModeDoneList.index = $index;
        }
        $scope.editText = task;
        $scope.editList = List;
    };
    /********Save task in localStorage*/
    $scope.saveUpdateList = function () {
        if ($scope.editModeDoList.status == true) {
            $scope.editList[$scope.editModeDoList.index] = $scope.editText;
            toDoListService.saveInDB("doList", $scope.editList);
            $scope.editModeDoList.status = false;
            $scope.editModeDoList.index = 0;
        }
        else if ($scope.editModeDoingList.status == true) {
            $scope.editList[$scope.editModeDoingList.index] = $scope.editText;
            toDoListService.saveInDB("doingList", $scope.editList);
            $scope.editModeDoingList.status = false;
            $scope.editModeDoingList.index = 0;
        }
        else {
            $scope.editList[$scope.editModeDoneList.index] = $scope.editText;
            toDoListService.saveInDB("doneList", $scope.editList);
            $scope.editModeDoneList.status = false;
            $scope.editModeDoneList.index = 0;
        }
    };
    /*Clear task function*/
    $scope.removeTask = function ($index, List) {
        if (List == $scope.models.lists.newTask) {
            toDoListService.removeFromList(List, $index, "newTask",$scope.taskListFromDB);
        }
        else if (List == $scope.models.lists.doingTask) {
            toDoListService.removeFromList(List, $index, "doingTask",$scope.taskListFromDB);
        }
        else {
            toDoListService.removeFromList(List, $index, "doneTask",$scope.taskListFromDB);
        }
    };
    /* Checking status of doList*/
    $scope.$watch("models.lists.newTask.length", function (newValue, oldValue) {
        if (newValue == 0) {
            $scope.doListStatus = "No Task Added";
        }
        else {
            $scope.doListStatus = "";
        }
    }, true);
    /* Checking status of doingList*/
    $scope.$watch("models.lists.doingTask.length", function (newValue, oldValue) {
        if (newValue == 0) {
            $scope.doingListStatus = "No Task Running";
        }
        else {
            $scope.doingListStatus = "";
        }
    }, true);
    /* Checking status of doneList*/
    $scope.$watch("models.lists.doneTask.length", function (newValue, oldValue) {
        if (newValue == 0) {
            $scope.doneListStatus = "No Task Completed";
        }
        else {
            $scope.doneListStatus = "";
        }
    }, true);
    /******************Drag N Drop Move event between list**************************/
    $scope.dndMovedNewTaskEvent = function ($index) {
        toDoListService.dndMoveEvent($scope.models.lists.newTask, $index, "doList");
    };
    $scope.dndMovedDoingTaskEvent = function ($index) {
        toDoListService.dndMoveEvent($scope.models.lists.doingTask, $index, "doingList");
    };
    $scope.dndMovedDoneTaskEvent = function ($index) {
        toDoListService.dndMoveEvent($scope.models.lists.doneTask, $index, "doneList");
    };
    $scope.hideEditPanel = function () {
        $scope.editModeDoList.status = false;
        $scope.editModeDoList.index = 0;
        $scope.editModeDoingList.status = false;
        $scope.editModeDoingList.index = 0;
        $scope.editModeDoneList.status = false;
        $scope.editModeDoneList.index = 0;
    };
    /*    $scope.DragStartNewTask=function (array) {
     $scope.validateDnD.firstArray=array;
     console.log($scope.validateDnD.firstArray);
     };
     $scope.DragEndNewTask=function (array) {

     $scope.validateDnD.secondArray=array;
     console.log($scope.validateDnD.secondArray);
     };*/
    $scope.showEvent = function (List) {
        if ($scope.editModeDoList.status == true && List == $scope.models.lists.newTask) {
            return false;
        }
        if ($scope.editModeDoingList.status == true && List == $scope.models.lists.doingTask) {
            return false;
        }
        if ($scope.editModeDoneList.status == true && List == $scope.models.lists.doneTask) {
            return false;
        }
        return true;
    };

    $scope.showOverlayEvent = function () {
        if ($scope.editModeDoList.status == true || $scope.editModeDoingList.status == true || $scope.editModeDoneList.status == true) {
            return true;
        }
        return false;
    };
}]);

