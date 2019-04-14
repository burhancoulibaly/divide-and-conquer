const numPoints = 20;
let midPoint;
let pointsArr = new Array();
let closestPair = null;

function preload(){
    //creating points
    for(var i = 0;i < numPoints;i++){
        //random x and y
        let x = Math.floor(Math.random()*(innerWidth+1));
        let y = Math.floor(Math.random()*(innerHeight));

        //pushing point to points array
        pointsArr.push(new Point(x,y));
    }
    
    //sorting points on x axis
    pointsArr.sort(compareX);
    console.log(pointsArr);

    //creating midpoint for line to be drawn
    midPoint = pointsArr[(pointsArr.length/2)];

    //getting the closest pair amoungst the points array
    closestPair = closestUtil(pointsArr,pointsArr.length);

    console.log("\n",closestPair[0]);
    console.log(closestPair[1]);
}

function setup(){
    createCanvas(window.innerWidth,window.innerHeight);
    background(51);
}

function draw(){
    //drawing points
    pointsArr.forEach(point => {
        this.stroke(255);
        this.point(point.x,point.y);
    });
    
    line(midPoint.x,0,midPoint.x,window.innerHeight);

    stroke(244,122,158);
    noFill();
  
    let pointOne = circle(closestPair[1][0].x,closestPair[1][0].y,closestPair[0]);
    let pointTwo = circle(closestPair[1][1].x,closestPair[1][1].y,closestPair[0])

    noLoop();
}

//Makes comparisons along the x axis
function compareX(a,b){
    const x1 = a.x;
    const x2 = b.x;

    let comparison = 0;

    if(x1 > x2){
        comparison = 1;
    }else if(x1 < x2){
        comparison = -1;
    }

    return comparison;
}

//Make comparisons along the y axis
function compareY(a,b){
    const y1 = a.y;
    const y2 = b.y;

    let comparison = 0;

    if(y1 > y2){
        comparison = 1;
    }else if(y1 < y2){
        comparison = -1;
    }

    return comparison;
}

//calculates and returns the distance between two given points
function distance(p1,p2){
     console.log(p1);
     console.log(p2);
    console.log("returning distance")    
    return Math.sqrt(Math.pow(p1.x-p2.x,2)+Math.pow(p1.y-p2.y,2));
}

//check which value is lower and returns it
function minimum(x,y){
    return (x<y)?x:y;
}

//calculating the distance between points in the points array, using the distance formula.
function bruteForce(points, length){
    let minimum = null;
    console.log(length);

    for(var i = 0; i < length; i++){
        console.log(i)
        // console.log("p1",points[i]);
        for(var j = i+1; j < length; j++){
            console.log(j)
            if(minimum == null){
                // console.log("p2",points[j]);
                minimum = distance(points[i],points[j]);
                minPoints = [points[i],points[j]]
            }else if(distance(points[i],points[j]) < minimum){
                // console.log("p2",points[j]);
                console.log("new minimum");
                minimum = distance(points[i],points[j]);
                console.log(minimum);
            }
        }
    }
    console.log("final min: ",minimum);
    return [minimum,minPoints];
}

//Checks if there are points that cross the midline that a closer than the best distance
function stripClosest(strip,size,bestD){
    let min = bestD;

    //sorting the array by the y axis
    strip.sort(compareY);

    //takes all points in the strip array and makes comparisons till there is a pair thats closer than the
    //closest distance(bestD)
    for(var i = 0; i < size; i++){
        for(var j = i+1; j < size && (strip[j].y - strip[i].y) < min; ++j){
            if(distance(strip[i],strip[j]) < min){
                min = distance(strip[i],strip[j]);
                minPoints = [strip[i],strip[j]];
            }
        }
    }

    return [min,minPoints];
}

//This function gets recursivly called, creating a tree, splitting the array till
//the array has less then 3 points and then back propogates the best distance at each node 
//for comparisons 
function closestUtil(points, length){
    console.log(points);

    //when points in the array points is less then 3 brute force distance calculations are made
    if(length <= 3){
        console.log("less than or equal to 3");
        return bruteForce(points,points.length);
    }

    //getting mid point of array for creating tree
    mid = Math.round(length/2);
    middlePoint = points[mid];

    console.log("mid",mid);
    console.log("dL",points.slice(0,mid));
    console.log("dR",points.slice(mid,length));

    //creating two new arrays split at the midpoints of the points array
    let dlArr = points.slice(0,mid);
    let dRArr = points.slice(mid,length)

    //getting the closest pair amoungst the left and right child of the current node 
    let dL = closestUtil(dlArr,dlArr.length);
    let dR = closestUtil(dRArr,dRArr.length);

    console.log("dLMin",dL);
    console.log("dRMin",dR);

    //the pair of points with the closest distance
    let bestD = minimum(dL[0],dR[0]);

    strip = new Array(length);
    let j = 0;

    //getting all points that are closer to the midpoint line then the distance of the best distance
    for(var i = 0;i < length;i++){
        if(Math.abs(points[i].x - middlePoint.x) < bestD){
            strip[j] = points[i],
            j++;
        }
    }

    //returns closest point passing in the best distance, and the strip array, and the size of it.
    return minimum(bestD, stripClosest(strip,j,bestD));
}