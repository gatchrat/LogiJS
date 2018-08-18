// File: loadsave.js
function saveCustomLogiFlash(customGate) {
	console.log(customGate);
	//Create xml with gateml
	let xmldoc = document.implementation.createDocument("", "", null);
	let xmlComponent=xmldoc.createElement("component");
	let gateml = xmldoc.createElement("gateml");
	xmlComponent.setAttribute("name", customGate.caption);
	xmlComponent.setAttribute("id", customGate.id);
	xmlComponent.setAttribute("states", "no");
	xmlComponent.setAttribute("wid", customGate.w);
	xmlComponent.setAttribute("hei", customGate.h);
	
	let xmlLuts=xmldoc.createElement("luts");
	xmlLut=xmldoc.createElement("lut");
	xmlLut.setAttribute("values", loadLut(customGate.filename));
	xmlLuts.appendChild(xmlLut);
	
	let xmlConnectors=xmldoc.createElement("connectors");
	let tops = 0;
	for(let i = 0;i<customGate.objects[INPNUM].length;i++){
		let xPos;
		let yPos;
		if(!customGate.objects[INPNUM][i].isTop){
			xPos =-customGate.w/2;
			yPos =-customGate.h/2 +  (i+1 - tops) *customGate.h/ customGate.height;
			console.log(yPos);
			console.log(customGate.height);
			console.log(i);
		}
		else{
			
			xPos =(customGate.h * tops) / customGate.height;
			yPos =-customGate.h/2;
			tops++;
		}			
		let xmlConnector = xmldoc.createElement("connector");
		xmlConnector.setAttribute("type", "in");
		xmlConnector.setAttribute("x", xPos);
		xmlConnector.setAttribute("y", yPos);
		xmlConnector.setAttribute("rot", "0");
		xmlConnectors.appendChild(xmlConnector);
	}
	for(let i = 0;i<customGate.objects[OUTPNUM].length;i++){
		let xPos;
		let yPos = (customGate.h * i) / customGate.height;
		xPos =customGate.w/2  ;			
		let xmlConnector = xmldoc.createElement("connector");
		xmlConnector.setAttribute("type", "out");
		xmlConnector.setAttribute("x", xPos);
		xmlConnector.setAttribute("y", yPos);
		xmlConnector.setAttribute("rot", "0");
		xmlConnectors.appendChild(xmlConnector);
	}
	
	//Normal Component stuff
	
	gateml.setAttribute("stepMode", "off");
	gateml.setAttribute("allowStep", "no");
	gateml.setAttribute("y", "100");
	gateml.setAttribute("x", "100");
	gateml.setAttribute("zoom", "0.5");
	gateml.setAttribute("oncolor", "ffcc00");
	//create components
	let curGates = customGate.objects[GATENUM];
	let xmlcomponents = xmldoc.createElement("components");
	for (let i = 0; i < curGates.length; i++) {
		let curGate = curGates[i];
		let newComponent=xmldoc.createElement("component");
		switch (curGate.logicFunction) {
			case 'and':
				createAnd(curGate,xmldoc,newComponent);
				break;
			case 'or':
				createOr(curGate,xmldoc,newComponent);
				break;
			case 'xor':
				createXor(curGate,xmldoc,newComponent);
				break;
			default:
				console.log('Invalid logic function!');
		}
		
		xmlcomponents.appendChild(newComponent);
	} 
	//save customs
	for (let i = 0; i < customGate.responsibles.length; i++) {
		xmlcomponents.appendChild(saveCustomLogiFlash(customGate.responsibles[i]));
	}
	//create gates
	let xmlgates = xmldoc.createElement("gates");
	for (let i = 0; i < curGates.length; i++) {
		let curGate = curGates[i];
		let newGate=xmldoc.createElement("gate");
		switch (curGate.logicFunction) {
			case 'and':
				newGate.setAttribute("type", "GenGate");
				newGate.setAttribute("id", curGate.id);
				break;
			case 'or':
				newGate.setAttribute("type", "GenGate");
				newGate.setAttribute("id", curGate.id);
				break;
			case 'xor':
				newGate.setAttribute("type", "GenGate");
				newGate.setAttribute("id", curGate.id);
				break;
			default:
				console.log('Invalid logic function!');
		}
		newGate.setAttribute("rot", curGate.direction*90);
		//Convert inverted inputs/outputs from true false to 1 0, maybe put in own function
		let newIns = curGate.inputsInv;
		for (let i = 0; i < newIns.length; i++) {
			newIns[i] = newIns[i] ? 1 : 0;
		}
		newIns = newIns.join("");
		let newOuts = curGate.outputsInv;
		for (let i = 0; i < newOuts.length; i++) {
			newOuts[i] = newOuts[i] ? 1 : 0;
		}
		newOuts = newOuts.join("");
		newGate.setAttribute("ins", newIns);
		newGate.setAttribute("outs", newOuts);
		newGate.setAttribute("edge", "yes");
		console.log(curGate.x+ "width"+curGate.w+" y"+curGate.y+"heigh" +curGate.h );
		
		newGate.setAttribute("x", curGate.x+30);
		newGate.setAttribute("y", curGate.y+45);
		xmlgates.appendChild(newGate);
	}
	console.log("added gates");
	//create sources
	let xmlsources = xmldoc.createElement("sources");
	for (let i = 0; i < customGate.objects[INPNUM].length; i++) {
		let curSource = customGate.objects[INPNUM][i];
		let newSource=xmldoc.createElement("source");
		newSource.setAttribute("type","button");
		newSource.setAttribute("x",curSource.x-curSource.w/2+7);
		newSource.setAttribute("y",curSource.y+curSource.w/2);
		newSource.setAttribute("scale","1");
		xmlsources.appendChild(newSource);
	}
		
	//create drains
	let xmldrains = xmldoc.createElement("drains");
	for (let i = 0; i < customGate.objects[OUTPNUM].length; i++) {
		let curDrain =customGate.objects[OUTPNUM][i];
		let newDrain=xmldoc.createElement("drain");
		newDrain.setAttribute("type","lamp");
		newDrain.setAttribute("x",curDrain.x-curDrain.w+7);
		newDrain.setAttribute("y",curDrain.y);
		newDrain.setAttribute("scale","1");
		xmldrains.appendChild(newDrain);
	}
	//create wires
	let xmlwires = xmldoc.createElement("wires");
	let leftPoints =[];
	for (let i = 0; i < customGate.objects[SEGNUM].length; i++) {
		let curWire = customGate.objects[SEGNUM][i];
		let newWire=xmldoc.createElement("wire");
		if( curWire.endX > curWire.startX ){
			
			newWire.setAttribute("righty", curWire.endY);
			newWire.setAttribute("rightx", curWire.endX);
			newWire.setAttribute("lefty", curWire.startY);
			newWire.setAttribute("leftx", curWire.startX);
		}
		else{
			
			if(leftPoints.includes([curWire.startY, curWire.startX])){
				newWire.setAttribute("righty", curWire.endY);
				newWire.setAttribute("rightx", curWire.endX);
				newWire.setAttribute("lefty", curWire.startY);
				newWire.setAttribute("leftx", curWire.startX);
			}
			else{
				leftPoints.push([curWire.startY, curWire.startX]);
				newWire.setAttribute("righty", curWire.startY);
				newWire.setAttribute("rightx", curWire.startX);
				newWire.setAttribute("lefty", curWire.endY);
				newWire.setAttribute("leftx", curWire.endX);
			}
			
			
		}
		xmlwires.appendChild(newWire);
	}
	//create texts
	let xmltexts = xmldoc.createElement("texts");
	//add to gateml
	
	gateml.appendChild(xmlcomponents);
	gateml.appendChild(xmlgates);
	gateml.appendChild(xmlsources);
	gateml.appendChild(xmldrains);
	gateml.appendChild(xmlwires);
	gateml.appendChild(xmltexts);
	xmlComponent.appendChild(xmlConnectors);
	xmlComponent.appendChild(xmlLuts);
	xmlComponent.appendChild(xmldoc.createElement("annotation"));
	xmlComponent.appendChild(gateml);
	xmldoc.appendChild(xmlComponent);
	
	return xmlComponent;
}
function saveSketchLogiFlash() {
	//Create xml with gateml
	let xmldoc = document.implementation.createDocument("", "", null);
	let gateml = xmldoc.createElement("gateml");
	gateml.setAttribute("stepMode", "off");
	gateml.setAttribute("allowStep", "no");
	gateml.setAttribute("y", "100");
	gateml.setAttribute("x", "100");
	gateml.setAttribute("zoom", "0.5");
	gateml.setAttribute("oncolor", "ffcc00");
	//create components
	let xmlcomponents = xmldoc.createElement("components");
	for (let i = 0; i < gates.length; i++) {
		let curGate = gates[i];
		let newComponent=xmldoc.createElement("component");
		switch (curGate.logicFunction) {
			case 'and':
				createAnd(curGate,xmldoc,newComponent);
				break;
			case 'or':
				createOr(curGate,xmldoc,newComponent);
				break;
			case 'xor':
				createXor(curGate,xmldoc,newComponent);
				break;
			default:
				console.log('Invalid logic function!');
		}
		
		xmlcomponents.appendChild(newComponent);
	} 
	//save customs
	let supported = [];
	let xmlgates = xmldoc.createElement("gates");
	for (let i = 0; i < customs.length; i++) {
		xmlcomponents.appendChild(saveCustomLogiFlash(customs[i]));
		let curGate = customs[i]
		let newGate=xmldoc.createElement("gate");
		newGate.setAttribute("type", "GenGate");
		newGate.setAttribute("id", curGate.id);
		newGate.setAttribute("rot", curGate.direction*90);
		//Convert inverted inputs/outputs from true false to 1 0, maybe put in own function
		let newIns = curGate.inputs;
		for (let i = 0; i < newIns.length; i++) {
			newIns[i] = newIns[i] ? 1 : 0;
		}
		newIns = newIns.join("");
		let newOuts = curGate.outputs;
		for (let i = 0; i < newOuts.length; i++) {
			newOuts[i] = newOuts[i] ? 1 : 0;
		}
		newOuts = newOuts.join("");
		newGate.setAttribute("ins", newIns);
		newGate.setAttribute("outs", newOuts);
		newGate.setAttribute("edge", "yes");
		
		newGate.setAttribute("x", curGate.x+curGate.w/2);
		newGate.setAttribute("y", curGate.y+curGate.h/2);
		xmlgates.appendChild(newGate);
	}
	//create gates
	
	for (let i = 0; i < gates.length; i++) {
		let curGate = gates[i];
		let newGate=xmldoc.createElement("gate");
		switch (curGate.logicFunction) {
			case 'and':
				newGate.setAttribute("type", "GenGate");
				newGate.setAttribute("id", curGate.id);
				break;
			case 'or':
				newGate.setAttribute("type", "GenGate");
				newGate.setAttribute("id", curGate.id);
				break;
			case 'xor':
				newGate.setAttribute("type", "GenGate");
				newGate.setAttribute("id", curGate.id);
				break;
			default:
				console.log('Invalid logic function!');
		}
		newGate.setAttribute("rot", curGate.direction*90);
		//Convert inverted inputs/outputs from true false to 1 0, maybe put in own function
		let newIns = curGate.inputsInv;
		for (let i = 0; i < newIns.length; i++) {
			newIns[i] = newIns[i] ? 1 : 0;
		}
		newIns = newIns.join("");
		let newOuts = curGate.outputsInv;
		for (let i = 0; i < newOuts.length; i++) {
			newOuts[i] = newOuts[i] ? 1 : 0;
		}
		newOuts = newOuts.join("");
		newGate.setAttribute("ins", newIns);
		newGate.setAttribute("outs", newOuts);
		newGate.setAttribute("edge", "yes");
		
		newGate.setAttribute("x", curGate.x+30);
		newGate.setAttribute("y", curGate.y+45);
		xmlgates.appendChild(newGate);
	}
	console.log("added gates");
	//create sources
	let xmlsources = xmldoc.createElement("sources");
	for (let i = 0; i < inputs.length; i++) {
		let curSource = inputs[i];
		let newSource=xmldoc.createElement("source");
		newSource.setAttribute("type","button");
		newSource.setAttribute("x",curSource.x-curSource.w/2+6);
		newSource.setAttribute("y",curSource.y+curSource.w/2);
		newSource.setAttribute("scale","1");
		xmlsources.appendChild(newSource);
	}
		
	//create drains
	let xmldrains = xmldoc.createElement("drains");
	for (let i = 0; i < outputs.length; i++) {
		let curDrain = outputs[i];
		let newDrain=xmldoc.createElement("drain");
		newDrain.setAttribute("type","lamp");
		newDrain.setAttribute("x",curDrain.x-curDrain.w+7);
		newDrain.setAttribute("y",curDrain.y);
		newDrain.setAttribute("scale","1");
		xmlsources.appendChild(newDrain);
	}
	//create wires
	let xmlwires = xmldoc.createElement("wires");
	let leftPoints =[];
	for (let i = 0; i < segments.length; i++) {
		let curWire = segments[i];
		let newWire=xmldoc.createElement("wire");
		if( curWire.endX > curWire.startX ){
			
			newWire.setAttribute("righty", curWire.endY);
			newWire.setAttribute("rightx", curWire.endX);
			newWire.setAttribute("lefty", curWire.startY);
			newWire.setAttribute("leftx", curWire.startX);
		}
		else{
			
			if(leftPoints.includes([curWire.startY, curWire.startX])){
				newWire.setAttribute("righty", curWire.endY);
				newWire.setAttribute("rightx", curWire.endX);
				newWire.setAttribute("lefty", curWire.startY);
				newWire.setAttribute("leftx", curWire.startX);
			}
			else{
				leftPoints.push([curWire.startY, curWire.startX]);
				newWire.setAttribute("righty", curWire.startY);
				newWire.setAttribute("rightx", curWire.startX);
				newWire.setAttribute("lefty", curWire.endY);
				newWire.setAttribute("leftx", curWire.endX);
			}
			
			
		}
		xmlwires.appendChild(newWire);
	}
	//create texts
	let xmltexts = xmldoc.createElement("texts");
	//add to gateml
	
	gateml.appendChild(xmlcomponents);
	gateml.appendChild(xmlgates);
	gateml.appendChild(xmlsources);
	gateml.appendChild(xmldrains);
	gateml.appendChild(xmlwires);
	gateml.appendChild(xmltexts);
	xmldoc.appendChild(gateml);
	
	let xmlText = new XMLSerializer().serializeToString(xmldoc);
	console.log(xmldoc);
	saveStrings(xmlText.split('\n'), 'dunno', 'xml');
}
function saveSketch(filename) {
    // Create a new json object to store all elements in
    let json = {};
    // New elements should have the filename as their caption (for now)
    json.caption = filename.substring(0, filename.indexOf('.'));
    json.gates = [];
    json.outputs = [];
    json.inputs = [];
    json.segments = [];
    json.wires = [];
    json.conpoints = [];
    json.diodes = [];
    json.customs = [];
    json.labels = [];
    json.segDisplays = [];
    for (let i = 0; i < gates.length; i++) {
        json.gates.push(gates[i].getData());
    }
    for (let i = 0; i < outputs.length; i++) {
        json.outputs.push(outputs[i].getData());
    }
    for (let i = 0; i < inputs.length; i++) {
        json.inputs.push(inputs[i].getData());
    }
    for (let i = 0; i < wires.length; i++) {
        json.wires.push(wires[i].getWireData());
    }
    for (let i = 0; i < conpoints.length; i++) {
        json.conpoints.push(conpoints[i].getData());
    }
    for (let i = 0; i < diodes.length; i++) {
        json.diodes.push(diodes[i].getData());
    }
    for (let i = 0; i < labels.length; i++) {
        json.labels.push(labels[i].getData());
    }
    for (let i = 0; i < segDisplays.length; i++) {
        json.segDisplays.push(segDisplays[i].getData());
    }
    for (let i = 0; i < customs.length; i++) {
        if (customs[i].visible) {
            json.customs.push(customs[i].getData());
        }
    }
    saveJSON(json, filename); // Save the file as json (asks for directory...)
}

