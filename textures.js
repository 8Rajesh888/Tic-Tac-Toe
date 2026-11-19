const config = require("./config");
const r = require("raylib");

const {
    width,
    height,
    cellWidth,
    cellHeight,
    crossWidth,
    lineWidth,
    bgColor,
    circleColor,
    crossColor,
} = config.data.block;
const { width: screenWidth, height: screenHeight } = config.data.screen;

function drawGridLines() {
    r.DrawLineEx({ x: 0, y: cellHeight }, { x: screenWidth, y: cellHeight }, lineWidth, r.BLACK);
    r.DrawLineEx({ x: 0, y: cellHeight * 2 }, { x: screenWidth, y: cellHeight * 2 }, lineWidth, r.BLACK);
    r.DrawLineEx({ x: cellWidth, y: 0 }, { x: cellWidth, y: screenHeight }, lineWidth, r.BLACK);
    r.DrawLineEx({ x: cellWidth * 2, y: 0 }, { x: cellWidth * 2, y: screenHeight }, lineWidth, r.BLACK);
}

const getCrossTexture = function () {
    const target2 = r.LoadRenderTexture(width, height);
    const pad = Math.min(width, height) * 0.1;

    r.BeginTextureMode(target2);
    r.ClearBackground(bgColor);
    r.DrawLineEx({ x: pad, y: pad }, { x: width - pad, y: height - pad }, crossWidth, crossColor);
    r.DrawLineEx({ x: width - pad, y: pad }, { x: pad, y: height - pad }, crossWidth, crossColor);
    r.EndTextureMode();

    return target2;
};

const getCircleTexture = function () {
    const target1 = r.LoadRenderTexture(width, height);
    const line = (width > height ? height : width) / 3;

    r.BeginTextureMode(target1);
    r.ClearBackground(bgColor);
    r.DrawRing({ x: width / 2, y: height / 2 }, line, line + crossWidth, 0, 360, 0, circleColor);
    r.EndTextureMode();

    return target1;
};

const getBG = function () {
    const set = r.LoadRenderTexture(screenWidth, screenHeight);

    r.BeginTextureMode(set);
    r.ClearBackground(bgColor);
    drawGridLines();
    r.EndTextureMode();

    return set;
};

const updateTarget = function (mainTarget, target, { x, y }, turn) {
    r.BeginTextureMode(mainTarget);
    r.DrawTexture(target[turn % 2].texture, x, y, r.WHITE);
    drawGridLines();
    r.EndTextureMode();
};

const createTextures = function () {
    const getCircleTexture = getCircleTexture()
    const getCrossTexture = getCrossTexture()
    const getBG = getBG()
    return { getBG, getCircleTexture, getCrossTexture };
}
module.exports = {
    createTextures,
    updateTarget,
};
