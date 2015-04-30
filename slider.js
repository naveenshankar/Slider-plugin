var sliderAtBreakevenPoint = function(sliderId,breakEvenLeftPos,bLeft,bRight){
	this.left = breakEvenLeftPos ;
	this.defaultLeft = breakEvenLeftPos;

	if(this.boundaries.length > 1){
		this.boundaries.pop();
	}
	else if(this.boundaries.length == 0){
		this.boundaries.push(bLeft);
	}

	this.boundaries.push(this.left);
	this.boundaries.sort(function(a,b){
		return a - b;
	});
	this.boundaries.push(bRight);
	this.boundary = [];
	this.boundaryIndex = 0;
	this.leftChange = 0;
	this.selected = false; // Object of the element to be moved
	this.x_pos = 0;  // Stores x & y coordinates of the mouse pointer
	this.x_elem = 0;  // Stores top, left values (edge) of the element
	this.pathEl = document.createElementNS("http://www.w3.org/2000/svg", "path");
	this.pathEl.setAttribute('d','M '+this.left+' 10 L '+this.left+' 297');
	this.id = sliderId;
	this.pathEl.id = 'breakeven'+ sliderId;
	this.pathEl.setAttribute("class",'breakeven');
	document.querySelector('svg').appendChild(this.pathEl);

	if(this.left < bLeft || this.left > bRight){
		this.pathEl.style.display = 'none';
	}
	else{
		this.pathEl.style.display = 'block';
	}

	this.defineNewBoundaries();

	addEventsOnMouseLeave = function(e){
		document.onmouseup = null;
	}

	addEventsOnMouseOver = function(e){
		if(!this.selected){
			document.getElementById(this.pathEl.id).onmousedown = this.initializeElement.bind(this);
		}
		document.onmousemove = this.moveElement.bind(this);
		document.onmouseup = this.destroyElement.bind(this);
	}

	document.getElementById(this.pathEl.id).onmouseover = addEventsOnMouseOver.bind(this);
	document.getElementById(this.pathEl.id).onmouseleave = addEventsOnMouseLeave.bind(this);
}

	sliderAtBreakevenPoint.prototype.boundaries = [];

	sliderAtBreakevenPoint.prototype.defineNewBoundaries = function(){
		this.boundaries.forEach(function(value,index){
				if(value == this.left){
		 			this.boundaryIndex = index;
		 			this.boundary.push(this.boundaries[index-1]);
					this.boundary.push(this.boundaries[index+1]);
				}
		}.bind(this));
	}

// Will be called when user starts dragging an element
	sliderAtBreakevenPoint.prototype.initializeElement = function() {
	    // Store the object of the element which needs to be moved
	    this.selected = true;
	    this.x_elem = this.x_pos - this.pathEl.offsetLeft - this.left;
	    this.boundary = [];
	    this.defineNewBoundaries();
	}

// Destroy the object when we are done
	sliderAtBreakevenPoint.prototype.destroyElement = function() {
	    this.selected = false;
	    this.boundaries[this.boundaryIndex] = this.left;
	}

// Will be called when user dragging an element
	sliderAtBreakevenPoint.prototype.moveElement = function() {
    	this.x_pos = this.left + document.all ? window.event.clientX : e.pageX ;
   		if (this.selected) {
    		this.left = (this.x_pos - this.x_elem);
    		if(this.left > this.boundary[0] && this.left < this.boundary[1]){
    			this.pathEl.setAttribute('d','M '+this.left+' 10 L '+this.left+' 297');
    		}
    	}
	}

var flashFreeChart = function(){
        this.sliders = [];
        this.sliderId = 0;
}

flashFreeChart.prototype.addSlider = function(){
	this.sliderId = this.sliderId + 1;
	boundaryLeft = 0;
	boundaryRight = 400;
	this.sliders.push(new sliderAtBreakevenPoint(this.sliderId,100*this.sliderId,boundaryLeft,boundaryRight));
}

flashFreeChart.prototype.removeSlider = function(){
	var mainIndex,temp;
	if(this.sliders.length > 0){
			this.sliders.forEach(function(value,index){
				if(temp) {
					if (value.left > temp){
						mainIndex = index;
						temp = value.left;
					}
				}
				else{
					temp = value.left;
					mainIndex = index;
				}
			});

		sliderAtBreakevenPoint.prototype.boundaries.forEach(function(value,index){
					if(value == this.sliders[mainIndex].left){
			 			this.sliders[mainIndex].boundaryIndex = index;
					}
			}.bind(this));
            
          document.querySelector('svg').removeChild(this.sliders[mainIndex].pathEl);
                        sliderAtBreakevenPoint.prototype.boundaries.splice(this.sliders[mainIndex].boundaryIndex,1);
			this.sliders.splice(mainIndex,1);
	}
}

flashFreeChart.prototype.init = function(){
	var that = this;
        document.getElementById('addSlider').onclick = that.addSlider.bind(that);
        document.getElementById('removeSlider').onclick = that.removeSlider.bind(that);
};

var newChart = new flashFreeChart();
newChart.init();
