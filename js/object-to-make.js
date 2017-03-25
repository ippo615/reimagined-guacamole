
function getParameterDefinitions() {
    return [
        { name: 'phone_length', type: 'int', initial: 145, caption: 'Length?' },
        { name: 'phone_width', type: 'int', initial: 70, caption: 'Width?' },
        { name: 'phone_corner_radius', type: 'int', initial: 5, caption: 'Corner?' },
        { name: 'shelf_thickness', type: 'int', initial: 20, caption: 'Shelf Thickness?' },
        { name: 'border', type: 'int', initial: 20, caption: 'Border?' },
        { name: 'tab_length', type: 'int', initial: 40, caption: 'Tab Length?' },
        { name: 'tab_width', type: 'int', initial: 20, caption: 'Tab Width?' },
        { name: 'material_thickness', type: 'number', initial: 3.175, caption: 'Material Thickness?' },
    ];
}

function main(params) {
    var l = params.phone_length;
    var w = params.phone_width;
    var r = params.phone_corner_radius;
    var s = params.shelf_thickness;
    var b = params.border;
    var tw = params.tab_width;
    var tl = params.tab_length;
    var m = params.material_thickness;

    var phone = CAG.roundedRectangle({
        center: [0,0],
        radius: [l, w],
        roundradius: r,
        resolution: 32
    });
    var shelf = CAG.roundedRectangle({
        center: [0,w-b-s*0.5],
        radius: [l-b, s*0.5],
        roundradius: r,
        resolution: 32
    });
    var tabs = CAG.roundedRectangle({
            center: [l-b*3.0,w-b-tl],
            radius: [tw, tl],
            roundradius: r,
            resolution: 32
        }).union(CAG.roundedRectangle({
            center: [-l+b*3.0,w-b-tl],
            radius: [tw, tl],
            roundradius: r,
            resolution: 32
        })
    );
    var slots = CAG.rectangle({
            center: [l-b*3.0,-w+b+m*0.5],
            radius: [tw,m]
        }).union(CAG.rectangle({
            center: [-l+b*3.0,-w+b+m*0.5],
            radius: [tw,m]
        })
    );

    var x = phone.subtract(
	shelf.union(tabs.union(slots))
    );

    return x;

}
