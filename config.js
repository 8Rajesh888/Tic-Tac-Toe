const r = require("raylib");

const screen = {
    width: 900,
    height: 900,
    FPS: 50,
};

const block = {
    lineWidth: 5,
    cellWidth: screen.width / 3,
    cellHeight: screen.height / 3,
    width: screen.width / 3 - 5,
    height: screen.height / 3 - 5,
    crossWidth: 10,
    bgColor: r.WHITE,
    crossColor: r.RED,
    circleColor: r.GREEN,
};

const data = {
    screen,
    block,
};

module.exports = { data };
