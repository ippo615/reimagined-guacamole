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
	paths.push('<path id="outer-top-left" d="'+tl+'" ></path>');
	paths.push('<path id="outer-left" d="M 0 '+cornerSize+'L 0 '+(h-cornerSize)+'" ></path>');
	paths.push('<path id="outer-bottom-left" d="'+bl+'" ></path>');
	paths.push('<path id="outer-bottom" d="M '+cornerSize+' '+h+' L '+(w-cornerSize)+' '+h+'" ></path>');
	paths.push('<path id="outer-bottom-right" d="'+br+'" ></path>');
	paths.push('<path id="outer-right" d="M '+w+' '+(h-cornerSize)+' L '+w+' '+cornerSize+'" ></path>');
	paths.push('<path id="outer-top-right" d="'+tr+'"></path>');
	paths.push('<path id="outer-top" d="M '+(w-cornerSize)+' 0 L '+cornerSize+' 0"></path>');
	console.info(paths);
	return '<g transform="translate('+x+','+y+')">'+paths.join(' ')+'</g>';
}

