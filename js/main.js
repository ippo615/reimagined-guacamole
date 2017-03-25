$(function(){

	function getThingy(){
		return main({
			'phone_length': 145,
			'phone_width': 70,
			'phone_corner_radius': 5,
			'shelf_thickness': 20,
			'border': 20,
			'tab_length': 40,
			'tab_width': 20,
			'material_thickness': 3.175
		});
	}

	$('#btn-do-it').on('click',function(){
		// Generate the openjscad model
		var x = getThingy();
		// Create and svg file blob and let the user download it
		console.info( x );
		// console.info( x.extrude( [0,0,3.175] ) );
		// var stl = x.extrude( [0,0,3.175] ).toStlString();
		var svg = x.toSvg();
		var url = URL.createObjectURL(svg);
		downloadURI(url,'test.svg');
	});

	var loader = new THREE.STLLoader();
	
	var x = getThingy();
	loader.load( URL.createObjectURL(x.extrude({offset: [0,0,3.175]}).toStlString()), function ( geometry ) {

		var preview = new Preview({
			geometry: geometry,//foldFunction(1).getGeometry(),
			width: Math.round(window.innerWidth / 2),
			height: Math.round(window.innerHeight),
			parent: document.body,
			materials: [
				new THREE.MeshPhongMaterial({
					specular: 0xAACCFF,
					color: 0x00AABB,
					emissive: 0x006060,
					shininess: 8,
					//side: THREE.DoubleSide
					side: THREE.FrontSide
				}),
				new THREE.MeshPhongMaterial({
					specular: 0xFFCCAA,
					color: 0xBBAA00,
					emissive: 0x606000,
					shininess: 8,
					//side: THREE.DoubleSide
					side: THREE.BackSide
				})/*,
				new THREE.MeshBasicMaterial({
					color: 0x000000,
					wireframe: true,
					transparent: true
				})*/
			],
			onRender: function(preview) {
				//preview.object.rotation.x += 0.01;
				//preview.object.rotation.y += 0.01;
			}
		});
		preview.renderer.domElement.style.bottom = '0';
		preview.renderer.domElement.style.left = '0';

		function previewResize(){
			// The preview will be 1/2 the visible window
			preview.setSize(window.innerWidth / 2, window.innerHeight);

			// Move the camera so it the entire object is in view
			geometry.computeBoundingBox();
			var r = Math.max(
				Math.abs(geometry.boundingBox.max.x - geometry.boundingBox.min.x),
				Math.abs(geometry.boundingBox.max.y - geometry.boundingBox.min.y)
			);
			//var r = preview.geometry.boundingSphere.radius;
			var dist = r / 2 / Math.tan(Math.PI * preview.camera.fov / 360);
			preview.camera.position.z = -dist;
		}
		window.addEventListener('resize',previewResize);

		//var previewRender = function() {
		//	requestAnimationFrame(previewRender);
		//	preview.render();
		//};
		//previewRender();
		previewResize();
		preview.render();

		/*
		var material = new THREE.MeshPhongMaterial( { color: 0xff5533, specular: 0x111111, shininess: 200 } );
		var mesh = new THREE.Mesh( geometry, material );
		mesh.position.set( 0, - 0.25, 0.6 );
		mesh.rotation.set( 0, - Math.PI / 2, 0 );
		mesh.scale.set( 0.5, 0.5, 0.5 );
		mesh.castShadow = true;
		mesh.receiveShadow = true;
		scene.add( mesh );
		*/
	} );

});
