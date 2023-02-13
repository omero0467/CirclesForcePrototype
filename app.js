async function draw () {

    const dataset = await d3.csv('hierarcial.csv', (d, index, columns) => {
        d3.autoType(d)
        d.total = d3.sum(columns, (c) => d[c])
        d.title = d['']
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
    
        const svg = d3.select('#chart')
        .append('svg')
        .attr('height',dimensions.height)
        .attr('width',dimensions.width)
        .attr('viewBox',`0 0 ${dimensions.height} ${dimensions.width}`)
        .style('background-color','#ddd')
    
        const ctr = svg.append('g')
        .attr('translate',`transform(${dimensions.margin.left},${dimensions.margin.top})`)

        //Scales

        const sizeScale = (data=[]) =>d3.scaleLinear()
        .domain([1,data.length])
        .range([dimensions.margin.top,dimensions.width - 50])
        const groupAccessor = (d,i) => {
                // let obj = {
                //     index: i,
                //     object:d.title,
                //     currentVal:d[i]
                // }
                // console.log(obj);
                // return d
        }
        
            //Fire Change And Join data
            let newData;
         d3.select('#group')
        // .value('value')
        .on('change',function(event){
                let value = 0
                value = event.target.value
                const bin = d3.bin()
                // .domain([])
                .value((d)=>d[value])
                .thresholds(value)
            newData = bin(dataset)
            ctr.selectAll('circle')
            .data(newData)
            .join(enter=>{},update=>{},exit =>{})
            console.log(newData);
            })


    // console.log(value);


}

draw()