export const indexTemplate = () => {
    return `<html>
<head>
    <link href="style.css" rel="stylesheet">
    <meta charset="utf-8">
    <title>Angular project view</title>
    <meta name="viewport" content="user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, minimal-ui">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gojs/2.1.2/go.js"></script>
</head>

<body>
<div class="toolbar sticky">
    <div class="toolbar-row">
        <div class="toolbar-menu">
            <ul class="menu-elements">
                <li class="menu-element"><img src="https://angular.io/assets/images/logos/angular/logo-nav@2x.png"
                                              class="logo"></li>
                <li class="menu-element"><a class="menu-link" href="index.html">graph</a></li>
                <li class="menu-element"><a class="menu-link" href="validations.html">validations</a></li>
                <li class="menu-element"><a class="menu-link" href="refactor.html">refactor</a></li>
                <li class="menu-element"><a class="menu-link" href="declarations.html">declarations</a></li>
                <li class="menu-element"><a class="menu-link" href="providers.html">providers</a></li>
            </ul>
        </div>
    </div>
</div>
<div id="sample" class="container">
    <div class="navigation" id="navigation">
        <ul id="navigation-menu">
        </ul>
    </div>
    <div id="uml" style="border: solid 1px black; width:80%; height:600px"></div>
</div>
<script src="code.js"></script>
<script src="components.js"></script>
<script src="uml-data.js"></script>
<script src="uml.js"></script>
</body>
</html>`;
};