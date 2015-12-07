//convex mesh class
meshCount = 0;

function mesh(points,center)
{
    //Set mesh identity
    this.ID = meshCount; meshCount++;

    this.points = points;
    this.neighbours = [];
    this.lines = [];
    this.center = center; //TODO: if null set to average mid point
    this.makeTriangles = function()
    {
        console.log("Making trigs with " + this.points.length + " points" );
        this.geometry = new THREE.Geometry();
        for(var i = 0 ; i < this.points.length; i++)
        {
            this.lines.push(
                new THREE.Line3(
                    this.points[i],this.points[(i+1)%this.points.length]
                )
            );
            this.createBoundaryMarker(this.points[i],this.points[(i+1)%this.points.length]);
            this.geometry.vertices.push(this.points[i]);
        }
        if(this.points.length==4)
        {
            this.geometry.faces.push(new THREE.Face3(0,1,2));
            this.geometry.faces.push(new THREE.Face3(0,2,3));
//            this.geometry.faces.push(new THREE.Face3(0,1,2));
//            this.geometry.faces.push(new THREE.Face3(1,2,3));
        }
        else if(this.points.length == 3)
        {
            this.geometry.faces.push(new THREE.Face3(0,1,2));
        }

        this.object = new THREE.Mesh( this.geometry, new THREE.MeshNormalMaterial({
            side: THREE.DoubleSide
        }) );
        scene.add(this.object)
    };

    this.createBoundaryMarker = function(point1,point2)
    {
        var material = new THREE.LineBasicMaterial({
            color: 0x00ff00
        });
        var geometry = new THREE.Geometry();
        var first = point1.clone();
        first.y = 5;
        geometry.vertices.push(first);
        var second = point2.clone();
        second.y = 5;
        geometry.vertices.push(second);

        var boundaryMarker = new THREE.Line(geometry,material);
        //console.log(boundaryMarker);
        //this.lines.push(boundaryMarker);
        //console.log("NEW");
        //console.log(this.lines[this.lines.length-1]);
        scene.add(boundaryMarker);
    };

    this.createCenterMarker = function()
    {
        var material = new THREE.LineBasicMaterial({
            color: 0x0000ff
        });
        var geometry = new THREE.Geometry();
        geometry.vertices.push(this.center.clone());
        var top = this.center.clone();
        top.y = 50;
        geometry.vertices.push(top);

        var line = new THREE.Line(geometry,material);
        scene.add(line);
      };

    this.addNeighbour = function(newNeighbour)
    {
        this.neighbours.push(
            {
                mesh : newNeighbour,
                distance : this.center.distanceTo(newNeighbour.center)
            }
        );
    };

    this.getClosestLineToPoint = function(pointToCheck)
    {
        //TODO: add error checking for if this.lines has less than 1 element

        var closest = this.lines[0].start;
            var minDistance = closest.distanceTo(pointToCheck);
            var minElement = this.lines[0];

        /*    console.log("Default:");
            console.log(closest);
            console.log(minDistance);
            console.log("Starting:");*/
            for(var i = 0 ; i<this.lines.length;i++)
            {
                var line = this.lines[i];
                //console.log(line);
                var closestPoint = line.closestPointToPoint(pointToCheck,true);
                //console.log("New candidate:");
                //console.log(closestPoint);
                var distance=  closestPoint.distanceTo(pointToCheck);
                //console.log(distance);
                //console.log(distance + " vs " + minDistance);
                if(distance < minDistance)
                {
            //        console.log("New closest line:")
            //        console.log(line);
                    //console.log("Lesser!");
                    minDistance = distance;
                    minElement = line;
                    closest = closestPoint;
                }
            }
            closest.liesOn = minElement;
        //    console.log("Closest point found");
        //    console.log(closest);
            return closest;

    };

    this.getNeighbours = function()
    {
            return this.neighbours;
    };
    this.makeTriangles();
    this.createCenterMarker();
    return this;
}

function setNeighbours(mesh1,mesh2)
{
    mesh1.addNeighbour(mesh2);
    mesh2.addNeighbour(mesh1);
}
