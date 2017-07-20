
var myarr = [1,3,5,'somehting'];

function callhi(func, name){
    func(name);
}

function myForEach(arr,callback){
    for(var i=0; i<arr.length;i++){
        callback(i,arr[i]);
    }
}

myForEach(myarr, function(idx,element){
    console.log(`${idx} element is ${element}`);
});

var p1 = {
    name: 'Robert',
    title: 'Mr. ',
    city: 'Taipei',
    get_name: function(){
        return this.title+this.name;
    }
};

console.log(p1.get_name());