function myArrayFilter(arr, callback) {
         var nArray=[];
         var i=0;
         var j=0;
         for(i=0;i<arr.length;i++)
         {
         	if(callback(arr[i], i, nArray) )
         	{
         		nArray[j]=arr[i];
         		j++;
         	}
         }
         return nArray;
}

function myArrayReduce(arr, callback, acc) {
         if(acc != undefined)
         {
         	var i;     
         	for(i=0;i<arr.length;i++)
         	{
         		acc=callback(acc,arr[i], i, arr);
         	}
         	return acc;
         }
         else
         {
         	acc = arr[0];
         	var i;
         	for(i=1;i<arr.length;i++)
         	{
         		acc=callback(acc,arr[i], i, arr);
         	}
         	return acc;
         }
}

function myTreeReduce(inFunc, endFunc) {
    var sum = 0;	
	function new1(tree){
	    if(tree.type == "in")
	    {
            sum = inFunc(tree.value, new1(tree.left), new1(tree.right));
	    }
	    if(tree.type == "end")
	    {  
            sum = endFunc(tree.value);
	    }
	    return sum;
	}
    return new1;
}

function myTreeSize(tree) {
         var size=0;
         var inFunc=function(T,L,R){
              size++;
              return size;
         }
         var endFunc=function(T){
             size++;
             return size;
         }
         size=myTreeReduce(inFunc,endFunc)(tree);
         return size;
}

function myTreeTraversal(type) {
    var array=[];
            if(type=="pre") return preO;
            if(type=="in")  return inO;
            if(type=="post") return posO; 

            function preO(tree){
            array.push(tree.value);
            if(tree.type=="in")
            {
               preO(tree.left);
               preO(tree.right);
            }  
             return array;
           }
        
            function inO(tree){
                if(tree.type=="in")
                {
                    inO(tree.left);
                }
                array.push(tree.value);
                if(tree.type=="in")
                {
                    inO(tree.right);
                }
                return array;
            }
         
            function posO(tree){
                if(tree.type=="in")
                {
                    posO(tree.left);
                    posO(tree.right);
                }
                array.push(tree.value);
                return array;
             }
         
}

function hangman(phrase) {

    const gameOver = "Game over!!!";
    const won = "You\'ve got it!!! Final phrase:";
    const wrong = "Incorrect guess!!!";
    const lost = "You\'ve lost!!! Correct phrase:";
    var alpha="abcdefghijklmnopqrstuvwxyz";
    var chances=3;
    var s = "";
    var sri = s.split('');
    var ind;
    var x = 0;
    var y = 0;
 
    var plen=phrase.length;
    for(let i=0; i<plen;i++)
        sri[i] = "_";

    function sunil(w) {
        x = 0;
        if(y == 1)
            return gameOver;

        var a = alpha.split('');
        var alen=a.length;
        for(let i=0;i<alen;i++)
        {
            if(a[i]=="*") return;
            else if(a[i]==w) a[i]="*";
        }

        ind = phrase.indexOf(w);
            
        if(ind<0)
        {
          chances--;
          if(chances==0)
          {
                y = 1;
                return lost + " " + phrase;
          }
          else if(chances!=0)
          {
            return wrong;
          }
        }
        else if(ind>=0)
        {
            while(ind>=0)
            {
                sri[ind]=w;
                ind=phrase.indexOf(w,ind+1);
            }
        }

        for(let i = 0; i < sri.length; i++)
        {
            if(sri[i] == "_")
            {
                    x = 1;
            }
        }
        if(x == 0)
        {   
            y = 1;
            return won + " " + phrase;
        }
        else
        {
           return sri.join(" ");
        }

      }   
    return sunil;
}

function Person(name, age) {
        this.name=name;
        this.age=age;
        Person.prototype.about=function(){ return "My name is " + this.name + " and I'm " + this.age + " yrs old.";}
}

function Student(name, age, roll) {
         Person.call(this,name,age);
         this.roll=roll;
         Student.prototype.id=function(){ return "Student Id: " + this.roll;}
         Student.prototype.__proto__=Person.prototype;
}

const numberList = {
	numbers: [],
	set add(value) {
		this.numbers.push(value);
	},
	get sum() {
		var sum = 0;
		for(var i = 0; i < this.numbers.length; i++)
		{
			sum += this.numbers[i];
		}
		return sum;
	},
	get average() {
		var avg = 0;
		for(var i = 0; i < this.numbers.length; i++)
		{
			avg += this.numbers[i];
		}
		return avg = avg/this.numbers.length;
	}
};

function carRace(cars, finish) {
        var winner= Promise.race(cars).then(function(winner){
                return finish(winner.name+" won in "+winner.time+" seconds!!!");
                })

}

module.exports = {
    myArrayFilter,
    myArrayReduce,
    myTreeReduce,
    myTreeSize,
    myTreeTraversal,
    hangman,
    Person,
    Student,
    numberList,
    carRace
};
