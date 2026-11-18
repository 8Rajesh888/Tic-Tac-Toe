const r = require("raylib");
const config = require("./config");
const textures = require("./textures");

function running() {
    return !r.WindowShouldClose();
}

function setup() {
    const { width: screenWidth, height: screenHeight, FPS } = config.data.screen;
    const { cellWidth, cellHeight, width, height } = config.data.block;

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(screenWidth, screenHeight, "FUN");
    r.SetTargetFPS(FPS);

    const offsetX = (cellWidth - width) / 2;
    const offsetY = (cellHeight - height) / 2;

    const cells = [
        { x: offsetX, y: cellHeight * 2 + offsetY },
        { x: cellWidth + offsetX, y: cellHeight * 2 + offsetY },
        { x: cellWidth * 2 + offsetX, y: cellHeight * 2 + offsetY },

        { x: offsetX, y: cellHeight + offsetY },
        { x: cellWidth + offsetX, y: cellHeight + offsetY },
        { x: cellWidth * 2 + offsetX, y: cellHeight + offsetY },

        { x: offsetX, y: offsetY },
        { x: cellWidth + offsetX, y: offsetY },
        { x: cellWidth * 2 + offsetX, y: offsetY },
    ];

    return {
        cf: 0,
        turn: 0,
        board: Array(9).fill(null),
        cells,
        target: {
            0: textures.getCircleTexture(),
            1: textures.getCrossTexture(),
        },
        mainTarget: textures.getBG(),
    };
}

function update(world) {
    world.cf++;
    const char = r.GetCharPressed();

    if (char >= 49 && char <= 57) {
        const index = char - 49;

        if (world.board[index] === null) {
            world.board[index] = world.turn % 2;
            textures.updateTarget(world.mainTarget, world.target, world.cells[index], world.turn);
            world.turn++;
        }
    }
}

function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(config.data.block.bgColor);
    r.DrawTexture(world.mainTarget.texture, 0, 0, r.WHITE);
    r.EndDrawing();
}

function teardown(world) {
    if (world) {
        r.UnloadRenderTexture(world.target[0]);
        r.UnloadRenderTexture(world.target[1]);
        r.UnloadRenderTexture(world.mainTarget);
    }
    r.CloseWindow();
}

module.exports = {
    running,
    setup,
    update,
    draw,
    teardown,
};
