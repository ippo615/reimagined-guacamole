$(function(){

	var preview;

	function readOptions(){
		return {
			'phone_length': parseFloat($('#phone_length').val()),
			'phone_width': parseFloat($('#phone_width').val()),
			'phone_corner_radius': parseFloat($('#phone_corner_radius').val()),
			'shelf_thickness': parseFloat($('#shelf_thickness').val()),
			'border': parseFloat($('#border').val()),
			'tab_length': parseFloat($('#tab_length').val()),
			'tab_width': parseFloat($('#tab_width').val()),
			'material_thickness': parseFloat($('#material_thickness').val()),
		};
	};

	function getThingy(){
		return main(readOptions());
	}

	function createInputString( data ){
		var html = '';
		html += '<div class="input-group">';
		html += '<label for="'+data.name+'">'+data.caption+'</label>';
		html += '<input id="'+data.name+'" type="'+data.type+'" value="'+data.initial+'">';
		html += '</div>';
		return html;
	}
	function createInputs( parameters ){
		var html = '';
		for( var i=0, l=parameters.length; i<l; i+=1 ){
			html += createInputString(parameters[i]);
		}
		$('#side-bar-input').html( html );
	}
	createInputs( getParameterDefinitions() );

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

	$('#btn-update-preview').on('click',function(){
		var x = getThingy();
		loader.load( URL.createObjectURL(x.extrude({offset: [0,0,parseFloat($('#material_thickness').val())]}).toStlString()), function ( geometry ) {
			preview.replaceGeometry( geometry );
		} );
	});

	var loader = new THREE.STLLoader();
	
	var x = getThingy();
	loader.load( URL.createObjectURL(x.extrude({offset: [0,0,3.175]}).toStlString()), function ( geometry ) {

		preview = new Preview({
			geometry: geometry,//foldFunction(1).getGeometry(),
			width: Math.round(window.innerWidth / 2),
			height: Math.round(window.innerHeight),
			parent: $('#preview-area')[0],
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
