import { render } from "../node_modules/lit-html/lit-html.js";
import { showCatalog } from "./catalog.js";
import { showCreate } from "./create.js";
import { showUpdate } from "./update.js";

const root = document.body;
const ctx = {
   update
}

update()

function update() {
    render([
        showCatalog(ctx),
        showCreate(ctx),
        showUpdate(ctx)
    ], root);
}

