const r = require("raylib");
const config = require("./config");
const textures = require("./textures");

function createGameState() {
    const { cellWidth, cellHeight, width, height } = config.data.block;

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
    const { getBG, getCircleTexture, getCrossTexture } = textures.createTextures();

    return {
        cf: 0,
        turn: 0,
        board: Array(9).fill(null),
        cells,
        target: {
            0: getCircleTexture,
            1: getCrossTexture,
        },
        mainTarget: getBG,
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

module.exports = {
    createGameState,
    update,
    draw,
};