function loadSketch(file) {
    loadJSON('sketches/' + file, load, fileNotFoundError);
}

function fileNotFoundError() {
    // Change the site's title to the error message
    document.title = "Sketch not found! - LogiJS";
}

function load(loadData) {
    gates = []; // Reset all elements and the view before loading
    outputs = [];
    inputs = [];
    segments = [];
    conpoints = [];
    customs = [];
    diodes = [];
    labels = [];
    segDisplays = [];
    transform = new Transformation(0, 0, 1);
    gridSize = GRIDSIZE;
    actionUndo = []; // Clear Undo / Redo stacks
    actionRedo = [];
    endSimulation(); // End ongoing simulations
    // Load all gate parameters and create new gates based on that information
    for (let i = 0; i < loadData.gates.length; i++) {
        gates[i] = new LogicGate(JSON.parse(loadData.gates[i].x), JSON.parse(loadData.gates[i].y), transform, JSON.parse(loadData.gates[i].direction),
            JSON.parse(loadData.gates[i].inputCount), JSON.parse(loadData.gates[i].outputCount), JSON.parse(loadData.gates[i].logicFunction));
        gates[i].setInvertions(JSON.parse(loadData.gates[i].inputsInv), JSON.parse(loadData.gates[i].outputsInv));
        gates[i].setCoordinates(JSON.parse(loadData.gates[i].x) / transform.zoom - transform.dx, JSON.parse(loadData.gates[i].y) / transform.zoom - transform.dy);
        gates[i].updateClickBoxes();
    }
    for (let i = 0; i < loadData.outputs.length; i++) {
        outputs[i] = new Output(JSON.parse(loadData.outputs[i].x), JSON.parse(loadData.outputs[i].y), transform, JSON.parse(loadData.outputs[i].colr));
        if (loadData.outputs[i].hasOwnProperty("lbl")) {
            outputs[i].lbl = loadData.outputs[i].lbl;
        }
        outputs[i].setCoordinates(JSON.parse(loadData.outputs[i].x) / transform.zoom - transform.dx, JSON.parse(loadData.outputs[i].y) / transform.zoom - transform.dy);
        outputs[i].updateClickBox();
    }
    for (let i = 0; i < loadData.inputs.length; i++) {
        inputs[i] = new Input(JSON.parse(loadData.inputs[i].x), JSON.parse(loadData.inputs[i].y), transform);
        inputs[i].setClock(loadData.inputs[i].clock === "true");
        inputs[i].framecount = parseInt(loadData.inputs[i].framecount);
        if (loadData.inputs[i].hasOwnProperty("istop")) {
            inputs[i].isTop = true;
        }
        if (loadData.inputs[i].hasOwnProperty("speed")) {
            inputs[i].speed = JSON.parse(loadData.inputs[i].speed);
        }
        if (loadData.inputs[i].hasOwnProperty("lbl")) {
            inputs[i].lbl = loadData.inputs[i].lbl;
        }
        inputs[i].setCoordinates(JSON.parse(loadData.inputs[i].x) / transform.zoom - transform.dx, JSON.parse(loadData.inputs[i].y) / transform.zoom - transform.dy);
        inputs[i].updateClickBox();
    }
    for (let i = 0; i < loadData.segments.length; i++) {
        segments[i] = new WSeg(JSON.parse(loadData.segments[i].direction), JSON.parse(loadData.segments[i].startX), JSON.parse(loadData.segments[i].startY),
            false, transform);
    }
    if (loadData.hasOwnProperty("wires")) {
        for (let i = 0; i < loadData.wires.length; i++) {
            if (loadData.wires[i].hasOwnProperty("y2")) {
                if (JSON.parse(loadData.wires[i].y1) !== JSON.parse(loadData.wires[i].y2)) { // For compability
                    // Vertical wire, split in n vertical segments | Assuming y1 < y2, can always be saved in that form
                    for (let j = 0; j < (JSON.parse(loadData.wires[i].y2) - JSON.parse(loadData.wires[i].y1)) / GRIDSIZE; j++) {
                        segments.push(new WSeg(1, JSON.parse(loadData.wires[i].x1), (JSON.parse(loadData.wires[i].y1) + j * GRIDSIZE),
                            false, transform));
                    }
                }
            }
            if (loadData.wires[i].hasOwnProperty("x2")) {
                if (JSON.parse(loadData.wires[i].x1) !== JSON.parse(loadData.wires[i].x2)) { // For compability
                    // Horizontal wire, split in n horizontal segments | Assuming x1 < x2, can always be saved in that form
                    for (let j = 0; j < (JSON.parse(loadData.wires[i].x2) - JSON.parse(loadData.wires[i].x1)) / GRIDSIZE; j++) {
                        segments.push(new WSeg(0, JSON.parse(loadData.wires[i].x1) + j * GRIDSIZE, (JSON.parse(loadData.wires[i].y1)),
                            false, transform));
                    }
                } else {
                    console.log('JSON file is corrupted!');
                }
            } 
        }
    }
    for (let i = 0; i < loadData.conpoints.length; i++) {
        conpoints[i] = new ConPoint(JSON.parse(loadData.conpoints[i].x), JSON.parse(loadData.conpoints[i].y), false, -1);
    }
    for (let i = 0; i < loadData.diodes.length; i++) {
        diodes[i] = new Diode(JSON.parse(loadData.diodes[i].x), JSON.parse(loadData.diodes[i].y), false, transform);
    }
    if (loadData.hasOwnProperty("labels")) {
        for (let i = 0; i < loadData.labels.length; i++) {
            labels[i] = new Label(JSON.parse(loadData.labels[i].x), JSON.parse(loadData.labels[i].y), loadData.labels[i].txt, transform);
        }
    }
    if (loadData.hasOwnProperty("segDisplays")) {
        for (let i = 0; i < loadData.segDisplays.length; i++) {
            segDisplays[i] = new SegmentDisplay(JSON.parse(loadData.segDisplays[i].x), JSON.parse(loadData.segDisplays[i].y), transform, JSON.parse(loadData.segDisplays[i].inputCount));
        }
    }
    for (let i = 0; i < loadData.customs.length; i++) {
        customs[i] = new CustomSketch(JSON.parse(loadData.customs[i].x), JSON.parse(loadData.customs[i].y), transform, JSON.parse(loadData.customs[i].direction), JSON.parse(loadData.customs[i].filename));
        customs[i].setInvertions(JSON.parse(loadData.customs[i].inputsInv), JSON.parse(loadData.customs[i].outputsInv));
        customs[i].setCoordinates(JSON.parse(loadData.customs[i].x) / transform.zoom - transform.dx, JSON.parse(loadData.customs[i].y) / transform.zoom - transform.dy);
    }
    loadCustomSketches(); // Load all custom sketches from file
    if (textInput.value() !== 'New Sketch') {
        document.title = textInput.value() + ' - LogiJS';
    }
    findLines();
    reDraw();
}

