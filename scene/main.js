
var camera, scene, renderer, mesh, mouse, controls,
	width = window.innerWidth,
	height = window.innerHeight;

var clock = new THREE.Clock();
var mouse = new THREE.Vector2();

init();
animate();

function init() {

	scene = new THREE.Scene();

	renderer = new THREE.WebGLRenderer( { antialias: true, preserveDrawingBuffer: true, alpha: true } );
	renderer.setSize( width, height );
	renderer.shadowMapEnabled = true;
	renderer.shadowMapType = THREE.PCFSoftShadowMap;
	renderer.setViewport( 0,0,width, height );
	renderer.getMaxAnisotropy();

	var container = document.getElementById('container');
	container.appendChild(renderer.domElement);

	camera = new THREE.PerspectiveCamera( 50, (width/height), 0.1, 10000000 );
	camera.position.set( 1500, 1500, 1500 );

	mouse = new THREE.Vector2();

	controls = new THREE.OrbitControls( camera, renderer.domElement );
	controls.enableDamping = true;
	controls.dampingFactor = 0.25;
	controls.enableZoom = true;
	controls.target.set( 0,0,0 );

	buildShape();

	var directionalLight = new THREE.SpotLight(0xeeeeee, 1.5);
		directionalLight.position.set(2000, 3500,2500);
		//directionalLight.target.position.set( 0, 0, 0 );
		//directionalLight.shadowCameraVisible = true;
		directionalLight.castShadow = true;
		directionalLight.shadowCameraFar = 10000;
		directionalLight.shadowDarkness = 0.5;
		directionalLight.shadowMapWidth = 2048;
		directionalLight.shadowMapHeight = 2048;
		directionalLight.name = 'luzDireccional'

	scene.add( directionalLight );
	//
	window.addEventListener( 'resize', onWindowResize, false );

}


