// requires roundPathCorners

function makeSvgCodeForBox( x, y, w, h, cornerSize, cornerRadius ){
	var paths = [];
	var c = cornerSize;
	var tl = 'M '+cornerSize+' 0 L 0 0 L 0 '+cornerSize;
	var bl = 'M 0 '+(h-cornerSize)+' L 0 '+h+' L '+cornerSize+' '+h;
	var br = 'M '+(w-cornerSize)+' '+h+' L '+w+' '+h+' L '+w+' '+(h-cornerSize);
	var tr = 'M '+w+' '+cornerSize+' L '+w+' 0 L '+(w-cornerSize)+' 0';
	// roundPathCorners(pathString, radius, useFractionalRadius)
	if( cornerRadius ){
		tl = roundPathCorners( tl, cornerRadius, false );
		bl = roundPathCorners( bl, cornerRadius, false );
		br = roundPathCorners( br, cornerRadius, false );
		tr = roundPathCorners( tr, cornerRadius, false );
	}
	// top-left, left, bottom-left, bottom, bottom-right, right, top-right, top
	paths.push('<path d="'+tl+'" ></path>');
	paths.push('<path d="M 0 '+cornerSize+'L 0 '+(h-cornerSize)+'" ></path>');
	paths.push('<path d="'+bl+'" ></path>');
	paths.push('<path d="M '+cornerSize+' '+h+' L '+(w-cornerSize)+' '+h+'" ></path>');
	paths.push('<path d="'+br+'" ></path>');
	paths.push('<path d="M '+w+' '+(h-cornerSize)+' L '+w+' '+cornerSize+'" ></path>');
	paths.push('<path d="'+tr+'"></path>');
	paths.push('<path d="M '+(w-cornerSize)+' 0 L '+cornerSize+' 0"></path>');
	return '<g transform="translate('+x+','+y+')">'+paths.join(' ')+'</g>';
}


/* A note about SVG Scale and coordinates
 * http://wiki.inkscape.org/wiki/index.php/Units_In_Inkscape
 * "the CSS working group dictated that one inch would be fixed to
 * 96 pixels regardless of screen resolution"
 *
 * This means that we convert everything to pixels.
 * 96px -> 1in -> 25.4mm
 * 96px / 25.4mm = 3.77952755905512px/mm
 *
 * Testing that theory: I found that it's 90 DPI on Inkscape v0.48
 * So I changed the scale in my calcs from 96 DPI to 90 DPI
 */

function mmToPx( mm ){
	//return mm * 96.0/25.4;
	return mm * 90.0/25.4;
}

// Just so i can easily style the svgs
function getCssStyleLaserCutting(){
	var style = '';
	style += [
		'path {',
		'stroke: black;',
		'stroke-width:1px;',
		'fill:none;',
		'}'
	].join(' ');
	return style;
}
function getCssStylePreview(){
	var style = '';
	style += [
		'path {',
		'stroke: black;',
		'stroke-width:1px;',
		'fill:none;',
		'}'
	].join(' ');
	return style;
}
