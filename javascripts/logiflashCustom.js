//Generates Custom components so wires fit, ugly af + should only be one function
function createAnd(curGate,xmldoc,newComponent) {
	newComponent.setAttribute("name", "And");
	newComponent.setAttribute("id", curGate.id);
	newComponent.setAttribute("states", "no");
	newComponent.setAttribute("wid", curGate.w);
	newComponent.setAttribute("hei", curGate.w);
	let xmlConnectors = xmldoc.createElement("connectors");
	for(let i = 0; i < curGate.inputs.length; i++){
		let yPos = i*5;
		if(i==0){
			yPos=-13;
		}
		else{
			yPos=15.8;
		}
		let xPos = -30;
		if(curGate.inputsInv[i]){
		 xPos = -11;
		}
		let xmlConnector = xmldoc.createElement("connector");
		xmlConnector.setAttribute("type", "in");
		xmlConnector.setAttribute("x", xPos);
		xmlConnector.setAttribute("y", yPos);
		xmlConnector.setAttribute("rot", "0");
		xmlConnectors.appendChild(xmlConnector);
	}
	for(let i = 0; i < curGate.outputs.length; i++){
		if(i==0){
			yPos=-13;
		}
		else{
			yPos=15.8;
		}
		let xmlConnector = xmldoc.createElement("connector");
		xmlConnector.setAttribute("type", "out");
		xmlConnector.setAttribute("x", "30");
		xmlConnector.setAttribute("y", yPos);
		xmlConnector.setAttribute("rot", "180");
		xmlConnectors.appendChild(xmlConnector);
	}
	let luts = xmldoc.createElement("luts");
	let lut = xmldoc.createElement("lut");
	lut.setAttribute("values","0001");
	luts.appendChild(lut);
	let annotation = xmldoc.createElement("annotation");
	let text = xmldoc.createElement("text");
	text.setAttribute("size","18");
	text.setAttribute("x","-21");
	text.setAttribute("y","-15");
	text.innerHTML = "&amp;";
	annotation.appendChild(text);
	
	let gateml =xmldoc.createElement("gateml");
	gateml.setAttribute("y", "5.4");
	gateml.setAttribute("x", "7.3");
	gateml.setAttribute("zoom", "1");
	gateml.setAttribute("oncolor", "ffcc00");
	
	let xmlGates = xmldoc.createElement("gates");
	let xmlGate = xmldoc.createElement("gate");
	xmlGate.setAttribute("type", "And");
	xmlGate.setAttribute("rot", "0");
	xmlGate.setAttribute("ins", "00");
	xmlGate.setAttribute("outs", "0");
	xmlGate.setAttribute("x", "230");
	xmlGate.setAttribute("y", "180");
	xmlGates.appendChild(xmlGate);
	
	let xmlSources = xmldoc.createElement("sources");
	let xmlSource = xmldoc.createElement("source");
	xmlSource.setAttribute("type", "button");
	xmlSource.setAttribute("x", "100");
	xmlSource.setAttribute("y", "150");
	xmlSource.setAttribute("scale", "1");
	xmlSources.appendChild(xmlSource);
	xmlSource = xmldoc.createElement("source");
	xmlSource.setAttribute("type", "button");
	xmlSource.setAttribute("x", "90");
	xmlSource.setAttribute("y", "210");
	xmlSource.setAttribute("scale", "1");
	xmlSources.appendChild(xmlSource);
	
	let xmlDrains = xmldoc.createElement("drains");
	let xmlDrain= xmldoc.createElement("drain");
	xmlDrain.setAttribute("type", "lamp");
	xmlDrain.setAttribute("y", "190");
	xmlDrain.setAttribute("x", "310");
	xmlDrain.setAttribute("scale", "1");
	xmlDrains.appendChild(xmlDrain);
	
	let xmlWires = xmldoc.createElement("wires");
	let xmlWire = xmldoc.createElement("wire");
	xmlWire.setAttribute("righty", "160");
	xmlWire.setAttribute("rightx", "200");
	xmlWire.setAttribute("lefty", "150");
	xmlWire.setAttribute("leftx", "120");
	xmlWires.appendChild(xmlWire);
	xmlWire = xmldoc.createElement("wire");
	xmlWire.setAttribute("righty", "200");
	xmlWire.setAttribute("rightx", "200");
	xmlWire.setAttribute("lefty", "210");
	xmlWire.setAttribute("leftx", "110");
	xmlWires.appendChild(xmlWire);
	xmlWire = xmldoc.createElement("wire");
	xmlWire.setAttribute("righty", "190");
	xmlWire.setAttribute("rightx", "290");
	xmlWire.setAttribute("lefty", "180");
	xmlWire.setAttribute("leftx", "260");
	xmlWires.appendChild(xmlWire);
	
	gateml.appendChild(xmlGates);
	gateml.appendChild(xmlSources);
	gateml.appendChild(xmlDrains);
	gateml.appendChild(xmlWires);
	
	newComponent.appendChild(xmlConnectors);
	newComponent.appendChild(luts);
	newComponent.appendChild(annotation);
	newComponent.appendChild(gateml);
   
}
function createOr(curGate,xmldoc,newComponent) {
	
	newComponent.setAttribute("name", "Or");
	newComponent.setAttribute("id", curGate.id);
	newComponent.setAttribute("states", "no");
	newComponent.setAttribute("wid", curGate.w);
	newComponent.setAttribute("hei", curGate.w);
	let xmlConnectors = xmldoc.createElement("connectors");
	for(let i = 0; i < curGate.inputs.length; i++){
		let yPos = i*5;
		if(i==0){
			yPos=-13;
		}
		else{
			yPos=15.8;
		}
		
		let xmlConnector = xmldoc.createElement("connector");
		xmlConnector.setAttribute("type", "in");
		xmlConnector.setAttribute("x", "-30");
		xmlConnector.setAttribute("y", yPos);
		xmlConnector.setAttribute("rot", "0");
		xmlConnectors.appendChild(xmlConnector);
	}
	for(let i = 0; i < curGate.outputs.length; i++){
		if(i==0){
			yPos=-13;
		}
		else{
			yPos=15.8;
		}
		let xmlConnector = xmldoc.createElement("connector");
		xmlConnector.setAttribute("type", "out");
		xmlConnector.setAttribute("x", "30");
		xmlConnector.setAttribute("y", yPos);
		xmlConnector.setAttribute("rot", "180");
		xmlConnectors.appendChild(xmlConnector);
	}
	let luts = xmldoc.createElement("luts");
	let lut = xmldoc.createElement("lut");
	lut.setAttribute("values","0111");
	luts.appendChild(lut);
	let annotation = xmldoc.createElement("annotation");
	let text = xmldoc.createElement("text");
	text.setAttribute("size","18");
	text.setAttribute("x","-21");
	text.setAttribute("y","-15");
	text.innerHTML = "Or";
	annotation.appendChild(text);
	
	let gateml =xmldoc.createElement("gateml");
	gateml.setAttribute("y", "5.4");
	gateml.setAttribute("x", "7.3");
	gateml.setAttribute("zoom", "1");
	gateml.setAttribute("oncolor", "ffcc00");
	
	let xmlGates = xmldoc.createElement("gates");
	let xmlGate = xmldoc.createElement("gate");
	xmlGate.setAttribute("type", "Or");
	xmlGate.setAttribute("rot", "0");
	xmlGate.setAttribute("ins", "00");
	xmlGate.setAttribute("outs", "0");
	xmlGate.setAttribute("x", "230");
	xmlGate.setAttribute("y", "180");
	xmlGates.appendChild(xmlGate);
	
	let xmlSources = xmldoc.createElement("sources");
	let xmlSource = xmldoc.createElement("source");
	xmlSource.setAttribute("type", "button");
	xmlSource.setAttribute("x", "100");
	xmlSource.setAttribute("y", "150");
	xmlSource.setAttribute("scale", "1");
	xmlSources.appendChild(xmlSource);
	xmlSource = xmldoc.createElement("source");
	xmlSource.setAttribute("type", "button");
	xmlSource.setAttribute("x", "90");
	xmlSource.setAttribute("y", "210");
	xmlSource.setAttribute("scale", "1");
	xmlSources.appendChild(xmlSource);
	
	let xmlDrains = xmldoc.createElement("drains");
	let xmlDrain= xmldoc.createElement("drain");
	xmlDrain.setAttribute("type", "lamp");
	xmlDrain.setAttribute("y", "190");
	xmlDrain.setAttribute("x", "310");
	xmlDrain.setAttribute("scale", "1");
	xmlDrains.appendChild(xmlDrain);
	
	let xmlWires = xmldoc.createElement("wires");
	let xmlWire = xmldoc.createElement("wire");
	xmlWire.setAttribute("righty", "160");
	xmlWire.setAttribute("rightx", "200");
	xmlWire.setAttribute("lefty", "150");
	xmlWire.setAttribute("leftx", "120");
	xmlWires.appendChild(xmlWire);
	xmlWire = xmldoc.createElement("wire");
	xmlWire.setAttribute("righty", "200");
	xmlWire.setAttribute("rightx", "200");
	xmlWire.setAttribute("lefty", "210");
	xmlWire.setAttribute("leftx", "110");
	xmlWires.appendChild(xmlWire);
	xmlWire = xmldoc.createElement("wire");
	xmlWire.setAttribute("righty", "190");
	xmlWire.setAttribute("rightx", "290");
	xmlWire.setAttribute("lefty", "180");
	xmlWire.setAttribute("leftx", "260");
	xmlWires.appendChild(xmlWire);
	
	gateml.appendChild(xmlGates);
	gateml.appendChild(xmlSources);
	gateml.appendChild(xmlDrains);
	gateml.appendChild(xmlWires);
	
	newComponent.appendChild(xmlConnectors);
	newComponent.appendChild(luts);
	newComponent.appendChild(annotation);
	newComponent.appendChild(gateml);
   
}
function createXor(curGate,xmldoc,newComponent) {
	newComponent.setAttribute("name", "Xor");
	newComponent.setAttribute("id", curGate.id);
	newComponent.setAttribute("states", "no");
	newComponent.setAttribute("wid", curGate.w);
	newComponent.setAttribute("hei", curGate.w);
	let xmlConnectors = xmldoc.createElement("connectors");
	for(let i = 0; i < curGate.inputs.length; i++){
		let yPos = i*5;
		if(i==0){
			yPos=-13;
		}
		else{
			yPos=15.8;
		}
		
		let xmlConnector = xmldoc.createElement("connector");
		xmlConnector.setAttribute("type", "in");
		xmlConnector.setAttribute("x", "-30");
		xmlConnector.setAttribute("y", yPos);
		xmlConnector.setAttribute("rot", "0");
		xmlConnectors.appendChild(xmlConnector);
	}
	for(let i = 0; i < curGate.outputs.length; i++){
		if(i==0){
			yPos=-13;
		}
		else{
			yPos=15.8;
		}
		let xmlConnector = xmldoc.createElement("connector");
		xmlConnector.setAttribute("type", "out");
		xmlConnector.setAttribute("x", "30");
		xmlConnector.setAttribute("y", yPos);
		xmlConnector.setAttribute("rot", "180");
		xmlConnectors.appendChild(xmlConnector);
	}
	let luts = xmldoc.createElement("luts");
	let lut = xmldoc.createElement("lut");
	lut.setAttribute("values","0110");
	luts.appendChild(lut);
	let annotation = xmldoc.createElement("annotation");
	let text = xmldoc.createElement("text");
	text.setAttribute("size","18");
	text.setAttribute("x","-21");
	text.setAttribute("y","-15");
	text.innerHTML = "=1";
	annotation.appendChild(text);
	
	let gateml =xmldoc.createElement("gateml");
	gateml.setAttribute("y", "5.4");
	gateml.setAttribute("x", "7.3");
	gateml.setAttribute("zoom", "1");
	gateml.setAttribute("oncolor", "ffcc00");
	
	let xmlGates = xmldoc.createElement("gates");
	let xmlGate = xmldoc.createElement("gate");
	xmlGate.setAttribute("type", "Xor");
	xmlGate.setAttribute("rot", "0");
	xmlGate.setAttribute("ins", "00");
	xmlGate.setAttribute("outs", "0");
	xmlGate.setAttribute("x", "230");
	xmlGate.setAttribute("y", "180");
	xmlGates.appendChild(xmlGate);
	
	let xmlSources = xmldoc.createElement("sources");
	let xmlSource = xmldoc.createElement("source");
	xmlSource.setAttribute("type", "button");
	xmlSource.setAttribute("x", "100");
	xmlSource.setAttribute("y", "150");
	xmlSource.setAttribute("scale", "1");
	xmlSources.appendChild(xmlSource);
	xmlSource = xmldoc.createElement("source");
	xmlSource.setAttribute("type", "button");
	xmlSource.setAttribute("x", "90");
	xmlSource.setAttribute("y", "210");
	xmlSource.setAttribute("scale", "1");
	xmlSources.appendChild(xmlSource);
	
	let xmlDrains = xmldoc.createElement("drains");
	let xmlDrain= xmldoc.createElement("drain");
	xmlDrain.setAttribute("type", "lamp");
	xmlDrain.setAttribute("y", "190");
	xmlDrain.setAttribute("x", "310");
	xmlDrain.setAttribute("scale", "1");
	xmlDrains.appendChild(xmlDrain);
	
	let xmlWires = xmldoc.createElement("wires");
	let xmlWire = xmldoc.createElement("wire");
	xmlWire.setAttribute("righty", "160");
	xmlWire.setAttribute("rightx", "200");
	xmlWire.setAttribute("lefty", "150");
	xmlWire.setAttribute("leftx", "120");
	xmlWires.appendChild(xmlWire);
	xmlWire = xmldoc.createElement("wire");
	xmlWire.setAttribute("righty", "200");
	xmlWire.setAttribute("rightx", "200");
	xmlWire.setAttribute("lefty", "210");
	xmlWire.setAttribute("leftx", "110");
	xmlWires.appendChild(xmlWire);
	xmlWire = xmldoc.createElement("wire");
	xmlWire.setAttribute("righty", "190");
	xmlWire.setAttribute("rightx", "290");
	xmlWire.setAttribute("lefty", "180");
	xmlWire.setAttribute("leftx", "260");
	xmlWires.appendChild(xmlWire);
	
	gateml.appendChild(xmlGates);
	gateml.appendChild(xmlSources);
	gateml.appendChild(xmlDrains);
	gateml.appendChild(xmlWires);
	
	newComponent.appendChild(xmlConnectors);
	newComponent.appendChild(luts);
	newComponent.appendChild(annotation);
	newComponent.appendChild(gateml);
   
}

	