/*
    Loads the sketch with filename file into custom object # num
*/
function loadCustomFile(file, num, hlparent) {
    loadJSON('sketches/' + file, function (loadData) { return loadCustom(loadData, num, hlparent); });
}

/*
    Invoked by loadCustomFile when the json is fully loaded
*/
function loadCustom(loadData, num, hlparent) {
    let params = [[], [], [], [], [], [], []]; // [] x Number of different objects
    let trans = new Transformation(0, 0, 1);
    for (let i = 0; i < loadData.gates.length; i++) {
        params[GATENUM][i] = new LogicGate(JSON.parse(loadData.gates[i].x), JSON.parse(loadData.gates[i].y), trans, JSON.parse(loadData.gates[i].direction),
            JSON.parse(loadData.gates[i].inputCount), JSON.parse(loadData.gates[i].outputCount), JSON.parse(loadData.gates[i].logicFunction));
        params[GATENUM][i].setInvertions(JSON.parse(loadData.gates[i].inputsInv), JSON.parse(loadData.gates[i].outputsInv));
        params[GATENUM][i].setCoordinates(JSON.parse(loadData.gates[i].x) / trans.zoom - trans.dx, JSON.parse(loadData.gates[i].y) / trans.zoom - trans.dy);
        params[GATENUM][i].updateClickBoxes();
    }
    for (let i = 0; i < loadData.outputs.length; i++) {
        params[OUTPNUM][i] = new Output(JSON.parse(loadData.outputs[i].x), JSON.parse(loadData.outputs[i].y), trans, JSON.parse(loadData.outputs[i].colr));
        if (loadData.outputs[i].hasOwnProperty("lbl")) {
            params[OUTPNUM][i].lbl = loadData.outputs[i].lbl;
        }
        params[OUTPNUM][i].setCoordinates(JSON.parse(loadData.outputs[i].x) / trans.zoom - trans.dx, JSON.parse(loadData.outputs[i].y) / trans.zoom - trans.dy);
        params[OUTPNUM][i].updateClickBox();
    }
    for (let i = 0; i < loadData.inputs.length; i++) {
        params[INPNUM][i] = new Input(JSON.parse(loadData.inputs[i].x), JSON.parse(loadData.inputs[i].y), trans);
        if (loadData.inputs[i].hasOwnProperty("lbl")) {
            params[INPNUM][i].lbl = loadData.inputs[i].lbl;
        }
        params[INPNUM][i].setClock(loadData.inputs[i].clock === 'true');
        params[INPNUM][i].framecount = loadData.inputs[i].framecount;
        if (loadData.inputs[i].hasOwnProperty("istop")) {
            params[INPNUM][i].isTop = true;
        }
        if (loadData.inputs[i].hasOwnProperty("speed")) {
            params[INPNUM][i].speed = JSON.parse(loadData.inputs[i].speed);
        }
        params[INPNUM][i].setCoordinates(JSON.parse(loadData.inputs[i].x) / trans.zoom - trans.dx, JSON.parse(loadData.inputs[i].y) / trans.zoom - trans.dy);
        params[INPNUM][i].updateClickBox();
    }
    for (let i = 0; i < loadData.segments.length; i++) {
        params[SEGNUM][i] = new WSeg(JSON.parse(loadData.segments[i].direction), JSON.parse(loadData.segments[i].startX), JSON.parse(loadData.segments[i].startY),
            false, trans);
    }
    if (loadData.hasOwnProperty("wires")) {
        for (let i = 0; i < loadData.wires.length; i++) {
            if (loadData.wires[i].hasOwnProperty("y2")) {
                if (JSON.parse(loadData.wires[i].y1) !== JSON.parse(loadData.wires[i].y2)) { // For compability
                    // Vertical wire, split in n vertical segments | Assuming y1 < y2, can always be saved in that form
                    for (let j = 0; j < (JSON.parse(loadData.wires[i].y2) - JSON.parse(loadData.wires[i].y1)) / GRIDSIZE; j++) {
                        params[SEGNUM].push(new WSeg(1, JSON.parse(loadData.wires[i].x1), (JSON.parse(loadData.wires[i].y1) + j * GRIDSIZE),
                            false, transform));
                    }
                }
            }
            if (loadData.wires[i].hasOwnProperty("x2")) {
                if (JSON.parse(loadData.wires[i].x1) !== JSON.parse(loadData.wires[i].x2)) { // For compability
                    // Horizontal wire, split in n horizontal segments | Assuming x1 < x2, can always be saved in that form
                    for (let j = 0; j < (JSON.parse(loadData.wires[i].x2) - JSON.parse(loadData.wires[i].x1)) / GRIDSIZE; j++) {
                        params[SEGNUM].push(new WSeg(0, JSON.parse(loadData.wires[i].x1) + j * GRIDSIZE, (JSON.parse(loadData.wires[i].y1)),
                            false, transform));
                    }
                } else {
                    console.log('JSON file is corrupted!');
                }
            }
        }
    }
    for (let i = 0; i < loadData.conpoints.length; i++) {
        params[CPNUM][i] = new ConPoint(JSON.parse(loadData.conpoints[i].x), JSON.parse(loadData.conpoints[i].y), false, -1);
    }
    for (let i = 0; i < loadData.diodes.length; i++) {
        params[DINUM][i] = new Diode(JSON.parse(loadData.diodes[i].x), JSON.parse(loadData.diodes[i].y), false, trans);
    }
    for (let i = 0; i < loadData.customs.length; i++) {
        customs.push(new CustomSketch(JSON.parse(loadData.customs[i].x), JSON.parse(loadData.customs[i].y), trans, JSON.parse(loadData.customs[i].direction), JSON.parse(loadData.customs[i].filename)));
        customs[customs.length - 1].setInvertions(JSON.parse(loadData.customs[i].inputsInv), JSON.parse(loadData.customs[i].outputsInv));
        customs[customs.length - 1].setCoordinates(JSON.parse(loadData.customs[i].x) / trans.zoom - trans.dx, JSON.parse(loadData.customs[i].y) / trans.zoom - trans.dy);
        customs[customs.length - 1].updateClickBoxes();
        customs[customs.length - 1].visible = false;
        customs[customs.length - 1].setParentID(customs[hlparent].id);
        customs[customs.length - 1].loaded = true;
        customs[num].responsibles.push(customs[customs.length - 1]);
        loadCustomFile(customs[customs.length - 1].filename, customs.length - 1, num);
        params[CUSTNUM][i] = customs[customs.length - 1];
    }
    customs[num].setSketchParams(params);
    customs[num].setCaption(loadData.caption);
    customs[num].loaded = true;
    reDraw();
}

/*
    Loads the sketches of all customs (visible and invisible)
*/
function loadCustomSketches() {
    for (let i = 0; i < customs.length; i++) {
        if (!customs[i].loaded) {
            loadCustomFile(customs[i].filename, i, i);
        }
    }
}