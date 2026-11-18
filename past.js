const r = require("raylib");

function updateTarget(mainTarget, target, present, turn) {
    const x = present.x;
    const y = present.y;

    r.BeginTextureMode(mainTarget);

    r.DrawTexture(target[turn % 2].texture, x, y, r.WHITE);

    r.DrawLineEx({ x: 0, y: 300 }, { x: 900, y: 300 }, 4, r.BLACK);
    r.DrawLineEx({ x: 0, y: 600 }, { x: 900, y: 600 }, 4, r.BLACK);
    r.DrawLineEx({ x: 300, y: 0 }, { x: 300, y: 900 }, 4, r.BLACK);
    r.DrawLineEx({ x: 600, y: 0 }, { x: 600, y: 900 }, 4, r.BLACK);

    r.EndTextureMode();

}

function update(world, target, mainTarget) {
    const startArray = [
        { x: 0, y: 600 },
        { x: 300, y: 600 },
        { x: 600, y: 600 },

        { x: 0, y: 300 },
        { x: 300, y: 300 },
        { x: 600, y: 300 },

        { x: 0, y: 0 },
        { x: 300, y: 0 },
        { x: 600, y: 0 },
    ]
    const char = r.GetCharPressed();
    if (char != 0) {
        const present = startArray.at(-(57 - char + 1));
        updateTarget(mainTarget, target, present, world.turn++);
        console.log(present);
    }


    // if (r.IsKeyPressed(r.KEY_ONE)) {
    //     console.log("ONE");
    // }
    // if (r.IsKeyPressed(r.KEY_TWO)) {
    //     console.log("TWO");
    // }
    // if (r.IsKeyPressed(r.KEY_THREE)) {
    //     console.log("THREE");
    // }
    // if (r.IsKeyPressed(r.KEY_FOUR)) {
    //     console.log("FOUR");
    // }
    // if (r.IsKeyPressed(r.KEY_FIVE)) {
    //     console.log("FIVE");
    // }
    // if (r.IsKeyPressed(r.KEY_SIX)) {
    //     console.log("SIX");
    // }
    // if (r.IsKeyPressed(r.KEY_SEVEN)) {
    //     console.log("SEVEN");
    // }
    // if (r.IsKeyPressed(r.KEY_EIGHT)) {
    //     console.log("EIGHT");
    // }
    // if (r.IsKeyPressed(r.KEY_NINE)) {
    //     console.log("NINE");
    // }
}

function draw(world, target) {
    r.BeginDrawing();

    r.ClearBackground(r.WHITE);

    width = 30;
    height = 30;
    rows = 10;
    columns = 10;

    r.DrawTexture(target.texture, 0, 0, r.WHITE)



    r.EndDrawing();

}

function teardown() {
    r.CloseWindow();
}

function loop(world) {

    const target1 = r.LoadRenderTexture(300, 300);

    r.BeginTextureMode(target1);

    r.ClearBackground(r.WHITE);

    r.DrawRing({ x: 150, y: 150 }, 100, 110, 0, 360, 0, r.BLACK)

    r.EndTextureMode();

    const target2 = r.LoadRenderTexture(300, 300);

    r.BeginTextureMode(target2);
    r.ClearBackground(r.WHITE);

    r.DrawLineEx({ x: 10, y: 10 }, { x: 290, y: 290 }, 10, r.BLACK);
    r.DrawLineEx({ x: 290, y: 10 }, { x: 10, y: 290 }, 10, r.BLACK);

    r.EndTextureMode();
    const target = {
        0: target1,
        1: target2,
    }

    const mainTarget = r.LoadRenderTexture(900, 900);

    r.BeginTextureMode(mainTarget);

    r.DrawLineEx({ x: 0, y: 300 }, { x: 900, y: 300 }, 4, r.BLACK);
    r.DrawLineEx({ x: 0, y: 600 }, { x: 900, y: 600 }, 4, r.BLACK);
    r.DrawLineEx({ x: 300, y: 0 }, { x: 300, y: 900 }, 4, r.BLACK);
    r.DrawLineEx({ x: 600, y: 0 }, { x: 600, y: 900 }, 4, r.BLACK);


    r.EndTextureMode();

    while (!r.WindowShouldClose()) {
        world.cf++;

        update(world, target, mainTarget);
        draw(world, mainTarget);
    }
}

function setup() {
    const windowWidth = 900;
    const windowHeight = 900;


    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(windowWidth, windowHeight, "Texture");
    r.SetTargetFPS(30);

    return {
        window: {
            WIDTH: windowWidth,
            HEIGHT: windowHeight,
        },
        cf: 0,
        turn: 0,
    }
}

function main() {
    const world = setup();
    loop(world);
    teardown();
}

main();
