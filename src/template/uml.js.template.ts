export const umlJSTemplate = () => (`
var $ = go.GraphObject.make;
myDiagram = $(go.Diagram, "uml", {
    "undoManager.isEnabled": true,
    layout: $(go.TreeLayout,
        { // this only lays out in trees nodes connected by "generalization" links
            angle: 90,
            path: go.TreeLayout.PathSource,  // links go from child to parent
            setsPortSpot: false,  // keep Spot.AllSides for link connection spot
            setsChildPortSpot: false,  // keep Spot.AllSides
            // nodes not connected by "generalization" links are laid out horizontally
            arrangement: go.TreeLayout.ArrangementHorizontal
        })
});

// show visibility or access as a single character at the beginning of each property or method
function convertVisibility(v) {
    switch (v) {
        case "public":
            return "+";
        case "private":
            return "-";
        case "protected":
            return "#";
        case "package":
            return "~";
        default:
            return v;
    }
}

function load() {
    document.getElementById('navigation-menu').innerHTML = components.map((cmp, index) => '<li><a href="#' + cmp.name + '" onclick="javascript:loadData(' + index + ')">' + cmp.name + '</a></li>').join('\\n');
    loadData(0)
}

function loadData(index = 0) {
    var data = umlData[index];
    myDiagram.model = $(go.GraphLinksModel,
        {
            copiesArrays: true,
            copiesArrayObjects: true,
            nodeDataArray: data.nodes,
            linkDataArray: data.links,
        });
}

// the item template for properties
var propertyTemplate =
    $(go.Panel, "Horizontal",
        // property visibility/access
        $(go.TextBlock,
            {isMultiline: false, editable: false, width: 12},
            new go.Binding("text", "visibility", convertVisibility)),
        // property name, underlined if scope=="class" to indicate static property
        $(go.TextBlock,
            {isMultiline: false, editable: true},
            new go.Binding("text", "name").makeTwoWay(),
            new go.Binding("isUnderline", "scope", function (s) {
                return s[0] === 'c'
            })),
        // property type, if known
        $(go.TextBlock, "",
            new go.Binding("text", "type", function (t) {
                return (t ? ": " : "");
            })),
        $(go.TextBlock,
            {isMultiline: false, editable: true},
            new go.Binding("text", "type").makeTwoWay()),
        // property default value, if any
        $(go.TextBlock,
            {isMultiline: false, editable: false},
            new go.Binding("text", "default", function (s) {
                return s ? " = " + s : "";
            }))
    );
// the item template for methods
var methodTemplate =
    $(go.Panel, "Horizontal",
        // method visibility/access
        $(go.TextBlock,
            {isMultiline: false, editable: false, width: 12},
            new go.Binding("text", "visibility", convertVisibility)),
        // method name, underlined if scope=="class" to indicate static method
        $(go.TextBlock,
            {isMultiline: false, editable: true},
            new go.Binding("text", "name").makeTwoWay(),
            new go.Binding("isUnderline", "scope", function (s) {
                return s[0] === 'c'
            })),
        // method parameters
        $(go.TextBlock, "()",
            // this does not permit adding/editing/removing of parameters via inplace edits
            new go.Binding("text", "parameters", function (parr) {
                var s = "(";
                for (var i = 0; i < parr.length; i++) {
                    var param = parr[i];
                    if (i > 0) s += ", ";
                    s += param.name + ": " + param.type;
                }
                return s + ")";
            })),
        // method return type, if any
        $(go.TextBlock, "",
            new go.Binding("text", "type", function (t) {
                return (t ? ": " : "");
            })),
        $(go.TextBlock,
            {isMultiline: false, editable: true},
            new go.Binding("text", "type").makeTwoWay())
    );
// this simple template does not have any buttons to permit adding or
// removing properties or methods, but it could!
myDiagram.nodeTemplate =
    $(go.Node, "Auto",
        {
            locationSpot: go.Spot.Center,
            fromSpot: go.Spot.AllSides,
            toSpot: go.Spot.AllSides
        },
        $(go.Shape, {fill: "lightyellow"}),
        $(go.Panel, "Table",
            {defaultRowSeparatorStroke: "black"},
            // header
            $(go.TextBlock,
                {
                    row: 0, columnSpan: 2, margin: 3, alignment: go.Spot.Center,
                    font: "bold 12pt sans-serif",
                    isMultiline: false, editable: true
                },
                new go.Binding("text", "name").makeTwoWay()),
            // properties
            $(go.TextBlock, "Properties",
                {row: 1, font: "italic 10pt sans-serif"},
                new go.Binding("visible", "visible", function (v) {
                    return !v;
                }).ofObject("PROPERTIES")),
            $(go.Panel, "Vertical", {name: "PROPERTIES"},
                new go.Binding("itemArray", "properties"),
                {
                    row: 1, margin: 3, stretch: go.GraphObject.Fill,
                    defaultAlignment: go.Spot.Left, background: "lightyellow",
                    itemTemplate: propertyTemplate
                }
            ),
            $("PanelExpanderButton", "PROPERTIES",
                {row: 1, column: 1, alignment: go.Spot.TopRight, visible: false},
                new go.Binding("visible", "properties", function (arr) {
                    return arr.length > 0;
                })),
            // methods
            $(go.TextBlock, "Methods",
                {row: 2, font: "italic 10pt sans-serif"},
                new go.Binding("visible", "visible", function (v) {
                    return !v;
                }).ofObject("METHODS")),
            $(go.Panel, "Vertical", {name: "METHODS"},
                new go.Binding("itemArray", "methods"),
                {
                    row: 2, margin: 3, stretch: go.GraphObject.Fill,
                    defaultAlignment: go.Spot.Left, background: "lightyellow",
                    itemTemplate: methodTemplate
                }
            ),
            $("PanelExpanderButton", "METHODS",
                {row: 2, column: 1, alignment: go.Spot.TopRight, visible: false},
                new go.Binding("visible", "methods", function (arr) {
                    return arr.length > 0;
                }))
        )
    );

function convertIsTreeLink(r) {
    return r === "generalization";
}

function convertFromArrow(r) {
    switch (r) {
        case "generalization":
            return "";
        default:
            return "";
    }
}

function convertToArrow(r) {
    switch (r) {
        case "generalization":
            return "Triangle";
        case "aggregation":
            return "StretchedDiamond";
        default:
            return "";
    }
}

myDiagram.linkTemplate =
    $(go.Link,
        {routing: go.Link.Orthogonal},
        new go.Binding("isLayoutPositioned", "relationship", convertIsTreeLink),
        $(go.Shape),
        $(go.Shape, {scale: 1.3, fill: "white"},
            new go.Binding("fromArrow", "relationship", convertFromArrow)),
        $(go.Shape, {scale: 1.3, fill: "white"},
            new go.Binding("toArrow", "relationship", convertToArrow))
    );
load();
`);