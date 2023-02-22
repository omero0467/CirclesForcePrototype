async function draw () {

    const dataset = await d3.csv('hierarcial.csv', (d, index, columns) => {
        d3.autoType(d)
        d.total = d3.sum(columns, (c) => d[c])
        d.title = d['']
        // this.size = index
        return d
      })

      console.log(dataset);

    const dimensions = {
        height:960,
        width:960,
        margin:{
            left:100,
            right:100,
            top:100,
            bottom:100
        },
    }
    dimensions.ctrHeight = dimensions.height - (dimensions.margin.bottom*2)
    dimensions.ctrWidth = dimensions.height - dimensions.margin.bottom*2


    const xAccessor = (d,i) => i 
    const yAccessor = (d,i) => d.total
    
    const xScale = d3.scaleLinear().domain(d3.extent(dataset,xAccessor)).rangeRound([50,dimensions.ctrWidth]).clamp(true)
    const yScale = d3.scaleLinear().domain(d3.extent(dataset,yAccessor)).rangeRound([dimensions.ctrHeight,0]).nice().clamp(true) 

        const svg = d3.select('#chart')
        .append('svg')
        .attr('height',dimensions.height)
        .attr('width',dimensions.width)
        .attr('viewBox',`${-dimensions.width/2} ${-dimensions.height/2} ${dimensions.height} ${dimensions.width}`)
        // ${-dimensions.width/2} ${-dimensions.height/2}
        .style('background-color','#ddd')
    
        const ctr = svg.append('g')
        .attr('translate',`transform(${dimensions.margin.left},${dimensions.margin.top})`)
        .classed('container',true)
        const circlesGroup = ctr.append('g')
        //Scales

        const sizeScale =d3.scaleLog()
        .domain([1,56])
        .range([dimensions.margin.bottom,dimensions.ctrWidth])

        //Intial Group

        circlesGroup.selectAll('circle')
        .data(dataset)
        .join('circle')
        .attr('r',d=>sizeScale(d.length))
        
        //Fire Change And Join data

        
            let newData;
            d3.select('#group')
            .on('change',function(event){

            let value = 0
            value = event.target.value

                const bin = d3.bin()
                .value((d)=>d[value])
                .thresholds(value)

            newData = bin(dataset)

            circlesGroup.selectAll('circle')
            .data(newData)
            .join('circle')
            .attr('r', (d,i)=>sizeScale(d.length)*0.1)
            .transition()
            // .attr('cx',(d,i)=>sizeScale(i))
            .attr('cx', (d,i)=>xScale(xAccessor(d,i)))
            .attr('cy',(d,i)=>yScale(yAccessor(i)))
            .attr('fill',(d,i)=>d3.interpolatePurples(i/56))
            console.log(newData);
        
        })


    // console.log(dataset);


}

draw()