function buildShape(){
	// COPIA AQUI EL CODIGO DEL OBJETO PARA RENDERIZARLO EN ESCENA



	var SKYmaterial  = new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture('images/moon.jpg'),color: 0xFFFFFF, side: THREE.DoubleSide  } );

	var SKYradius = 50000; //dimensiones del cielo
	var SKYwidthSegments = 32;
	var SKYheigthSegments = 32;
	var SKYangleStart = 0;
	var SKYangleLenght = 6.3;

	var SKYgeometry = new THREE.SphereGeometry( SKYradius, SKYwidthSegments, SKYheigthSegments, SKYangleStart, SKYangleLenght );
	var sky = new THREE.Mesh( SKYgeometry, SKYmaterial );
		sky.position.set(0,0,0);
		sky.rotation.set(0,0,0);
		sky.scale.set(1,1,1);
	scene.add( sky );

	//-------------------------------------------------
	//--------------OJOS IZQ---------------------------

	var CYLINDERmaterialOjos = new THREE.MeshPhongMaterial( {color: 0x984717, emissive: 0x000033, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );

	var CYLINDERradiusTopOjos = 150; //radio de la parte superios del cilindro
	var CYLINDERradiusBottomOjos = 150;	//radio de la parte inferior del cilindro
	var CYLINDERheigthOjos = 100;	//altura del cilindro
	var CYLINDERradioSegmentsOjos = 32; //segmentos utilizados para dibujar el cilindro(cuantos mas segmentos mas redondo)
	var CYLINDERheigthSegmentsOjos = 1;	//segmentos necesarios para dibutar la altura del cilindro
	var CYLINDERopenEndedOjos = false;	//en off el cilindro en hueco
	var circleStartCylinderOjos = 0; //grado desde el que empieza a dibujar la pared del cilindro
	var circleCylinderOjos = 6.3; //grados que abarca el cilindro (360, solo 180...)

	var CYLINDERgeometryOjos = new THREE.CylinderGeometry( CYLINDERradiusTopOjos, CYLINDERradiusBottomOjos, CYLINDERheigthOjos, CYLINDERradioSegmentsOjos, CYLINDERheigthSegmentsOjos, CYLINDERopenEndedOjos, circleStartCylinderOjos, circleCylinderOjos );
	var cylinderOjos = new THREE.Mesh( CYLINDERgeometryOjos, CYLINDERmaterialOjos );
		cylinderOjos.castShadow = true;	//emitir sombras
		cylinderOjos.receiveShadow = true;	//recibir sombras
		cylinderOjos.position.set(0,0,0);	//position del objeto(x,y,z)
		cylinderOjos.rotation.set(0,0,0);	//rotacion del objeto(x,y,z)
		cylinderOjos.scale.set(1,1,1);		//escala del objeto(x,y,z)
	scene.add( cylinderOjos );



//-----------------------------------------------
//-------------OJO IZQ NEGRO----------------------------

var CIRCLEmaterial = new THREE.MeshPhongMaterial( {color: 0x000000, emissive: 0x000033, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );

var circleradius = 120; //radio del circulo
var circlesegments = 1024;	//numero de segmentos que forman el circulo
var circleStartAngle = 0;	//angulo desde el que comienza a dibujarse el circulo
var circleAngle = 360; // angulo del circulo(360, solo 180..)

var circleGeometry = new THREE.CircleGeometry( circleradius, circlesegments, circleStartAngle, circleAngle );
var circle = new THREE.Mesh( circleGeometry, CIRCLEmaterial );
	circle.castShadow = true; //emitir sombras
	circle.receiveShadow = true;	//recibir sombras
	circle.position.set(0,50,0);	//posicion del objeto(x,y,z)
	circle.rotation.set(Math.PI/2,0,0);	//rotacion del objeto(x,y,z)
	circle.scale.set(1,1,1);	//escala del objeto(x,y,z)
scene.add( circle );

//-----------------------------------------------
//-------------OJO IZQ naRANJA----------------------------

var CIRCLEmaterial = new THREE.MeshPhongMaterial( {color: 0xdddd59, emissive: 0x000033, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );

var circleradius = 80; //radio del circulo
var circlesegments = 1024;	//numero de segmentos que forman el circulo
var circleStartAngle = 0;	//angulo desde el que comienza a dibujarse el circulo
var circleAngle = 360; // angulo del circulo(360, solo 180..)

var circleGeometry = new THREE.CircleGeometry( circleradius, circlesegments, circleStartAngle, circleAngle );
var circle = new THREE.Mesh( circleGeometry, CIRCLEmaterial );
	circle.castShadow = true; //emitir sombras
	circle.receiveShadow = true;	//recibir sombras
	circle.position.set(0,50,0);	//posicion del objeto(x,y,z)
	circle.rotation.set(Math.PI/2,0,0);	//rotacion del objeto(x,y,z)
	circle.scale.set(1,1,1);	//escala del objeto(x,y,z)
scene.add( circle );

//-----------------------------------------------
//-------------OJO IZQ naRANJA-negro----------------------------

var CIRCLEmaterial = new THREE.MeshPhongMaterial( {color: 0x000000, emissive: 0x000033, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );

var circleradius = 10; //radio del circulo
var circlesegments = 1024;	//numero de segmentos que forman el circulo
var circleStartAngle = 0;	//angulo desde el que comienza a dibujarse el circulo
var circleAngle = 360; // angulo del circulo(360, solo 180..)

var circleGeometry = new THREE.CircleGeometry( circleradius, circlesegments, circleStartAngle, circleAngle );
var circle = new THREE.Mesh( circleGeometry, CIRCLEmaterial );
	circle.castShadow = true; //emitir sombras
	circle.receiveShadow = true;	//recibir sombras
	circle.position.set(0,50,0);	//posicion del objeto(x,y,z)
	circle.rotation.set(Math.PI/2,0,0);	//rotacion del objeto(x,y,z)
	circle.scale.set(1,1,1);	//escala del objeto(x,y,z)
scene.add( circle );

//-----------------------------------------------
//-------------OJO der NEGRO----------------------------


	var CYLINDERmaterialOjos = new THREE.MeshPhongMaterial( {color: 0x984717, emissive: 0x000033, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );

	var CYLINDERradiusTopOjos = 150; //radio de la parte superios del cilindro
	var CYLINDERradiusBottomOjos = 150;	//radio de la parte inferior del cilindro
	var CYLINDERheigthOjos = 100;	//altura del cilindro
	var CYLINDERradioSegmentsOjos = 32; //segmentos utilizados para dibujar el cilindro(cuantos mas segmentos mas redondo)
	var CYLINDERheigthSegmentsOjos = 1;	//segmentos necesarios para dibutar la altura del cilindro
	var CYLINDERopenEndedOjos = false;	//en off el cilindro en hueco
	var circleStartCylinderOjos = 0; //grado desde el que empieza a dibujar la pared del cilindro
	var circleCylinderOjos = 6.3; //grados que abarca el cilindro (360, solo 180...)

	var CYLINDERgeometryOjos = new THREE.CylinderGeometry( CYLINDERradiusTopOjos, CYLINDERradiusBottomOjos, CYLINDERheigthOjos, CYLINDERradioSegmentsOjos, CYLINDERheigthSegmentsOjos, CYLINDERopenEndedOjos, circleStartCylinderOjos, circleCylinderOjos );
	var cylinderOjos = new THREE.Mesh( CYLINDERgeometryOjos, CYLINDERmaterialOjos );
		cylinderOjos.castShadow = true;	//emitir sombras
		cylinderOjos.receiveShadow = true;	//recibir sombras
		cylinderOjos.position.set(450,0,0);	//position del objeto(x,y,z)
		cylinderOjos.rotation.set(0,0,0);	//rotacion del objeto(x,y,z)
		cylinderOjos.scale.set(1,1,1);		//escala del objeto(x,y,z)
	scene.add( cylinderOjos );


var CIRCLEmaterial = new THREE.MeshPhongMaterial( {color: 0x000000, emissive: 0x000033, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );

var circleradius = 120; //radio del circulo
var circlesegments = 1024;	//numero de segmentos que forman el circulo
var circleStartAngle = 0;	//angulo desde el que comienza a dibujarse el circulo
var circleAngle = 360; // angulo del circulo(360, solo 180..)

var circleGeometry = new THREE.CircleGeometry( circleradius, circlesegments, circleStartAngle, circleAngle );
var circle = new THREE.Mesh( circleGeometry, CIRCLEmaterial );
	circle.castShadow = true; //emitir sombras
	circle.receiveShadow = true;	//recibir sombras
	circle.position.set(450,50,0);	//posicion del objeto(x,y,z)
	circle.rotation.set(Math.PI/2,0,0);	//rotacion del objeto(x,y,z)
	circle.scale.set(1,1,1);	//escala del objeto(x,y,z)
scene.add( circle );

//-----------------------------------------------
//-------------OJO der naRANJA----------------------------

var CIRCLEmaterial = new THREE.MeshPhongMaterial( {color: 0xdddd59, emissive: 0x000033, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );

var circleradius = 80; //radio del circulo
var circlesegments = 1024;	//numero de segmentos que forman el circulo
var circleStartAngle = 0;	//angulo desde el que comienza a dibujarse el circulo
var circleAngle = 360; // angulo del circulo(360, solo 180..)

var circleGeometry = new THREE.CircleGeometry( circleradius, circlesegments, circleStartAngle, circleAngle );
var circle = new THREE.Mesh( circleGeometry, CIRCLEmaterial );
	circle.castShadow = true; //emitir sombras
	circle.receiveShadow = true;	//recibir sombras
	circle.position.set(450,50,0);	//posicion del objeto(x,y,z)
	circle.rotation.set(Math.PI/2,0,0);	//rotacion del objeto(x,y,z)
	circle.scale.set(1,1,1);	//escala del objeto(x,y,z)
scene.add( circle );

//-----------------------------------------------
//-------------OJO der naRANJA-negro----------------------------

var CIRCLEmaterial = new THREE.MeshPhongMaterial( {color: 0x000000, emissive: 0x000033, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );

var circleradius = 10; //radio del circulo
var circlesegments = 1024;	//numero de segmentos que forman el circulo
var circleStartAngle = 0;	//angulo desde el que comienza a dibujarse el circulo
var circleAngle = 360; // angulo del circulo(360, solo 180..)

var circleGeometry = new THREE.CircleGeometry( circleradius, circlesegments, circleStartAngle, circleAngle );
var circle = new THREE.Mesh( circleGeometry, CIRCLEmaterial );
	circle.castShadow = true; //emitir sombras
	circle.receiveShadow = true;	//recibir sombras
	circle.position.set(450,50,0);	//posicion del objeto(x,y,z)
	circle.rotation.set(Math.PI/2,0,0);	//rotacion del objeto(x,y,z)
	circle.scale.set(1,1,1);	//escala del objeto(x,y,z)
scene.add( circle );


//-----------------------------------------------
// ----------------nariz-frente-------------------------

var CUBEmaterial = new THREE.MeshPhongMaterial( {color: 0x984717, emissive: 0x000033, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );

var xAxis = 230;//dimensiones x
var yAxis = 100;//dimensiones y
var zAxis = 400;//dimensiones z

var cubegeometry = new THREE.BoxGeometry( xAxis, yAxis, zAxis );
var cube = new THREE.Mesh( cubegeometry, CUBEmaterial );
	cube.castShadow = true; //emitir sombras
	cube.receiveShadow = true; //recibir sombras
	cube.position.set(225,0,150); //position del objeto(x,y,z)
	cube.rotation.set(0,0,0); //rotacion del objeto(x,y,z)
	cube.scale.set(1,1,1); //escala del objeto(x,y,z)
scene.add( cube );

//-----------------------------------------------
// ----------------nariz-frente-.negro-------------------------

var planexAxis = 250;//dimensiones x
var planeyAxis = 80;//dimensiones y
var planezAxis = 50;//dimensiones z

var PLANEmaterial = new THREE.MeshPhongMaterial( {color: 0x000000, emissive: 0x000033, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );

var PLANEgeometry = new THREE.PlaneGeometry( planexAxis, planeyAxis, planezAxis );
var plane = new THREE.Mesh( PLANEgeometry, PLANEmaterial );
	plane.castShadow = true;	//emitir sombras
	plane.receiveShadow = true;	//recibir sombras
	plane.position.set(225,50,15);	//position del objeto(x,y,z)
	plane.rotation.set(Math.PI/2,0,0);	//rotacion del objeto(x,y,z)
	plane.scale.set(1,1,1);		//escala del objeto(x,y,z)
scene.add( plane );

//-------------------------------------------------
// dientes
//--------------CYLINDER---------------------------

var CYLINDERmaterial = new THREE.MeshPhongMaterial( {color: 0xa7a945, emissive: 0x000033, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );

var CYLINDERradiusTop = 100; //radio de la parte superios del cilindro
var CYLINDERradiusBottom = 100;	//radio de la parte inferior del cilindro
var CYLINDERheigth = 100;	//altura del cilindro
var CYLINDERradioSegments = 32; //segmentos utilizados para dibujar el cilindro(cuantos mas segmentos mas redondo)
var CYLINDERheigthSegments = 1;	//segmentos necesarios para dibutar la altura del cilindro
var CYLINDERopenEnded = false;	//en off el cilindro en hueco
var circleStartCylinder = 0; //grado desde el que empieza a dibujar la pared del cilindro
var circleCylinder = Math.PI; //grados que abarca el cilindro (360, solo 180...)

var CYLINDERgeometry = new THREE.CylinderGeometry( CYLINDERradiusTop, CYLINDERradiusBottom, CYLINDERheigth, CYLINDERradioSegments, CYLINDERheigthSegments, CYLINDERopenEnded, circleStartCylinder, circleCylinder );
var cylinder = new THREE.Mesh( CYLINDERgeometry, CYLINDERmaterial );
	cylinder.castShadow = true;	//emitir sombras
	cylinder.receiveShadow = true;	//recibir sombras
	cylinder.position.set(225,-50,400);	//position del objeto(x,y,z)
	cylinder.rotation.set(Math.PI/2,Math.PI/2,0);	//rotacion del objeto(x,y,z)
	cylinder.scale.set(1,1,1);		//escala del objeto(x,y,z)
scene.add( cylinder );


//-----------------------------------------------
//----------curve lines cientes horizontal--------------------------------

var numPoints = 200;

var spline = new THREE.SplineCurve3([
			   new THREE.Vector3(125,-10,400), //punto de inicio de la curva
				 new THREE.Vector3(175,40,400 ), //punto medio a de la curva
			   new THREE.Vector3(225,50,400 ), //punto medio de la curva
				 new THREE.Vector3(275,40,400 ), //punto medio b de la curva
			   new THREE.Vector3(325,-10,400) //punto final de la curva
		]);

var geometryspline = new THREE.Geometry();

var materialspline = new THREE.LineBasicMaterial({
	    color: 0x000000,
	    transparent:false,
		opacity: 1,
        linewidth: 3, //ancho de la linea
		sizeAttenuation: false,
		visible: true
	});

var splinePoints = spline.getPoints(numPoints);

for(var o = 0; o < splinePoints.length; o++){
	    geometryspline.vertices.push(splinePoints[o]);
	}

var linespline = new THREE.Line(geometryspline, materialspline);

scene.add(linespline)

//------------------------------------------------
//----------lineas dinentes verticales----------------------------------

var lineMaterial = new THREE.LineBasicMaterial({
			color: 0x000000,
		    transparent:false,
			opacity: 1,
		    linewidth: 2, //ancho de la linea
			sizeAttenuation: false,
			visible: true
		});

var lineGeometry = new THREE.Geometry();
	lineGeometry.vertices.push(
		new THREE.Vector3( 225,50,350 ), //punto inicial de la linea
		new THREE.Vector3( 225,50,450 ) //punto final de la linea
	);

var line = new THREE.Line( lineGeometry, lineMaterial );
scene.add( line );

//---------

var lineGeometry = new THREE.Geometry();
	lineGeometry.vertices.push(
		new THREE.Vector3( 175,40,350 ), //punto inicial de la linea
		new THREE.Vector3( 175,40,450 ) //punto final de la linea
	);

var line = new THREE.Line( lineGeometry, lineMaterial );
scene.add( line );

//---------

var lineGeometry = new THREE.Geometry();
	lineGeometry.vertices.push(
		new THREE.Vector3( 275,40,350 ), //punto inicial de la linea
		new THREE.Vector3( 275,40,450 ) //punto final de la linea
	);

var line = new THREE.Line( lineGeometry, lineMaterial );
scene.add( line );

//-----------------------------------------------
// ----------------parte trasera de la boca-------------------------
var CUBEmaterial = new THREE.MeshPhongMaterial( {color: 0x984717, emissive: 0x000033, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );

var xAxis = 230;//dimensiones x
var yAxis = 50;//dimensiones y
var zAxis = 100;//dimensiones z

var cubegeometry = new THREE.BoxGeometry( xAxis, yAxis, zAxis );
var cube = new THREE.Mesh( cubegeometry, CUBEmaterial );
	cube.castShadow = true; //emitir sombras
	cube.receiveShadow = true; //recibir sombras
	cube.position.set(225,-25,400); //position del objeto(x,y,z)
	cube.rotation.set(0,0,0); //rotacion del objeto(x,y,z)
	cube.scale.set(1,1,1); //escala del objeto(x,y,z)
scene.add( cube );


//-------------------------------------------------
// mandibula
//--------------CYLINDER---------------------------

var CYLINDERmaterial = new THREE.MeshPhongMaterial( {color: 0x984717, emissive: 0x000033, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );

var CYLINDERradiusTop = 50; //radio de la parte superios del cilindro
var CYLINDERradiusBottom = 50;	//radio de la parte inferior del cilindro
var CYLINDERheigth = 230;	//altura del cilindro
var CYLINDERradioSegments = 32; //segmentos utilizados para dibujar el cilindro(cuantos mas segmentos mas redondo)
var CYLINDERheigthSegments = 1;	//segmentos necesarios para dibutar la altura del cilindro
var CYLINDERopenEnded = false;	//en off el cilindro en hueco
var circleStartCylinder = 0; //grado desde el que empieza a dibujar la pared del cilindro
var circleCylinder = Math.PI; //grados que abarca el cilindro (360, solo 180...)

var CYLINDERgeometry = new THREE.CylinderGeometry( CYLINDERradiusTop, CYLINDERradiusBottom, CYLINDERheigth, CYLINDERradioSegments, CYLINDERheigthSegments, CYLINDERopenEnded, circleStartCylinder, circleCylinder );
var cylinder = new THREE.Mesh( CYLINDERgeometry, CYLINDERmaterial );
	cylinder.castShadow = true;	//emitir sombras
	cylinder.receiveShadow = true;	//recibir sombras
	cylinder.position.set(225,0,450);	//position del objeto(x,y,z)
	cylinder.rotation.set(Math.PI/2,0,Math.PI/2);	//rotacion del objeto(x,y,z)
	cylinder.scale.set(1,1,1);		//escala del objeto(x,y,z)
scene.add( cylinder );

//-------------------------------------------------
// LABIO SUPERIOR
//--------------CYLINDER---------------------------

var CYLINDERmaterial = new THREE.MeshPhongMaterial( {color: 0x984717, emissive: 0x000033, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );

var CYLINDERradiusTop = 50; //radio de la parte superios del cilindro
var CYLINDERradiusBottom = 50;	//radio de la parte inferior del cilindro
var CYLINDERheigth = 230;	//altura del cilindro
var CYLINDERradioSegments = 32; //segmentos utilizados para dibujar el cilindro(cuantos mas segmentos mas redondo)
var CYLINDERheigthSegments = 1;	//segmentos necesarios para dibutar la altura del cilindro
var CYLINDERopenEnded = false;	//en off el cilindro en hueco
var circleStartCylinder = 0; //grado desde el que empieza a dibujar la pared del cilindro
var circleCylinder = Math.PI/2; //grados que abarca el cilindro (360, solo 180...)

var CYLINDERgeometry = new THREE.CylinderGeometry( CYLINDERradiusTop, CYLINDERradiusBottom, CYLINDERheigth, CYLINDERradioSegments, CYLINDERheigthSegments, CYLINDERopenEnded, circleStartCylinder, circleCylinder );
var cylinder = new THREE.Mesh( CYLINDERgeometry, CYLINDERmaterial );
	cylinder.castShadow = true;	//emitir sombras
	cylinder.receiveShadow = true;	//recibir sombras
	cylinder.position.set(225,50,350);	//position del objeto(x,y,z)
	cylinder.rotation.set(-Math.PI/2,0,Math.PI/2);	//rotacion del objeto(x,y,z)
	cylinder.scale.set(1,1,1);		//escala del objeto(x,y,z)
scene.add( cylinder );

//-----------------------------------------------
// ----------------plano labio superior-------------------------

var planexAxis = 230;//dimensiones x
var planeyAxis = 50;//dimensiones y
var planezAxis = 50;//dimensiones z

var PLANEmaterial = new THREE.MeshPhongMaterial( {color: 0x984717, emissive: 0x000033, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );

var PLANEgeometry = new THREE.PlaneGeometry( planexAxis, planeyAxis, planezAxis );
var plane = new THREE.Mesh( PLANEgeometry, PLANEmaterial );
	plane.castShadow = true;	//emitir sombras
	plane.receiveShadow = true;	//recibir sombras
	plane.position.set(225,75,350);	//position del objeto(x,y,z)
	plane.rotation.set(0,0,0);	//rotacion del objeto(x,y,z)
	plane.scale.set(1,1,1);		//escala del objeto(x,y,z)
scene.add( plane );

}


function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );

}

function movement(value, object, delay, duration){
          var tween = new TWEEN.Tween(object).to(
          	value
          	,duration).easing(TWEEN.Easing.Quadratic.Out).onUpdate(function () {
          	/*camera.position.x = valueX;
          	camera.position.y = valueY;
          	camera.position.z = valueZ;*/
          }).delay(delay).start();
}

function animate() {

	setTimeout( function() {
		requestAnimationFrame( animate );
	}, 1000/30 );

    TWEEN.update();

	render();

	//if(controls) controls.update( clock.getDelta() );
}

function render(){
	renderer.render(scene,camera);
}
