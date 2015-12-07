//renderEngine.js
console.log("Loading renderEngine.js");
score = 0;
icons = [];
function init()
{
	//Scene size
	var resolutionWidth = 800,
	resolutionHeight = 600;

	//Camera variables - needed?
	cameraAngle = 45,
	cameraAspect = resolutionWidth/resolutionHeight,
	cameraNear = 0.1,
	cameraFar = 10000;

	//Scene stuff
	scene = new THREE.Scene();
	sceneHeight = window.innerHeight-50;
	sceneWidth = window.innerWidth-50;

	renderer = new THREE.WebGLRenderer({antialias:true});
	renderer.domElement.style.position = "absolute";
	renderer.setSize(sceneWidth,sceneHeight);
	document.body.appendChild(renderer.domElement);

	//Camera stuff

	camera = new THREE.PerspectiveCamera(45,sceneWidth/sceneHeight,cameraNear,cameraFar);
	camera.position.set(-100,100,-100);
	scene.add(camera);

	//Resizes
	window.addEventListener('resize',function(){
	// Create an event listener that resizes the renderer with the browser window.
      var WIDTH = window.innerWidth,
          HEIGHT = window.innerHeight;
      renderer.setSize(WIDTH, HEIGHT);
      camera.aspect = WIDTH / HEIGHT;
      camera.updateProjectionMatrix();
    });

	 // Set the background color of the scene.
    renderer.setClearColor(0xF3F3F3, 1);

    // Create a light, set its position, and add it to the scene.
    var light = new THREE.PointLight(0xffffff);
    light.position.set(100,200,-100);
    scene.add(light);

    //Create grid
    numberOfEdges = 10;
    edgeLength = 500;
    offset = edgeLength/numberOfEdges;
    numberOfEdges++;

    for(var i = 0 ; i < numberOfEdges ; i++)
    {
        var geometry = new THREE.Geometry();

        geometry.vertices.push(new THREE.Vector3(0,0,i*offset));
        geometry.vertices.push(new THREE.Vector3(edgeLength,0,i*offset));

        var material = new THREE.LineBasicMaterial({
            color:0xB1D1E6,
            opacity:0.2
        });

        var line = new THREE.Line(geometry, material);

        scene.add(line);

        var geometry = new THREE.Geometry();

        geometry.vertices.push(new THREE.Vector3(i*offset,0,0));
        geometry.vertices.push(new THREE.Vector3(i*offset,0,edgeLength));

        var material = new THREE.LineBasicMaterial({
            color:0xB1D1E6,
            opacity:0.2
        });

        var line = new THREE.Line(geometry, material);

        scene.add(line);
    }



    camera.lookAt( new THREE.Vector3(0,0,0));

	//Game stuff
		//None

	// Renders the scene and updates the render as needed.
	animate();
}
function animate() {

	renderer.render(scene, camera);

    // Read more about requestAnimationFrame at http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
    requestAnimationFrame(function(){
		animate();
	});

    // Render the scene.

}


console.log("Loaded renderEngine.js");
