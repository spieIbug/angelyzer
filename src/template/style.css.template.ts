export const cssTemplate = () => {
  return `
  body {
    font: 14px helvetica neue, helvetica, arial, sans-serif;
}
.toolbar {
    position: absolute;
    box-shadow: none;
    background: #1976d2;
    color: #fff;
    top: 0;
    right: 0;
    left: 0;
    z-index: 10;
    min-height: 64px;
    display: flex;
    box-sizing: border-box;
    flex-direction: column;
    width: 100%;
}

.toolbar-row {
    padding: 0 16px 0 0;
    height: 64px;
    display: flex;
    box-sizing: border-box;
    width: 100%;
    flex-direction: row;
    align-items: center;
    white-space: nowrap;
}

.toolbar-menu {
    flex-direction: row;
    align-items: center;
    width: 80%;
}

.menu-elements {
    list-style-position: inside;
    padding: 0;
    margin: 0;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    flex-direction: row;
    -webkit-box-align: center;
    letter-spacing: .3px;
    align-items: center;
    font-size: 14px;
    line-height: 24px;
    font-weight: 400;
    list-style-type: disc;
    white-space: nowrap;
}
.menu-element {

    padding-bottom: 2px;
    list-style-type: none;
    cursor: pointer;
    letter-spacing: .3px;
    font-size: 14px;
    line-height: 24px;
    font-weight: 400;
    display: list-item;
    text-align: -webkit-match-parent;
}
.menu-link {
    margin: 0;
    padding: 24px 16px;
    cursor: pointer;
    font-weight: 400;
    color: #fff;
    font-size: 16px;
    font-family: Roboto,Helvetica Neue Light,Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif;
    text-transform: uppercase;
    text-decoration: none;
}

.container {
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    top: 65px;
    display: flex;
    flex: 1 1 auto;
}

table {
    border-spacing: 0;
    border-collapse: collapse;
    display: table;
    border-color: grey;
    width: 100%;
    max-width: 100%;
    margin-bottom: 20px;
}
th {
    vertical-align: bottom;
    border-bottom: 2px solid #ddd;
    padding: 8px;
    line-height: 1.42857143;
}
td {
    padding: 8px;
    line-height: 1.42857143;
    vertical-align: top;
    border-top: 1px solid #ddd;
}
pre {
    background: #2a2827;
    color: #f7f7f7;
    line-height: 1.5;
}
.logo {
    padding: 20px;
    width: 150px;
    height: 40px;
}
.sticky {
    position: fixed;
    top: 0;
    width: 100%;
}
.sticky + .content {
    padding-top: 60px;
}
ul#navigation-menu {
    height: 600px;
    overflow-y: auto;
    list-style-type: none;
}
}
  `;
};