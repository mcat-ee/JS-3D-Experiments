function findPath(start,goal,nodeSet)
{
    //Uses A* search algorithm

    var closedSet = [];
    var openSet = [start];

    var gScoreTable = {};
    var fScoreTable = {};

    var cameFrom = {};

    //var gScore = {};    //'map with default value of infinity'
    //gScore[start] = 0;  //Cost from start to start
    //fScore = {};        //Same deal as gScore comment
    //fScore[start] = start.gScore + heuristic(start,goal);
    setScore(gScoreTable,start,0);
    setScore(fScoreTable,start,gScoreTable[start.ID]+heuristic(start,goal));
    while(openSet.length != 0)
    {
        var current = getLowestFscore(openSet,fScoreTable);
        //console.log("Current:" + current);

        //console.log(current.ID +"==" + goal.ID + "?");
        if(current.ID==goal.ID)
        {
        //    console.log("Goal reached!");
            return reconstruct_path(cameFrom,goal);

        }

        openSet.splice(openSet.indexOf(current),1);
        closedSet.push(current);

        var currentNeighbours = current.getNeighbours();
        for(var neighbourIter = 0; neighbourIter < currentNeighbours.length ; neighbourIter++)
        {
            var neighbour = currentNeighbours[neighbourIter].mesh;

            if(closedSet.indexOf(neighbour)!= -1)   //If found in closedSet
            {   //Already evaluated
                continue;
            }

            var tentative_gScore = getScore(gScoreTable,current) + heuristic(current,neighbour);

            if(openSet.indexOf(neighbour)==-1)
            {   //If neighbour is in openSet
            //    console.log("Already in openSet")
                openSet.push(neighbour);
            }
            else if(tentative_gScore >= getScore(gScoreTable,neighbour))
            {   //If higher, drop possible route
            //    console.log("Already better route");
                continue;
            }

            //console.log("New best route found");
            cameFrom[neighbour.ID] = current.ID;
            setScore(gScoreTable,neighbour,tentative_gScore);
            setScore(
                fScoreTable,
                neighbour,
                getScore[neighbour.ID] + heuristic(neighbour,goal)
            );
        }
    }
    console.log("No path exists!");
    return undefined;
}
function distanceBetweenMeshes(mesh1,mesh2)
{
    //Distance from center point to center point
    return mesh1.center.distanceTo(mesh2.center);
}
function getScore(scoreTable,node)
{
    var result = scoreTable[node.ID];
    if(result==undefined)
    {
        //console.log("Score for " + node.ID + " not found in table");
        scoreTable[node.ID] = Number.MAX_VALUE;
    }
    return result;
}

function getFScore(scoreTable,node)
{
    var result = scoreTable[node.ID];
    if(result==undefined)
    {
    //    console.log("Score for " + node.ID + " not found in table");
        scoreTable[node.ID] = Number.MIN_VALUE;
    }
    return result;
}

function setScore(ScoreTable,node,newScore)
{
    //Need to rename this, works on gScore and fSCore
    ScoreTable[node.ID] = newScore;
}
function getLowestFscore(openSet,fScoreTable)
{
    //console.log("Objects in open set:" + openSet.length);
    var lowestElement = null
    var lowestValue = Number.MAX_VALUE;
    for(var i = 0 ; i < openSet.length ; i++)
    {
        //console.log("\t"+openSet[i].ID);
        var element = openSet[i];
        getFScore(fScoreTable,element.ID);
//        console.log("\t"+ + " vs " + lowestValue);
        if(getFScore(fScoreTable,element.ID)<=lowestValue)
        {
        //    console.log("New lowest: " + element.ID);
            lowestValue = fScoreTable[element.ID];
            lowestElement = element;
        }
    }
    return lowestElement;
}
function heuristic(start,goal)
{
    //console.log(start.ID + "->" + goal.ID);
    return start.center.distanceTo(goal.center);
}

function reconstruct_path(cameFrom,goal)
{
//    console.log(cameFrom);
    var current = cameFrom[goal.ID];
//    console.log(goal.ID);
//    console.log(nodes[goal.ID].center);
//    console.log(nodes);
    var path = [];
    path.push(nodes[goal.ID]);
    while(current!=undefined)
    {
        //console.log(nodes[current].center);
        path.splice(0,0,nodes[current]);
        current = cameFrom[current];
    }
    console.log(path);
    return path;
}
