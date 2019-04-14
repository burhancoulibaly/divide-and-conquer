const numPoints = 10;
let midPoint;
let pointsArr = new Array();
let dL = null;
let dR = null;
let bestD = null;

function preload(){
    //creating points
    for(var i = 0;i < numPoints;i++){
        //random x and y
        let x = Math.floor(Math.random()*(innerWidth+1));
        let y = Math.floor(Math.random()*(innerHeight));

        //pushing point to points array
        pointsArr.push(new Point(x,y));
    }
    
    pointsArr.sort(compare);
    console.log(pointsArr);

    midPoint = pointsArr[(pointsArr.length/2)]

    closestUtil(pointsArr,pointsArr.length)
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

    noLoop();
}

function compare(a,b){
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

function distance(p1,p2){
     console.log(p1);
     console.log(p2);
    console.log("returning distance")    
    return Math.sqrt(Math.pow(p1.x-p2.x,2)+Math.pow(p1.y-p2.y,2));
}

function minimum(x,y){
    return (x<y)?x:y;
}

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
            }else if(distance(points[i],points[j]) < minimum){
                // console.log("p2",points[j]);
                console.log("new minimum");
                minimum = distance(points[i],points[j]);
                console.log(minimum);
            }
        }
    }
    console.log("final min: ",minimum);
    return minimum;
}

function closestUtil(points, length){
    console.log(points);
    if(length <= 3){
        console.log("less than or equal to 3");
        return bruteForce(points,points.length);
    }

    mid = Math.round(length/2);
    middlePoint = points[mid];
    console.log("mid",mid);
    console.log("dL",points.slice(0,mid));
    console.log("dR",points.slice(mid,length));
    let dlArr = points.slice(0,mid);
    let dRArr = points.slice(mid,length)
    dL = closestUtil(dlArr,dlArr.length);
    dR = closestUtil(dRArr,dRArr.length);
    
    console.log("dLMin",dL);
    console.log("dRMin",dR);
    bestD = minimum(dL,dR);
    console.log(bestD);
}