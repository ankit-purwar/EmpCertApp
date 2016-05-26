app.factory('dataService',function(){
   
    var savedData = {}
    
    function setCertiData(data)
    {
        savedData = data;
    }
    function getCertiData(){
        return savedData;
    }
    
    return{
        setCertiData : setCertiData,
        getCertiData : getCertiData
    }
    
});