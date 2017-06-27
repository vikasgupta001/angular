/**
 * Created by Vikash Gupta on 14-Jun-17.
 */
app.directive("doList", function () {
    return {
        templateUrl: 'app/directive/template/doList.html',
        scope: {
            doListStatus: '@',
            inputTask: '=',
            editModeStatus: '=',
            showEventFunction: '&',
            modelsListsObject: '=',
            dndMovedNewTaskFunction: '&',
            addTaskFunction: '&',
            editTaskFunction: '&',
            removeTaskFunction: '&',
            saveUpdateFunction: '&',
            editText: '='
        }
    }
});
app.directive("doingList", function () {
    return {
        templateUrl: 'app/directive/template/doingList.html',
        scope: {
            modelsListsObject: '=',
            editModeStatus: '=',
            dndMovedDoingTaskFunction: "&",
            editTaskFunction:'&',
            removeTaskFunction:'&',
            editText:'=',
            saveUpdateFunction:'&',
            doingListStatus:'@'
        }
    }
});
app.directive("doneList", function () {
    return {
        templateUrl: 'app/directive/template/doneList.html',
        scope: {
            modelsListsObject: '=',
            editModeStatus: '=',
            dndMovedDoneTaskFunction: "&",
            editTaskFunction:'&',
            removeTaskFunction:'&',
            editText:'=',
            saveUpdateFunction:'&',
            doneListStatus:'@'
        }
    }

});

