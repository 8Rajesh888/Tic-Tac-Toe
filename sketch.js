const r = require("raylib");
const config = require("./config");
const game = require("./game");

function running() {
    return !r.WindowShouldClose();
}

function setup() {
    const { width: screenWidth, height: screenHeight, FPS } = config.data.screen;

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(screenWidth, screenHeight, "FUN");
    r.SetTargetFPS(FPS);

    return game.createGameState();
}

function update(world) {
    game.update(world);
}

function draw(world) {
    game.draw(world);
}

function teardown(world) {
    r.CloseWindow();
}

module.exports = {
    running,
    setup,
    update,
    draw,
    teardown,
};
