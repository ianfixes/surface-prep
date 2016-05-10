
var linkDistance = 100;
var nodeRadius = 10;
var colors = d3.scale.category10();

// make an svg drawing of a force-layout graph.  nodes can be connected with multiple edges.
// width: width in pixels
// height: height in pixels
// inputNodes: array of {name: "name"} objects
// inputEdges: array of {source: 0, target: 1, linknum: 1} src/tgt are array indexes of inputNodes, linknum is cardinality of this edge
// edgeLabelFn: given index of inputEdges array, return name for this edge
var constructGraph = function(width, height, inputNodes, inputEdges, edgeLabelFn) {
  var svg = d3.select("body").append("svg").attr({"width": width,"height": height});

  // construct SVG path
  var moveTo = function (x, y) {
    return ["M", x, ",", y].join("");
  };

  // construct SVG path
  var arcTo = function (rx, ry, xAxisRotate, largeArcFlag, sweepFlag, x, y) {
    var p = function (a, b) { return [a, b].join(","); }; // pair
    return ["A", p(rx, ry), xAxisRotate, p(largeArcFlag, sweepFlag), p(x, y)].join(" ");
  }

  // as more paths connect the same nodes, make a more bulgy arc
  // if the numerator in the dr calculation is too small, edges will all be half circles
  var edgePathFn = function (d) {
    var dr = 150 / d.linknum;
    var path = [moveTo(d.source.x, d.source.y),
            arcTo(dr, dr, 0, 0, 1, d.target.x, d.target.y)
           ].join(" ");

    //console.log("path " + path);
    return path
  };

  // physics
  var force = d3.layout.force()
    .nodes(inputNodes)
    .links(inputEdges)
    .size([width, height])
    .linkDistance([linkDistance])
    .charge([-1500])
    .theta(0.1)
    .gravity(0.05)
    .alpha(500)
    //.friction(0.8)
    .start();

  var edges = svg.selectAll("line")
    .data(inputEdges)
    .enter()
    .append('path')
    .attr('marker-end', 'url(#arrowhead)')
    .attr({// d = node drawing function
           'stroke':'#ccc',
           'pointer-events': 'none',
           'marker-end': 'url(#arrowhead)',
           'id':function (d, i) { return 'edge' + i}
          })
    .attr('fill', 'none');


  var nodes = svg.selectAll("circle")
    .data(inputNodes)
    .enter()
    .append("circle")
    .attr({"r": nodeRadius})
    .style("fill", function(d, i) { return colors(i); })
    .call(force.drag)


  var nodelabels = svg.selectAll(".nodelabel")
    .data(inputNodes)
    .enter()
    .append("text")
    .attr({"x": function (d) { return d.x; },
           "y": function (d) { return d.y; },
           "class": "nodelabel",
           "stroke": "black"})
    .style("font-size", "12pt")
    .style("font-weight", "normal")
    .text(function (d) { return d.name; });

  var edgepaths = svg.selectAll(".edgepath")
    .data(inputEdges)
    .enter()
    .append('path')
    .attr({'d': function (d, i) { return ['M ', d.source.x, ' ', d.source.y, ' L ',  d.target.x, ' ', d.target.y].join(''); },
           'class':'edgepath',
           'fill-opacity':0,
           'stroke-opacity':0,
           'fill':'blue',
           'stroke':'red',
           'id':function (d, i) { return 'edgepath' + i}
          })
    .style("pointer-events", "none");

  var edgelabels = svg.selectAll(".edgelabel")
    .data(inputEdges)
    .enter()
    .append('text')
    .style("pointer-events", "none")
    .attr({'class': 'edgelabel',
           'id': function (d, i) { return 'edgelabel' + i; },
           'dx': linkDistance * 0.4,
           'dy': 0,
           'font-size': 12,
           'fill': '#aaa'
          });

  edgelabels.append('textPath')
    .attr('xlink:href', function (d, i) { return '#edgepath' + i; })
    .style("pointer-events", "none")
    .text(edgeLabelFn)

  svg.append('defs').append('marker')
    .attr({'id':'arrowhead',
           'viewBox':'-0 -5 10 10',
           'refX': nodeRadius + 10,
           'refY':0,
           //'markerUnits':'strokeWidth',
           'orient':'auto',
           'markerWidth':10,
           'markerHeight':10,
           'xoverflow':'visible'
          })
    .append('svg:path')
    .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
    .attr('fill', '#ccc')
    .attr('stroke','#ccc');

  force.on("tick", function() {

    edges.attr('d', edgePathFn);

    nodes.attr({"cx": function (d) { return d.x; },
                "cy": function (d) { return d.y; }
               });

    nodelabels
      .attr("x", function(d) { return d.x + nodeRadius / 2; })
      .attr("y", function(d) { return d.y; });

    edgepaths.attr('d', edgePathFn);

    // TODO: something is bending strangely
    edgelabels.attr('transform', function (d, i) {
      if (d.target.x < d.source.x) {
        bbox = this.getBBox();
        rx = bbox.x + bbox.width / 2;
        ry = bbox.y + bbox.height / 2;
        return 'rotate(180 ' + rx + ' ' + ry + ')';
      }
      else {
        return 'rotate(0)';
      }
    });
  });
};

var makeConstructGraphFromJSONFn = function (width, height) {
  return function (error, dataset) {
    if (error) console.log(error);

    constructGraph(width, height, dataset.nodes, dataset.edges, function (d, i) {
      return 'label ' + i + " " + JSON.stringify(Object.keys(d))
    });
  };
}

// Make a function that can be passed to d3 to handle CSV processing.
// our input data is width and height
var makeConstructGraphFromCSVFn = function(width, height) {
  return function (error, dataset) {
    var nodes = [];
    var nodesRev = {};
    var edges = [];
    var edgeNames = [];
    var edgeCount = {};

    for (var data of dataset) {
      //console.log(JSON.stringify(data));
      data.src = data.src.trim();
      data.tgt = data.tgt.trim();

      // add to nodes
      for (var name of [data.src, data.tgt]) {
        if (!(name in nodesRev)) {
          nodesRev[name] = nodes.length;
          nodes[nodes.length] = {"name": name};
        }
      }

      // add edge
      edgeNames[edges.length] = data.chem;
      var srcId = nodesRev[data.src];
      var tgtId = nodesRev[data.tgt];

      // increment number of edges between these nodes
      edgeCount[srcId] = edgeCount[srcId] || {};
      edgeCount[srcId][tgtId] = edgeCount[srcId][tgtId] || 0;
      edgeCount[srcId][tgtId]++;

      edges[edges.length] = {"source": srcId, "target": tgtId, "linknum": edgeCount[srcId][tgtId]};
    }

    constructGraph(width, height, nodes, edges, function (d, i) {
      return edgeNames[i];
    });
  };
}


function renderGraph(width, height, csvFile) {
  d3.csv(csvFile, makeConstructGraphFromCSVFn(width, height));
}
